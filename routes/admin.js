import { Router } from 'express';
import methodOverride from 'method-override';
import { requireAdmin } from '../middleware/auth.js';

import { createPost, getAllPosts, getPostById, updatePost, deletePost } 
  from '../models/postModel.js';

const router = Router();

router.use(requireAdmin);
router.use(methodOverride('_method'));

// Admin index
router.get('/', async (_req, res, next) => {
  try {
    const all = await getAllPosts();
    res.render('admin/index', { title: 'Admin · Posts', posts: all });
  } catch (e) { next(e); }
});

// New form
router.get('/posts/new', (_req, res) => {
  res.render('admin/new', { title: 'New Post' });
});

// Create
router.post('/posts', async (req, res, next) => {
  try {
    const { title, slug, excerpt = '', body } = req.body; // ⬅️ match model/table
    await createPost({ title, slug, excerpt, body });
    res.redirect('/admin');
  } catch (e) { next(e); }
});

// Edit form
router.get('/posts/:id/edit', async (req, res, next) => {
  try {
    const post = await getPostById(Number(req.params.id));
    if (!post) return res.sendStatus(404);
    res.render('admin/edit', { title: `Edit · ${post.title}`, post });
  } catch (e) { next(e); }
});

// Update
router.put('/posts/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, slug, excerpt = '', body } = req.body; // ⬅️ align fields
    await updatePost(id, { title, slug, excerpt, body });
    res.redirect('/admin');
  } catch (e) { next(e); }
});

// Delete
router.delete('/posts/:id', async (req, res, next) => {
  try {
    await deletePost(Number(req.params.id));
    res.redirect('/admin');
  } catch (e) { next(e); }
});

export default router;