-- Migration: Add password_hash column to users table
-- Run this in your Neon database console

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS password_hash TEXT;


