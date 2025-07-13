// server/routes/deals.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// CREATE a new deal
router.post('/', async (req, res) => {
  const {
    title,
    description,
    original_price,
    sale_price,
    discount_percentage,
    image_url,
    featured,
    deal_of_day,
    url,
    categories, // array of UUIDs
  } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insertDealText = `
      INSERT INTO deals (title, description, original_price, sale_price, discount_percentage, image_url, featured, deal_of_day, url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING id
    `;
    const dealRes = await client.query(insertDealText, [
      title,
      description,
      original_price,
      sale_price,
      discount_percentage,
      image_url,
      featured,
      deal_of_day,
      url,
    ]);

    const dealId = dealRes.rows[0].id;

    for (const catId of categories) {
      await client.query(
        'INSERT INTO deal_categories (deal_id, category_id) VALUES ($1, $2)',
        [dealId, catId]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ id: dealId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Failed to create deal' });
  } finally {
    client.release();
  }
});

// READ all deals with categories
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT d.*,
        COALESCE(json_agg(json_build_object('id', c.id, 'name', c.name, 'slug', c.slug))
        FILTER (WHERE c.id IS NOT NULL), '[]') AS categories
      FROM deals d
      LEFT JOIN deal_categories dc ON d.id = dc.deal_id
      LEFT JOIN categories c ON dc.category_id = c.id
      GROUP BY d.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
});

// READ a single deal with categories
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT d.*,
        COALESCE(json_agg(json_build_object('id', c.id, 'name', c.name, 'slug', c.slug))
        FILTER (WHERE c.id IS NOT NULL), '[]') AS categories
      FROM deals d
      LEFT JOIN deal_categories dc ON d.id = dc.deal_id
      LEFT JOIN categories c ON dc.category_id = c.id
      WHERE d.id = $1
      GROUP BY d.id
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Deal not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch deal' });
  }
});

// UPDATE a deal
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    original_price,
    sale_price,
    discount_percentage,
    image_url,
    featured,
    deal_of_day,
    url,
    categories, // array of UUIDs
  } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const updateDealText = `
      UPDATE deals SET
        title = $1,
        description = $2,
        original_price = $3,
        sale_price = $4,
        discount_percentage = $5,
        image_url = $6,
        featured = $7,
        deal_of_day = $8,
        url = $9
      WHERE id = $10
    `;
    await client.query(updateDealText, [
      title,
      description,
      original_price,
      sale_price,
      discount_percentage,
      image_url,
      featured,
      deal_of_day,
      url,
      id,
    ]);

    await client.query('DELETE FROM deal_categories WHERE deal_id = $1', [id]);

    for (const catId of categories) {
      await client.query(
        'INSERT INTO deal_categories (deal_id, category_id) VALUES ($1, $2)',
        [id, catId]
      );
    }

    await client.query('COMMIT');
    res.json({ message: 'Deal updated' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Failed to update deal' });
  } finally {
    client.release();
  }
});

// DELETE a deal
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM deals WHERE id = $1', [id]);
    res.json({ message: 'Deal deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete deal' });
  }
});

export default router;
