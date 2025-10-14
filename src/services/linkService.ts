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
  expires_at: string;
}

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(36).padStart(2, '0')).join('');
}

export async function generateOneTimeLink(readingType: ReadingType): Promise<string | null> {
  try {
    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const { data, error } = await supabase
      .from('one_time_links')
      .insert({
        link_token: token,
        reading_type: readingType,
        expires_at: expiresAt.toISOString()
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

export async function validateAndUseLink(token: string): Promise<{ valid: boolean; readingType?: ReadingType }> {
  try {
    const { data: link, error: fetchError } = await supabase
      .from('one_time_links')
      .select('*')
      .eq('link_token', token)
      .eq('is_used', false)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (fetchError || !link) {
      return { valid: false };
    }

    const { error: updateError } = await supabase
      .from('one_time_links')
      .update({
        is_used: true,
        used_at: new Date().toISOString()
      })
      .eq('id', link.id);

    if (updateError) {
      console.error('Error marking link as used:', updateError);
      return { valid: false };
    }

    return {
      valid: true,
      readingType: link.reading_type as ReadingType
    };
  } catch (error) {
    console.error('Error validating link:', error);
    return { valid: false };
  }
}
