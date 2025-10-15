/*
  # Add Master Reference Support
  
  1. Changes
    - Add `is_master` column to one_time_links table
    - Master references are never marked as used
    - Master references work for all reading types
    
  2. New Columns
    - `is_master` (boolean, default false) - Whether this is a reusable master reference
    
  3. Master Reference
    - Create special master reference "21akgec21"
    - Works for all reading types
    - Never expires
    - Can be used unlimited times
    
  4. Security
    - Update RLS policies to handle master references
    - Regular references remain single-use
*/

-- Add is_master column
ALTER TABLE one_time_links 
  ADD COLUMN IF NOT EXISTS is_master boolean DEFAULT false NOT NULL;

-- Create master reference if not exists
INSERT INTO one_time_links (link_token, reading_type, is_master, expires_at, is_used)
VALUES ('21akgec21', 'daily', true, NULL, false)
ON CONFLICT (link_token) DO NOTHING;

-- Update RLS policies to handle master references
DROP POLICY IF EXISTS "Anyone can read unused links" ON one_time_links;
DROP POLICY IF EXISTS "Anyone can mark links as used" ON one_time_links;

-- Policy: Anyone can read unused links OR master links
CREATE POLICY "Anyone can read valid links"
  ON one_time_links
  FOR SELECT
  USING (
    (is_used = false) OR (is_master = true)
  );

-- Policy: Anyone can mark non-master links as used
CREATE POLICY "Anyone can mark links as used"
  ON one_time_links
  FOR UPDATE
  USING (
    is_master = false AND is_used = false
  )
  WITH CHECK (
    is_master = false AND is_used = true
  );

-- Create index on is_master for performance
CREATE INDEX IF NOT EXISTS idx_one_time_links_master 
  ON one_time_links(is_master);
