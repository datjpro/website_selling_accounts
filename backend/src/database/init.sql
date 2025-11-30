-- =============================================
-- DATABASE SCHEMA FOR GAME ACCOUNT SELLING WEBSITE
-- =============================================

-- Drop existing tables if needed (for clean rebuild)
-- DROP TABLE IF EXISTS order_items CASCADE;
-- DROP TABLE IF EXISTS orders CASCADE;
-- DROP TABLE IF EXISTS product_images CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS categories CASCADE;
-- DROP TABLE IF EXISTS promotions CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS transactions CASCADE;
-- DROP TABLE IF EXISTS reviews CASCADE;

-- =============================================
-- 1. USERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'vip', 'admin')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'banned', 'suspended')),
    balance DECIMAL(15, 2) DEFAULT 0.00,
    total_spent DECIMAL(15, 2) DEFAULT 0.00,
    total_orders INTEGER DEFAULT 0,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 2. CATEGORIES TABLE (Game Categories)
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    icon_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 3. PRODUCTS TABLE (Game Accounts)
-- =============================================
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    game_title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    original_price DECIMAL(15, 2),
    discount_percent INTEGER DEFAULT 0,
    
    -- Account Details
    rank_level VARCHAR(100),
    server_region VARCHAR(50),
    account_type VARCHAR(50),
    has_email BOOLEAN DEFAULT FALSE,
    has_phone BOOLEAN DEFAULT FALSE,
    
    -- Stock & Status
    stock_quantity INTEGER DEFAULT 1,
    sold_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'sold', 'out_of_stock', 'draft')),
    
    -- Features
    is_featured BOOLEAN DEFAULT FALSE,
    is_hot BOOLEAN DEFAULT FALSE,
    badge VARCHAR(50), -- HOT, VIP, FLASH, MEGA, etc.
    
    -- Ratings
    rating_average DECIMAL(3, 2) DEFAULT 0.00,
    rating_count INTEGER DEFAULT 0,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 4. PRODUCT_IMAGES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 5. ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    
    -- Customer Info (in case user is deleted)
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    
    -- Order Details
    total_amount DECIMAL(15, 2) NOT NULL,
    discount_amount DECIMAL(15, 2) DEFAULT 0.00,
    final_amount DECIMAL(15, 2) NOT NULL,
    
    -- Payment
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    transaction_id VARCHAR(255),
    
    -- Order Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled', 'refunded')),
    
    -- Notes
    customer_note TEXT,
    admin_note TEXT,
    
    -- Timestamps
    paid_at TIMESTAMP,
    completed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 6. ORDER_ITEMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    
    -- Product Snapshot (in case product is deleted)
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(15, 2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    subtotal DECIMAL(15, 2) NOT NULL,
    
    -- Account Credentials (delivered after payment)
    account_username VARCHAR(255),
    account_password VARCHAR(255),
    account_email VARCHAR(255),
    additional_info TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 7. PROMOTIONS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS promotions (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed', 'gift')),
    discount_value DECIMAL(15, 2) NOT NULL,
    
    -- Conditions
    min_order_amount DECIMAL(15, 2) DEFAULT 0.00,
    max_discount_amount DECIMAL(15, 2),
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    usage_per_user INTEGER DEFAULT 1,
    
    -- Categories
    applicable_categories INTEGER[], -- Array of category IDs
    applicable_products INTEGER[], -- Array of product IDs
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    badge VARCHAR(50), -- HOT, FLASH, VIP, MEGA
    
    -- Validity
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 8. TRANSACTIONS TABLE (Payment History)
-- =============================================
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
    
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('deposit', 'purchase', 'refund', 'withdrawal')),
    amount DECIMAL(15, 2) NOT NULL,
    
    payment_method VARCHAR(50) NOT NULL,
    payment_gateway VARCHAR(50),
    gateway_transaction_id VARCHAR(255),
    
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    
    description TEXT,
    metadata JSONB, -- Additional data from payment gateway
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 9. REVIEWS TABLE (Product Reviews)
-- =============================================
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT TRUE,
    
    helpful_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- Products indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating_average);

-- Orders indexes
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);

-- Transactions indexes
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_order ON transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- Reviews indexes
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);

-- =============================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMP UPDATES
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_promotions_updated_at BEFORE UPDATE ON promotions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SAMPLE DATA
-- =============================================

-- Insert sample categories
INSERT INTO categories (name, slug, description, image_url, sort_order) VALUES
('Liên Quân Mobile', 'lien-quan-mobile', 'Tài khoản Liên Quân Mobile các rank', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400', 1),
('Free Fire', 'free-fire', 'Tài khoản Free Fire full đồ', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400', 2),
('PUBG Mobile', 'pubg-mobile', 'Tài khoản PUBG Mobile rank cao', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400', 3),
('Liên Minh: Tốc Chiến', 'lien-minh-toc-chien', 'Tài khoản Liên Minh: Tốc Chiến', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400', 4),
('Valorant', 'valorant', 'Tài khoản Valorant rank cao', 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400', 5),
('Genshin Impact', 'genshin-impact', 'Tài khoản Genshin Impact', 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400', 6)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (category_id, name, slug, game_title, description, price, original_price, discount_percent, rank_level, server_region, stock_quantity, is_featured, badge, rating_average, rating_count) VALUES
(1, 'Liên Quân VIP 15 - Full Tướng', 'lien-quan-vip-15', 'Liên Quân Mobile', 'Tài khoản Liên Quân Mobile VIP 15, sở hữu hơn 100 tướng, 50+ skin hiếm. Rank Cao Thủ 1 sao, có căn cước.', 2500000, 3000000, 17, 'VIP 15 - Cao Thủ', 'Việt Nam', 5, true, 'HOT', 4.8, 234),
(2, 'Free Fire - Căn cước + Full đồ', 'free-fire-full', 'Free Fire', 'Tài khoản Free Fire có căn cước, full pet, full skin súng, nhiều nhân vật hiếm. Rank Thách Đấu.', 1800000, 2200000, 18, 'Thách Đấu', 'Việt Nam', 12, true, 'VIP', 4.9, 189),
(3, 'PUBG Mobile - Conqueror Season 29', 'pubg-conqueror', 'PUBG Mobile', 'Tài khoản PUBG Mobile rank Chinh Phục mùa 29, có căn cước, full đồ hiếm, súng max cấp.', 3200000, 3500000, 9, 'Chinh Phục', 'Asia', 3, false, 'MEGA', 4.7, 156),
(4, 'Liên Minh: Tốc Chiến - Kim Cương', 'lmtc-kim-cuong', 'Liên Minh: Tốc Chiến', 'Tài khoản Tốc Chiến rank Kim Cương, full 40 tướng, nhiều skin đẹp, có căn cước.', 2100000, 2500000, 16, 'Kim Cương II', 'Việt Nam', 8, true, 'HOT', 4.6, 201),
(5, 'Valorant - Immortal Rank', 'valorant-immortal', 'Valorant', 'Tài khoản Valorant rank Bất Tử, full agent, nhiều skin súng đẹp. Server SEA.', 4500000, 5000000, 10, 'Immortal 2', 'SEA', 2, true, 'VIP', 4.9, 98),
(6, 'Genshin Impact - AR 58', 'genshin-ar58', 'Genshin Impact', 'Tài khoản Genshin AR 58, có 15+ nhân vật 5 sao, full vũ khí 5 sao, nhiều nguyên thạch.', 5200000, 6000000, 13, 'AR 58', 'Asia', 4, true, 'FLASH', 4.8, 167)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample product images
INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES
(1, 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800', true, 1),
(1, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', false, 2),
(2, 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800', true, 1),
(3, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800', true, 1),
(4, 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800', true, 1),
(5, 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800', true, 1),
(6, 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800', true, 1)
ON CONFLICT DO NOTHING;

-- Insert sample promotions
INSERT INTO promotions (code, title, description, discount_type, discount_value, min_order_amount, usage_limit, badge, is_active, start_date, end_date) VALUES
('WELCOME2024', 'Giảm 15% cho khách hàng mới', 'Áp dụng cho đơn hàng đầu tiên từ 500K', 'percentage', 15, 500000, 1000, 'HOT', true, '2024-01-01', '2025-12-31'),
('FLASH50', 'Flash Sale - Giảm 50K', 'Giảm ngay 50K cho mọi đơn hàng', 'fixed', 50000, 0, 500, 'FLASH', true, '2024-12-01', '2024-12-31'),
('VIP100', 'VIP - Giảm 100K cho đơn từ 1 triệu', 'Dành cho đơn hàng từ 1 triệu trở lên', 'fixed', 100000, 1000000, 200, 'VIP', true, '2024-11-01', '2025-01-31'),
('MEGA20', 'MEGA SALE - Giảm 20%', 'Giảm 20% tối đa 500K cho đơn từ 2 triệu', 'percentage', 20, 2000000, 100, 'MEGA', true, '2024-12-01', '2024-12-25')
ON CONFLICT (code) DO NOTHING;

-- Insert sample admin user (password: admin123 - should be hashed in production)
INSERT INTO users (username, email, password_hash, full_name, role, email_verified, status) VALUES
('admin', 'admin@shopacc.com', '$2a$10$rK8qP8X8qP8X8qP8X8qP8O', 'Administrator', 'admin', true, 'active')
ON CONFLICT (username) DO NOTHING;
