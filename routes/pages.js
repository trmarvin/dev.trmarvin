import { Router } from 'express';
import { homePage } from '../controllers/homeController.js';
import { listPostsPage, singlePostPage } from '../controllers/postController.js';

const router = Router();

router.get('/', homePage);          
router.get('/blog', listPostsPage);
router.get('/blog/:slug', singlePostPage);

export default router;
