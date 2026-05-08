// ============================================
// SIM-T Backend Server
// Sistem Informasi Manajemen Tebing
// ============================================

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sim_t_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test Database Connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
    }
}

// ======================= USERS =======================
// Get all users
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Register
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role || 'user']
        );
        res.json({ id: result.insertId, name, email, role: role || 'user' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.query(
            'SELECT id, name, email, role FROM users WHERE email = ? AND password = ?',
            [email, password]
        );
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(401).json({ error: 'Email atau password salah' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ======================= JALUR =======================
// Get all jalur
app.get('/api/jalur', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM jalur ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create jalur
app.post('/api/jalur', async (req, res) => {
    try {
        const { nama, grade, lokasi, status } = req.body;
        const [result] = await pool.query(
            'INSERT INTO jalur (nama, grade, lokasi, status) VALUES (?, ?, ?, ?)',
            [nama, grade, lokasi, status || 'open']
        );
        res.json({ id: result.insertId, nama, grade, lokasi, status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update jalur
app.put('/api/jalur/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, grade, lokasi, status } = req.body;
        await pool.query(
            'UPDATE jalur SET nama = ?, grade = ?, lokasi = ?, status = ? WHERE id = ?',
            [nama, grade, lokasi, status, id]
        );
        res.json({ message: 'Jalur updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete jalur
app.delete('/api/jalur/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM jalur WHERE id = ?', [id]);
        res.json({ message: 'Jalur deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ======================= BOOKING =======================
// Get all booking
app.get('/api/booking', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT b.*, j.nama as jalur_nama 
            FROM booking b 
            LEFT JOIN jalur j ON b.jalur_id = j.id 
            ORDER BY b.id DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create booking
app.post('/api/booking', async (req, res) => {
    try {
        const { nama, jalur_id, tanggal, jumlah } = req.body;
        const [result] = await pool.query(
            'INSERT INTO booking (nama, jalur_id, tanggal, jumlah) VALUES (?, ?, ?, ?)',
            [nama, jalur_id, tanggal, jumlah]
        );
        res.json({ id: result.insertId, nama, jalur_id, tanggal, jumlah, status: 'pending' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update booking status
app.put('/api/booking/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await pool.query('UPDATE booking SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Booking status updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete booking
app.delete('/api/booking/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM booking WHERE id = ?', [id]);
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ======================= ALAT =======================
// Get all alat
app.get('/api/alat', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM alat ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create alat
app.post('/api/alat', async (req, res) => {
    try {
        const { nama, jumlah, kondisi } = req.body;
        const [result] = await pool.query(
            'INSERT INTO alat (nama, jumlah, kondisi) VALUES (?, ?, ?)',
            [nama, jumlah, kondisi || 'good']
        );
        res.json({ id: result.insertId, nama, jumlah, kondisi });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update alat
app.put('/api/alat/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, jumlah, kondisi } = req.body;
        await pool.query('UPDATE alat SET nama = ?, jumlah = ?, kondisi = ? WHERE id = ?', [nama, jumlah, kondisi, id]);
        res.json({ message: 'Alat updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete alat
app.delete('/api/alat/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM alat WHERE id = ?', [id]);
        res.json({ message: 'Alat deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ======================= RELAWAN =======================
// Get all relays
app.get('/api/relawan', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM relays ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create relays
app.post('/api/relawan', async (req, res) => {
    try {
        const { nama, hp, email, keahlian } = req.body;
        const [result] = await pool.query(
            'INSERT INTO relays (nama, hp, email, keahlian) VALUES (?, ?, ?, ?)',
            [nama, hp, email, keahlian]
        );
        res.json({ id: result.insertId, nama, hp, email, keahlian });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete relays
app.delete('/api/relawan/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM relays WHERE id = ?', [id]);
        res.json({ message: 'Relawan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ======================= BLOG =======================
// Get all blog
app.get('/api/blog', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM blog ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create blog
app.post('/api/blog', async (req, res) => {
    try {
        const { judul, isi } = req.body;
        const [result] = await pool.query(
            'INSERT INTO blog (judul, isi) VALUES (?, ?)',
            [judul, isi]
        );
        res.json({ id: result.insertId, judul, isi });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete blog
app.delete('/api/blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM blog WHERE id = ?', [id]);
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ======================= STATS =======================
// Get dashboard stats
app.get('/api/stats', async (req, res) => {
    try {
        const [booking] = await pool.query('SELECT COUNT(*) as count FROM booking');
        const [jalur] = await pool.query('SELECT COUNT(*) as count FROM jalur');
        const [alat] = await pool.query('SELECT COUNT(*) as count FROM alat');
        const [relawan] = await pool.query('SELECT COUNT(*) as count FROM relays');

        res.json({
            booking: booking[0].count,
            jalur: jalur[0].count,
            alat: alat[0].count,
            relays: relays[0].count
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(PORT, async () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    await testConnection();
});
