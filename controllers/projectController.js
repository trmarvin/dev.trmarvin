import {
  getAllProjects,
  getProjectBySlug,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../models/projectModel.js';

/* --------------------------- PROJECT PAGES --------------------------- */

// GET /projects
export async function listProjectsPage(_req, res, next) {
  try {
    const projects = await getAllProjects();
    res.render('projects', { title: 'Projects', projects });
  } catch (err) { next(err); }
}

// GET /projects/:slug
export async function singleProjectPage(req, res, next) {
  try {
    const project = await getProjectBySlug(req.params.slug);
    if (!project) {
      return res.status(404).render('index', { title: 'Not found', projects: [] });
    }
    res.render('project', { title: project.title, project });
  } catch (err) { next(err); }
}

/* --------------------------- PROJECT API --------------------------- */

// GET /api/projects
export async function listProjectsApi(_req, res, next) {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (err) { next(err); }
}

// GET /api/projects/:slug
export async function getProjectApi(req, res, next) {
  try {
    const project = await getProjectBySlug(req.params.slug);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) { next(err); }
}

/* ---------- REST OF PROJECT CRUD ---------- */

export async function createProjectApi(req, res, next) {
  try {
    const project = await createProject(req.body);
    res.status(201).json(project);
  } catch (err) { next(err); }
}

export async function updateProjectApi(req, res, next) {
  try {
    const project = await updateProject(req.params.id, req.body);
    res.json(project);
  } catch (err) { next(err); }
}

export async function deleteProjectApi(req, res, next) {
  try {
    await deleteProject(req.params.id);
    res.status(204).end();
  } catch (err) { next(err); }
}
