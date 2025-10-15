/*
  # Fix expires_at Column - Make It Nullable
  
  1. Changes
    - Ensure expires_at column is nullable
    - This allows admin panel to create references with null expiration
    - Links remain valid until used (no time-based expiration)
    
  2. Safety
    - Uses IF EXISTS checks
    - Safe to run multiple times
*/

-- Make expires_at nullable if it isn't already
ALTER TABLE one_time_links 
  ALTER COLUMN expires_at DROP NOT NULL;

-- Verify the change worked
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'one_time_links' 
    AND column_name = 'expires_at'
    AND is_nullable = 'NO'
  ) THEN
    RAISE EXCEPTION 'expires_at is still NOT NULL';
  END IF;
END $$;
