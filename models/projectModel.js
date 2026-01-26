import pool from "../config/db.js";

/* ----- Retrieve projects for front page ----- */

// No is_featured / published_at in this schema.
// Treat “featured” as “most recent” by createdAt.
export async function getFeaturedProjects(limit = 3) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      slug,
      title,
      summary,
      content,
      year,
      role,
      status,
      "techStack",
      "createdAt",
      "updatedAt"
    FROM "Project"
    ORDER BY "createdAt" DESC
    LIMIT $1;
    `,
    [limit],
  );

  return rows;
}

export async function getAllProjects() {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      slug,
      title,
      summary,
      content,
      year,
      role,
      status,
      "techStack",
      "createdAt",
      "updatedAt"
    FROM "Project"
    ORDER BY "createdAt" DESC;
    `,
  );
  return rows;
}

export async function getProjectBySlug(slug) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      slug,
      title,
      summary,
      content,
      year,
      role,
      status,
      "techStack",
      "createdAt",
      "updatedAt"
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
    content = "",
    year = null,
    role = "",
    status = "",
    techStack = "",
  } = data;

  const { rows } = await pool.query(
    `
    INSERT INTO "Project"
      (title, slug, summary, content, year, role, status, "techStack", "createdAt", "updatedAt")
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
    RETURNING *;
    `,
    [title, slug, summary, content, year, role, status, techStack],
  );

  return rows[0];
}

export async function updateProject(id, data) {
  const {
    title,
    slug,
    summary = "",
    content = "",
    year = null,
    role = "",
    status = "",
    techStack = "",
  } = data;

  const { rows } = await pool.query(
    `
    UPDATE "Project"
    SET
      title = $1,
      slug = $2,
      summary = $3,
      content = $4,
      year = $5,
      role = $6,
      status = $7,
      "techStack" = $8,
      "updatedAt" = NOW()
    WHERE id = $9
    RETURNING *;
    `,
    [title, slug, summary, content, year, role, status, techStack, id],
  );

  return rows[0];
}

export async function deleteProject(id) {
  await pool.query(`DELETE FROM "Project" WHERE id = $1;`, [id]);
}
