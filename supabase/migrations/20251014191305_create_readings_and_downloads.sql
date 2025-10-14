/*
  # Tarot Readings and Downloads Database Schema

  ## Overview
  This migration creates the database structure for storing tarot readings and managing single-use PDF downloads.

  ## New Tables
  
  ### `readings`
  Stores tarot reading sessions with selected cards and generated interpretations
  - `id` (uuid, primary key) - unique reading identifier
  - `reading_type` (text) - type of reading (e.g., 'daily', '3-card', 'celtic-cross')
  - `selected_cards` (jsonb) - array of selected card objects with position and orientation
  - `user_name` (text, nullable) - optional user name (anonymized)
  - `gemini_response` (text) - full interpretation from Gemini API
  - `created_at` (timestamptz) - when the reading was created
  
  ### `pdf_downloads`
  Manages single-use PDF download links with expiry
  - `id` (uuid, primary key) - unique download link identifier
  - `reading_id` (uuid, foreign key) - reference to readings table
  - `pdf_path` (text) - path to generated PDF file
  - `created_at` (timestamptz) - when the download was created
  - `expires_at` (timestamptz) - expiry timestamp (24 hours default)
  - `used` (boolean) - whether the download link has been used
  - `used_at` (timestamptz, nullable) - when the link was used

  ## Security
  - Enable RLS on both tables
  - Public can create readings and downloads (no auth required for MVP)
  - Downloads are protected by UUID and single-use logic
  
  ## Important Notes
  - Download links expire after 24 hours
  - Links are single-use only (used=true after first download)
  - Selected cards stored as JSONB for flexibility
*/

-- Create readings table
CREATE TABLE IF NOT EXISTS readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reading_type text NOT NULL,
  selected_cards jsonb NOT NULL,
  user_name text,
  gemini_response text,
  created_at timestamptz DEFAULT now()
);

-- Create pdf_downloads table
CREATE TABLE IF NOT EXISTS pdf_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reading_id uuid REFERENCES readings(id) ON DELETE CASCADE,
  pdf_path text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  used_at timestamptz
);

-- Enable Row Level Security
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdf_downloads ENABLE ROW LEVEL SECURITY;

-- Policies for readings table
CREATE POLICY "Anyone can create readings"
  ON readings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view readings"
  ON readings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies for pdf_downloads table
CREATE POLICY "Anyone can create downloads"
  ON pdf_downloads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view valid downloads"
  ON pdf_downloads
  FOR SELECT
  TO anon, authenticated
  USING (expires_at > now() AND used = false);

CREATE POLICY "System can update download usage"
  ON pdf_downloads
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_readings_created_at ON readings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pdf_downloads_id ON pdf_downloads(id);
CREATE INDEX IF NOT EXISTS idx_pdf_downloads_expires_used ON pdf_downloads(expires_at, used);
