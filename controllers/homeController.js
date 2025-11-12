import { getLatestPosts } from '../models/postModel.js';
import { getFeaturedProjects } from '../models/projectModel.js';

/* ------------------------- HOMEPAGE CONTROLLERS -------------------------------- */

export async function homePage(_req, res, next) {
  try {
    const posts = await getLatestPosts(4);
    const projects = await getFeaturedProjects(3);
    // pass safe defaults so EJS never breaks
    res.render('index', {
      title: 'dev.trmarvin',
      posts: posts ?? [],
      projects: projects ?? [],
    });
  } catch (err) { next(err); }
}