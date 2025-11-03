// controllers/postController.js
import { getAllPosts, getPostBySlug, createPost } from '../models/postModel.js';

export const listPostsPage = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.render('blog', {
      title: 'Blog',                     // <-- use "title" (layout reads this)
      posts: Array.isArray(posts) ? posts : []  // <-- always an array
    });
  } catch (err) { next(err); }
};

export const singlePostPage = async (req, res, next) => {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) return next(); // falls through to your 404 handler
    res.render('post', {
      title: post.title,   // <-- use "title"
      post
    });
  } catch (err) { next(err); }
};

// APIs unchanged
export const listPostsApi = async (req, res, next) => {
  try { res.json(await getAllPosts()); } catch (err) { next(err); }
};

export const getPostApi = async (req, res, next) => {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) { next(err); }
};

export const createPostApi = async (req, res, next) => {
  try {
    if (req.headers.authorization !== `Bearer ${process.env.ADMIN_TOKEN}`)
      return res.status(401).json({ error: 'Unauthorized' });
    const post = await createPost(req.body);
    res.status(201).json(post);
  } catch (err) { next(err); }
};