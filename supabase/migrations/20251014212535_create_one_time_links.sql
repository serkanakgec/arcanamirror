/*
  # Create One-Time Reading Links System

  1. New Tables
    - `one_time_links`
      - `id` (uuid, primary key)
      - `link_token` (text, unique) - URL-safe unique token
      - `reading_type` (text) - Type of tarot reading
      - `is_used` (boolean, default false) - Whether link has been used
      - `created_at` (timestamp)
      - `used_at` (timestamp, nullable) - When the link was used
      - `expires_at` (timestamp) - Link expiration time

  2. Security
    - Enable RLS on `one_time_links` table
    - Add policy for public to read unused, non-expired links
    - Add policy for public to mark links as used

  3. Indexes
    - Index on `link_token` for fast lookup
    - Index on `is_used` and `expires_at` for queries
*/

CREATE TABLE IF NOT EXISTS one_time_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_token text UNIQUE NOT NULL,
  reading_type text NOT NULL,
  is_used boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  used_at timestamptz,
  expires_at timestamptz NOT NULL
);

-- Enable RLS
ALTER TABLE one_time_links ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read unused, non-expired links
CREATE POLICY "Anyone can read valid links"
  ON one_time_links
  FOR SELECT
  USING (
    is_used = false 
    AND expires_at > now()
  );

-- Policy: Anyone can mark a link as used (update)
CREATE POLICY "Anyone can mark links as used"
  ON one_time_links
  FOR UPDATE
  USING (
    is_used = false 
    AND expires_at > now()
  )
  WITH CHECK (
    is_used = true
  );

-- Policy: Anyone can create new links
CREATE POLICY "Anyone can create links"
  ON one_time_links
  FOR INSERT
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_one_time_links_token 
  ON one_time_links(link_token);

CREATE INDEX IF NOT EXISTS idx_one_time_links_status 
  ON one_time_links(is_used, expires_at);
