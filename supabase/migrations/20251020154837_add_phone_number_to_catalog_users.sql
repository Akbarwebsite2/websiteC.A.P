/*
  # Add phone number field to catalog_users table
  
  1. Changes
    - Add phone_number column to catalog_users table
    - This field will store user's contact phone number during registration
  
  2. Notes
    - Phone number is optional during registration
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'catalog_users' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE catalog_users ADD COLUMN phone_number text;
  END IF;
END $$;