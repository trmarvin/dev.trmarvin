// controllers/postController.js
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} from '../models/postModel.js';

/* ------------------------- CRUD ------------------------- */

// GET /api/posts (all posts)
export async function listPostsApi(_req, res, next) {
  try {
    const posts = await getAllPosts();
    res.json(posts);                    // << JSON, not res.render
  } catch (err) { next(err); }
}

// GET /api/posts/:slug (individual post)
export async function getPostApi(req, res, next) {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) { next(err); }
}

// POST /api/posts
export async function createPostApi(req, res, next) {
  try {
    const { title, slug, excerpt = '', body } = req.body;
    if (!title || !slug || !body) {
      return res.status(400).json({ error: 'title, slug, body are required' });
    }
    const created = await createPost({ title, slug, excerpt, body });
    res.status(201).location(`/api/posts/${created.slug}`).json(created);
  } catch (err) {
    if (err?.code === '23505') return res.status(409).json({ error: 'Slug already exists' });
    next(err);
  }
}

// PUT /api/posts/:id
export async function updatePostApi(req, res, next) {
  try {
    const id = Number(req.params.id);
    const found = await getPostById(id);
    if (!found) return res.status(404).json({ error: 'Not found' });
    const { title, slug, excerpt = '', body } = req.body;
    if (!title || !slug || !body) {
      return res.status(400).json({ error: 'title, slug, body are required' });
    }
    const updated = await updatePost(id, { title, slug, excerpt, body });
    res.json(updated);
  } catch (err) {
    if (err?.code === '23505') return res.status(409).json({ error: 'Slug already exists' });
    next(err);
  }
}

// DELETE /api/posts/:id
export async function deletePostApi(req, res, next) {
  try {
    const id = Number(req.params.id);
    const found = await getPostById(id);
    if (!found) return res.status(404).json({ error: 'Not found' });
    await deletePost(id);
    res.status(204).end();
  } catch (err) { next(err); }
}

/* --------------------------- GET BLOG POSTS --------------------------- */

// GET /blog
export async function listPostsPage(_req, res, next) {
  try {
    const posts = await getAllPosts();
    res.render('blog', { title: 'Blog', posts });   // renders EJS list
  } catch (err) { next(err); }
}

// GET /blog/:slug
export async function singlePostPage(req, res, next) {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) return res.status(404).render('index', { title: 'Not found', posts: [] });
    res.render('post', { title: post.title, post }); // renders EJS single
  } catch (err) { next(err); }
}