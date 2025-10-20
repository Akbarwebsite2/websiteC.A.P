/*
  # Add admin role to catalog users

  1. Changes
    - Add `is_admin` boolean column to `catalog_users` table
    - Default value is false for regular users
    - Allow admins to bypass registration approval

  2. Security
    - Maintains existing RLS policies
    - Admin flag allows special privileges in application logic
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'catalog_users' AND column_name = 'is_admin'
  ) THEN
    ALTER TABLE catalog_users ADD COLUMN is_admin boolean DEFAULT false;
  END IF;
END $$;