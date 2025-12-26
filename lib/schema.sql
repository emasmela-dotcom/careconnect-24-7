-- CareConnect 24/7 Database Schema
-- Run this SQL in your Neon database to create all tables

-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Residents (User Profiles)
CREATE TABLE IF NOT EXISTS residents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  phone VARCHAR(50),
  email VARCHAR(255),
  emergency_contact TEXT,
  medical_conditions TEXT,
  allergies TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Caregivers (Care Team)
CREATE TABLE IF NOT EXISTS caregivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255),
  shift VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Medications
CREATE TABLE IF NOT EXISTS medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  resident_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  dosage VARCHAR(100),
  frequency VARCHAR(100),
  times TEXT[], -- Array of time strings
  photo_url TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vital Signs
CREATE TABLE IF NOT EXISTS vitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  resident_name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  heart_rate INTEGER,
  temperature DECIMAL(4,1),
  weight DECIMAL(5,2),
  glucose INTEGER,
  recorded_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  resident_name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  doctor_name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location VARCHAR(255),
  address TEXT,
  notes TEXT,
  checklist JSONB, -- Array of checklist items
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Symptoms
CREATE TABLE IF NOT EXISTS symptoms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  resident_id UUID REFERENCES residents(id) ON DELETE CASCADE,
  resident_name VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  symptoms TEXT NOT NULL,
  severity VARCHAR(20) CHECK (severity IN ('mild', 'moderate', 'severe')),
  duration VARCHAR(100),
  triggers TEXT,
  notes TEXT,
  recorded_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Completed Reminders (for persistence)
CREATE TABLE IF NOT EXISTS completed_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reminder_id VARCHAR(255) NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, reminder_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_residents_user_id ON residents(user_id);
CREATE INDEX IF NOT EXISTS idx_caregivers_user_id ON caregivers(user_id);
CREATE INDEX IF NOT EXISTS idx_medications_user_id ON medications(user_id);
CREATE INDEX IF NOT EXISTS idx_medications_resident_id ON medications(resident_id);
CREATE INDEX IF NOT EXISTS idx_vitals_user_id ON vitals(user_id);
CREATE INDEX IF NOT EXISTS idx_vitals_resident_id ON vitals(resident_id);
CREATE INDEX IF NOT EXISTS idx_vitals_date ON vitals(date);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_resident_id ON appointments(resident_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_symptoms_user_id ON symptoms(user_id);
CREATE INDEX IF NOT EXISTS idx_symptoms_resident_id ON symptoms(resident_id);
CREATE INDEX IF NOT EXISTS idx_symptoms_date ON symptoms(date);
CREATE INDEX IF NOT EXISTS idx_completed_reminders_user_id ON completed_reminders(user_id);

