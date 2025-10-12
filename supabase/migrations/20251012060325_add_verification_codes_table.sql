/*
  # Add verification codes table

  1. New Tables
    - `verification_codes`
      - `id` (uuid, primary key)
      - `email` (text, not null)
      - `name` (text, not null)
      - `code` (text, not null) - 6-digit verification code
      - `password_hash` (text, not null) - stored for later user creation
      - `created_at` (timestamptz) - when code was generated
      - `expires_at` (timestamptz) - code expiration time (10 minutes)
      - `verified` (boolean) - whether code has been used
  
  2. Security
    - Enable RLS on `verification_codes` table
    - No policies needed as this is backend-only table
  
  3. Notes
    - Codes expire after 10 minutes
    - Used for email verification during registration
    - Cleaned up after successful verification
*/

CREATE TABLE IF NOT EXISTS verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text NOT NULL,
  code text NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  verified boolean DEFAULT false
);

ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_verification_codes_email ON verification_codes(email);
CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON verification_codes(code);
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires ON verification_codes(expires_at);
