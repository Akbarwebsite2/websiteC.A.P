/*
  # Fix RLS for verification_codes table

  1. Changes
    - Disable RLS on verification_codes table
    - This table is used for temporary code storage during registration
    - No user authentication is available at registration time
  
  2. Security Notes
    - Table stores temporary verification codes
    - Codes expire after 10 minutes
    - Backend-only operations
*/

ALTER TABLE verification_codes DISABLE ROW LEVEL SECURITY;
