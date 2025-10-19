/*
  # Add User Approval System

  1. Changes
    - Add `status` column to `catalog_users` table (pending/approved/rejected)
    - Add `company_name` column to store user's company information
    - Add `address` column to store user's address
    - Add `created_at` timestamp for tracking registration date
    - Update RLS policies to only allow approved users to access catalog
  
  2. Security
    - Only approved users can search the catalog
    - Admins can see all users regardless of status
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'catalog_users' AND column_name = 'status'
  ) THEN
    ALTER TABLE catalog_users ADD COLUMN status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'catalog_users' AND column_name = 'company_name'
  ) THEN
    ALTER TABLE catalog_users ADD COLUMN company_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'catalog_users' AND column_name = 'address'
  ) THEN
    ALTER TABLE catalog_users ADD COLUMN address text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'catalog_users' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE catalog_users ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;
END $$;

DROP POLICY IF EXISTS "Allow public read access to catalog parts" ON catalog_parts;

CREATE POLICY "Only approved users can read catalog parts"
  ON catalog_parts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM catalog_users
      WHERE catalog_users.email = current_setting('request.jwt.claims', true)::json->>'email'
      AND catalog_users.status = 'approved'
    )
  );