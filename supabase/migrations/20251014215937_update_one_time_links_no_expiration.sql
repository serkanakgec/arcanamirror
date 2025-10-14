/*
  # Update One-Time Links - Remove Expiration

  1. Changes
    - Remove expiration requirement from one_time_links table
    - Links are now valid until used (no time limit)
    - Update RLS policies to remove expiration checks
    
  2. Security
    - Links can only be used once
    - After use, they become permanently invalid
    - No time-based expiration
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read valid links" ON one_time_links;
DROP POLICY IF EXISTS "Anyone can mark links as used" ON one_time_links;

-- Recreate policies without expiration checks
CREATE POLICY "Anyone can read unused links"
  ON one_time_links
  FOR SELECT
  USING (is_used = false);

CREATE POLICY "Anyone can mark links as used"
  ON one_time_links
  FOR UPDATE
  USING (is_used = false)
  WITH CHECK (is_used = true);

-- Make expires_at nullable since we won't use it
DO $$
BEGIN
  ALTER TABLE one_time_links ALTER COLUMN expires_at DROP NOT NULL;
EXCEPTION
  WHEN others THEN NULL;
END $$;
