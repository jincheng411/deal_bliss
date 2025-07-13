import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dealsRoutes from './routes/deals.js';
import pool from './db.js';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '../dist')));

app.use('/api/deals', dealsRoutes);

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // test query
    res.send(`Database time: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Database connection failed');
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
