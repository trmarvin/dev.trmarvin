import pool from "../config/db.js";

/* ----- Retrieve projects for front page ----- */

export async function getFeaturedProjects(limit = 3) {
  const { rows } = await pool.query(
    `
    SELECT id, title, slug, summary, thumbnail_url, tags, published_at
    FROM "Project"
    WHERE is_featured IS TRUE
    ORDER BY published_at DESC
    LIMIT $1;
    `,
    [limit],
  );

  return rows;
}

export async function getAllProjects() {
  const { rows } = await pool.query(
    `
    SELECT id, title, slug, summary, thumbnail_url, tags, published_at
    FROM "Project"
    ORDER BY published_at DESC;
    `,
  );
  return rows;
}

export async function getProjectBySlug(slug) {
  const { rows } = await pool.query(
    `
    SELECT id, title, slug, summary, body, thumbnail_url, tags, published_at
    FROM "Project"
    WHERE slug = $1
    LIMIT 1;
    `,
    [slug],
  );
  return rows[0] || null;
}

/* --------------------------- CRUD --------------------------- */
export async function createProject(data) {
  const {
    title,
    slug,
    summary = "",
    body = "",
    thumbnail_url = null,
    tags = [],
  } = data;

  const { rows } = await pool.query(
    `
    INSERT INTO "Project" (title, slug, summary, body, thumbnail_url, tags, published_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING *;
    `,
    [title, slug, summary, body, thumbnail_url, tags],
  );

  return rows[0];
}

export async function updateProject(id, data) {
  const {
    title,
    slug,
    summary = "",
    body = "",
    thumbnail_url = null,
    tags = [],
  } = data;

  const { rows } = await pool.query(
    `
    UPDATE "Project"
    SET title = $1, slug = $2, summary = $3, body = $4, thumbnail_url = $5, tags = $6
    WHERE id = $7
    RETURNING *;
    `,
    [title, slug, summary, body, thumbnail_url, tags, id],
  );

  return rows[0];
}

export async function deleteProject(id) {
  await pool.query(`DELETE FROM "Project" WHERE id = $1;`, [id]);
}
