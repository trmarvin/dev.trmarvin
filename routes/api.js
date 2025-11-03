import { Router } from 'express';
import { listPostsApi, getPostApi, createPostApi } from '../controllers/postController.js';
const router = Router();

router.get('/posts', listPostsApi);
router.get('/posts/:slug', getPostApi);
router.post('/posts', createPostApi);

export default router;