-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'sold', 'pending')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_accounts_status ON accounts(status);
CREATE INDEX IF NOT EXISTS idx_accounts_category ON accounts(category);

-- Insert sample data
INSERT INTO accounts (title, description, price, category, status) VALUES
('Premium Game Account', 'Level 100 with rare items', 99.99, 'Gaming', 'available'),
('Social Media Account', 'Account with 10K followers', 49.99, 'Social', 'available'),
('Streaming Account', 'Premium subscription included', 29.99, 'Entertainment', 'available');
