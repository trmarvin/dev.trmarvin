import { Router } from 'express';
import { homePage } from '../controllers/homeController.js';
import { listPostsPage, singlePostPage } from '../controllers/postController.js';
import { listProjectsPage, singleProjectPage } from '../controllers/projectController.js';

const router = Router();

router.get('/', homePage);
router.get('/blog', listPostsPage);
router.get('/blog/:slug', singlePostPage);

// Projects
router.get('/projects', listProjectsPage);
router.get('/projects/:slug', singleProjectPage);

export default router;
