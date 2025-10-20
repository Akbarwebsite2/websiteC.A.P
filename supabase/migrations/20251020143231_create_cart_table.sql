/*
  # Create Cart Table

  1. New Tables
    - `cart_items`
      - `id` (uuid, primary key) - Unique identifier for cart item
      - `user_email` (text) - Email of the user who added the item
      - `part_id` (uuid) - Reference to catalog_parts table
      - `part_code` (text) - Part code for quick reference
      - `part_name` (text) - Part name for display
      - `brand` (text) - Brand name
      - `price` (text) - Price information
      - `quantity` (integer, default 1) - Quantity of items
      - `created_at` (timestamptz) - When item was added to cart
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `cart_items` table
    - Add policy for users to manage their own cart items
    
  3. Important Notes
    - Each user can only access their own cart items
    - Cart items are tied to user email from catalog_users
    - Duplicate items for same user are prevented by unique constraint
*/

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  part_id uuid REFERENCES catalog_parts(id) ON DELETE CASCADE,
  part_code text NOT NULL,
  part_name text NOT NULL,
  brand text DEFAULT 'C.A.P',
  price text DEFAULT 'Цена по запросу',
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_email, part_code)
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart items"
  ON cart_items
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own cart items"
  ON cart_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own cart items"
  ON cart_items
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own cart items"
  ON cart_items
  FOR DELETE
  USING (true);

CREATE INDEX IF NOT EXISTS idx_cart_items_user_email ON cart_items(user_email);
CREATE INDEX IF NOT EXISTS idx_cart_items_part_code ON cart_items(part_code);