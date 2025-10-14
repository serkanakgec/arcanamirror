import { createClient } from '@supabase/supabase-js';
import { ReadingType } from '../types/reading';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export interface OneTimeLink {
  id: string;
  link_token: string;
  reading_type: ReadingType;
  is_used: boolean;
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

export async function validateLink(token: string): Promise<{ valid: boolean; readingType?: ReadingType; linkId?: string }> {
  try {
    const { data: link, error: fetchError } = await supabase
      .from('one_time_links')
      .select('*')
      .eq('link_token', token)
      .eq('is_used', false)
      .maybeSingle();

    if (fetchError || !link) {
      return { valid: false };
    }

    return {
      valid: true,
      readingType: link.reading_type as ReadingType,
      linkId: link.id
    };
  } catch (error) {
    console.error('Error validating link:', error);
    return { valid: false };
  }
}

export async function markLinkAsUsed(linkId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('one_time_links')
      .update({
        is_used: true,
        used_at: new Date().toISOString()
      })
      .eq('id', linkId);

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
