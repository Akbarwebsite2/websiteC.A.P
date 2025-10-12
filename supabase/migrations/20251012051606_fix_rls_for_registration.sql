/*
  # Fix RLS for public registration

  1. Changes
    - Drop all existing policies
    - Recreate policies with correct permissions
    - Allow public (anon) role to INSERT new users
    - Allow authenticated users to read/update their own data

  2. Security
    - Public users can only insert (register)
    - Authenticated users can read and update only their own data
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can read own data" ON catalog_users;
DROP POLICY IF EXISTS "Users can update own profile" ON catalog_users;
DROP POLICY IF EXISTS "Allow anonymous registration" ON catalog_users;
DROP POLICY IF EXISTS "Anyone can register" ON catalog_users;

-- Allow anyone (including anonymous) to insert new users
CREATE POLICY "Enable insert for anonymous users"
  ON catalog_users
  FOR INSERT
  WITH CHECK (true);

-- Allow users to read their own data
CREATE POLICY "Enable read access for own data"
  ON catalog_users
  FOR SELECT
  USING (auth.uid()::text = id::text);

-- Allow users to update their own data
CREATE POLICY "Enable update for own data"
  ON catalog_users
  FOR UPDATE
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);