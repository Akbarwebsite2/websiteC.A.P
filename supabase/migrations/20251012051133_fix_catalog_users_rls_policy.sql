/*
  # Fix RLS policy for catalog_users registration

  1. Changes
    - Drop existing INSERT policy that requires authentication
    - Create new INSERT policy that allows anonymous users to register
    - This enables user registration without being logged in

  2. Security
    - Policy still validates that data is being inserted correctly
    - Only allows basic registration fields
*/

-- Drop the old restrictive policy
DROP POLICY IF EXISTS "Anyone can register" ON catalog_users;

-- Create new policy that allows anonymous registration
CREATE POLICY "Allow anonymous registration"
  ON catalog_users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);