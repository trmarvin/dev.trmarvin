// routes/pages.js
import { Router } from 'express';
import { listPostsPage, singlePostPage } from '../controllers/postController.js';

const router = Router();

router.get('/', (req, res) => res.render('index', { title: 'dev.trmarvin' })); // <-- use "title"
router.get('/blog', listPostsPage);
router.get('/blog/:slug', singlePostPage);

export default router;
