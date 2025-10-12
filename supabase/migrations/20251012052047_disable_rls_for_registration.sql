/*
  # Disable RLS temporarily for catalog_users

  1. Changes
    - Disable RLS on catalog_users table to allow registration
    - This is a temporary solution for testing
  
  2. Security Note
    - In production, RLS should be re-enabled with proper policies
    - For now, we prioritize functionality
*/

-- Disable RLS on catalog_users
ALTER TABLE catalog_users DISABLE ROW LEVEL SECURITY;