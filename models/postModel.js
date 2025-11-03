import pool from '../config/db.js';

export const initTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      body TEXT NOT NULL,
      published_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const getAllPosts = async () => {
  const { rows } = await pool.query(`
    SELECT id, title, slug, excerpt, published_at
    FROM posts
    ORDER BY published_at DESC;
  `);
  return rows;
};

export const getPostBySlug = async (slug) => {
  const { rows } = await pool.query(`SELECT * FROM posts WHERE slug = $1`, [slug]);
  return rows[0];
};

export const createPost = async ({ title, slug, excerpt, body }) => {
  const { rows } = await pool.query(
    `INSERT INTO posts (title, slug, excerpt, body)
     VALUES ($1, $2, $3, $4)
     RETURNING id;`,
    [title, slug, excerpt, body]
  );
  return rows[0];
};