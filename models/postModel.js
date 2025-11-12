// models/postModel.js
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

/* ----- Read ----- */

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

export const getPostById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM posts WHERE id = $1`, [id]);
  return rows[0];
};

/* ----- Create ----- */

export const createPost = async ({ title, slug, excerpt, body }) => {
  const { rows } = await pool.query(
    `INSERT INTO posts (title, slug, excerpt, body)
     VALUES ($1, $2, $3, $4)
     RETURNING id, slug;`,
    [title, slug, excerpt, body]
  );
  return rows[0];
};

/* ----- Update ----- */

export const updatePost = async (id, { title, slug, excerpt, body }) => {
  const { rows } = await pool.query(
    `UPDATE posts
     SET title = $2, slug = $3, excerpt = $4, body = $5
     WHERE id = $1
     RETURNING id, slug;`,
    [id, title, slug, excerpt, body]
  );
  return rows[0];
};

/* ----- Delete ----- */

export const deletePost = async (id) => {
  await pool.query(`DELETE FROM posts WHERE id = $1`, [id]);
};

/* ----- Retrieve post for front page ----- */

export async function getLatestPosts(limit = 4) {
  const { rows } = await pool.query(
    `
    SELECT id, title, slug, excerpt, published_at
    FROM posts
    ORDER BY published_at DESC
    LIMIT $1;
    `,
    [limit]
  );
  return rows;
}