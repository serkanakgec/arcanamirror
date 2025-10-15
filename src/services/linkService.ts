import { createClient } from '@supabase/supabase-js';
import { ReadingType } from '../types/reading';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export interface OneTimeLink {
  id: string;
  link_token: string;
  reading_type: ReadingType;
  is_used: boolean;
  is_master: boolean;
  user_type: 'normal' | 'consultation';
  created_at: string;
  used_at: string | null;
  expires_at: string | null;
}

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(36).padStart(2, '0')).join('');
}

export async function generateOneTimeLink(readingType: ReadingType): Promise<string | null> {
  try {
    const token = generateToken();

    const { data, error } = await supabase
      .from('one_time_links')
      .insert({
        link_token: token,
        reading_type: readingType,
        expires_at: null
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error generating link:', error);
      return null;
    }

    const baseUrl = window.location.origin;
    return `${baseUrl}/?link=${token}`;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function validateLink(token: string): Promise<{
  valid: boolean;
  readingType?: ReadingType;
  linkId?: string;
  isMaster?: boolean;
  userType?: 'normal' | 'consultation';
  referenceCode?: string;
}> {
  try {
    const { data: link, error: fetchError } = await supabase
      .from('one_time_links')
      .select('*')
      .eq('link_token', token)
      .maybeSingle();

    if (fetchError || !link) {
      return { valid: false };
    }

    if (link.is_master) {
      return {
        valid: true,
        readingType: link.reading_type as ReadingType,
        linkId: link.id,
        isMaster: true,
        userType: link.user_type || 'normal',
        referenceCode: token
      };
    }

    if (link.is_used) {
      return { valid: false };
    }

    return {
      valid: true,
      readingType: link.reading_type as ReadingType,
      linkId: link.id,
      isMaster: false,
      userType: link.user_type || 'normal',
      referenceCode: token
    };
  } catch (error) {
    console.error('Error validating link:', error);
    return { valid: false };
  }
}

export async function markLinkAsUsed(linkId: string, isMaster: boolean = false): Promise<boolean> {
  try {
    if (isMaster) {
      return true;
    }

    const { error } = await supabase
      .from('one_time_links')
      .update({
        is_used: true,
        used_at: new Date().toISOString()
      })
      .eq('id', linkId)
      .eq('is_master', false);

    if (error) {
      console.error('Error marking link as used:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

export interface ConsultationUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  referenceCode: string;
}

export async function createConsultationUser(userInfo: ConsultationUserInfo): Promise<{ success: boolean; userId?: string; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('consultation_users')
      .insert({
        email: userInfo.email,
        first_name: userInfo.firstName,
        last_name: userInfo.lastName,
        birth_date: userInfo.birthDate,
        reference_code: userInfo.referenceCode
      })
      .select('id')
      .maybeSingle();

    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'Email already registered' };
      }
      console.error('Error creating consultation user:', error);
      return { success: false, error: error.message };
    }

    return { success: true, userId: data?.id };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Unknown error' };
  }
}

export interface ConsultationData {
  userId: string;
  referenceCode: string;
  readingType: string;
  question: string;
  selectedCards: any[];
  readingResult: string;
}

export async function saveConsultation(consultationData: ConsultationData): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('consultations')
      .insert({
        user_id: consultationData.userId,
        reference_code: consultationData.referenceCode,
        reading_type: consultationData.readingType,
        question: consultationData.question,
        selected_cards: consultationData.selectedCards,
        reading_result: consultationData.readingResult
      });

    if (error) {
      console.error('Error saving consultation:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}
