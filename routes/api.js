import { Router } from 'express';
import {
  listPostsApi,
  getPostApi,
  createPostApi,
  updatePostApi,
  deletePostApi,
} from '../controllers/postController.js';
import {
  listProjectsApi,
  getProjectApi,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from '../controllers/projectController.js';

const router = Router();

// --- POSTS ---
router.get('/posts', listPostsApi);
router.get('/posts/:slug', getPostApi);
router.post('/posts', createPostApi);
router.put('/posts/:id', updatePostApi);
router.delete('/posts/:id', deletePostApi);

// --- PROJECTS ---
router.get('/projects', listProjectsApi);
router.get('/projects/:slug', getProjectApi);
router.post('/projects', createProjectApi);
router.put('/projects/:id', updateProjectApi);
router.delete('/projects/:id', deleteProjectApi);

export default router;
