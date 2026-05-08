-- SIM-T Database Schema (MySQL)
-- Sistem Informasi Manajemen Tebing

CREATE DATABASE IF NOT EXISTS sim_t_db;
USE sim_t_db;

-- Table: users (Pengguna/System Users)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'relawan', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: jalur (Trek Routes)
CREATE TABLE IF NOT EXISTS jalur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    grade VARCHAR(20) NOT NULL,
    lokasi VARCHAR(100) NOT NULL,
    status ENUM('open', 'closed') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: booking (Reservasi/Daftar Pendakian)
CREATE TABLE IF NOT EXISTS booking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_user VARCHAR(100) NOT NULL,
    jalur_id INT NOT NULL,
    tanggal DATE NOT NULL,
    jumlah INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (jalur_id) REFERENCES jalur(id)
);

-- Mengisi data contoh untuk Jalur Pendakian
INSERT INTO jalur (nama, grade, lokasi, status) VALUES 
('Tebing Parang', 'Hard', 'Purwakarta', 'open'),
('Tebing Citatah 125', 'Medium', 'Padalarang', 'open'),
('Tebing Uluwatu', 'Extreme', 'Bali', 'closed');

-- Mengisi data contoh untuk User (Admin)
-- Password di sini contoh saja, nanti di PHP harus di-hash
INSERT INTO users (name, email, password, role) VALUES 
('Admin Hazril', 'admin@mail.com', 'admin123', 'admin'),
('User Pendaki', 'user@mail.com', 'user123', 'user');

-- Mengisi data contoh untuk Booking
INSERT INTO booking (nama_user, jalur_id, tanggal, jumlah, status) VALUES 
('User Pendaki', 1, '2026-05-01', 2, 'pending');