/*
  # Add updated_at field to catalog_users

  1. Changes
    - Add `updated_at` timestamp column to track when user records are updated
    - Useful for tracking when rejected users resubmit their registration

  2. Notes
    - Defaults to now() when record is created
    - Will be manually updated when users resubmit after rejection
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'catalog_users' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE catalog_users ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;
