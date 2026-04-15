-- Create seats table
CREATE TABLE IF NOT EXISTS seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0
);

-- Insert 20 seats
INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(322) UNIQUE NOT NULL,
  password VARCHAR(66) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);