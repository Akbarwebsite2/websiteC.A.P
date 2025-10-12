/*
  # Create catalog parts table

  1. New Tables
    - `catalog_parts`
      - `id` (uuid, primary key)
      - `code` (text, part number/code)
      - `name` (text, part name)
      - `brand` (text, brand name)
      - `price` (text, price information)
      - `weight` (text, weight information)
      - `category` (text, category)
      - `description` (text, detailed description)
      - `availability` (text, availability status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `catalog_parts` table
    - Add policy for authenticated users to read catalog
    - Add policy for admin users to insert/update/delete catalog
  
  3. Indexes
    - Add index on `code` for fast lookup
    - Add index on `name` for search
    - Add unique constraint on `code` to prevent duplicates
*/

CREATE TABLE IF NOT EXISTS catalog_parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  name text NOT NULL,
  brand text DEFAULT 'C.A.P',
  price text DEFAULT 'Цена по запросу',
  weight text DEFAULT '',
  category text DEFAULT 'Автозапчасти',
  description text,
  availability text DEFAULT 'В наличии',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint on code
CREATE UNIQUE INDEX IF NOT EXISTS catalog_parts_code_unique ON catalog_parts(code);

-- Add indexes for fast search
CREATE INDEX IF NOT EXISTS catalog_parts_code_idx ON catalog_parts(code);
CREATE INDEX IF NOT EXISTS catalog_parts_name_idx ON catalog_parts(name);
CREATE INDEX IF NOT EXISTS catalog_parts_brand_idx ON catalog_parts(brand);

-- Enable RLS
ALTER TABLE catalog_parts ENABLE ROW LEVEL SECURITY;

-- Policy: All authenticated users can read catalog
CREATE POLICY "Authenticated users can read catalog"
  ON catalog_parts
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only admin users can insert catalog parts
CREATE POLICY "Admin users can insert catalog"
  ON catalog_parts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt()->>'email' IN ('t8.fd88@gmail.com', 'admin@cap.com')
  );

-- Policy: Only admin users can update catalog parts
CREATE POLICY "Admin users can update catalog"
  ON catalog_parts
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN ('t8.fd88@gmail.com', 'admin@cap.com')
  )
  WITH CHECK (
    auth.jwt()->>'email' IN ('t8.fd88@gmail.com', 'admin@cap.com')
  );

-- Policy: Only admin users can delete catalog parts
CREATE POLICY "Admin users can delete catalog"
  ON catalog_parts
  FOR DELETE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN ('t8.fd88@gmail.com', 'admin@cap.com')
  );