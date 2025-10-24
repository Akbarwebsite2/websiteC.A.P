/*
  # Add qty field to catalog_parts table

  1. Changes
    - Add `qty` column to `catalog_parts` table to store quantity information
    - Default value is '0' for existing records

  2. Notes
    - This field will store quantity from Excel columns "QTY" or "Available Qty"
    - Stored as text to preserve original format from Excel
*/

-- Add qty column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'catalog_parts' AND column_name = 'qty'
  ) THEN
    ALTER TABLE catalog_parts ADD COLUMN qty text DEFAULT '0';
  END IF;
END $$;