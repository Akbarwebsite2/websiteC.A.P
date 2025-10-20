/*
  # Add registration fields to verification_codes table
  
  1. Changes
    - Add company_name column to verification_codes table
    - Add address column to verification_codes table  
    - Add phone_number column to verification_codes table
    - These fields will temporarily store user data during registration process
  
  2. Notes
    - All fields are optional as they are temporary storage
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'verification_codes' AND column_name = 'company_name'
  ) THEN
    ALTER TABLE verification_codes ADD COLUMN company_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'verification_codes' AND column_name = 'address'
  ) THEN
    ALTER TABLE verification_codes ADD COLUMN address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'verification_codes' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE verification_codes ADD COLUMN phone_number text;
  END IF;
END $$;