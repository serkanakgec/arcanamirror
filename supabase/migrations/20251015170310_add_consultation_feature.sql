-- Add Consultation Feature
-- 
-- New Tables:
-- 1. consultation_users: Stores user information for consultations
-- 2. consultations: Stores consultation readings and results
-- 
-- Modified Tables:
-- one_time_links: Added user_type field (normal or consultation)

-- Add user_type column to one_time_links
ALTER TABLE one_time_links 
ADD COLUMN IF NOT EXISTS user_type text DEFAULT 'normal' CHECK (user_type IN ('normal', 'consultation'));

-- Create consultation_users table
CREATE TABLE IF NOT EXISTS consultation_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  birth_date date NOT NULL,
  reference_code text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultation_users ENABLE ROW LEVEL SECURITY;

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES consultation_users(id) ON DELETE CASCADE,
  reference_code text NOT NULL,
  reading_type text NOT NULL,
  question text NOT NULL,
  selected_cards jsonb NOT NULL,
  reading_result text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Admin only access (no public access)
-- Users cannot view their own consultation data
-- Only admin/service role can access

-- Note: By enabling RLS without adding policies for authenticated users,
-- we ensure that regular users cannot access this data at all.
-- Only service_role and postgres role can access these tables.