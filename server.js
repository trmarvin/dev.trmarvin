import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import pages from './routes/pages.js';
import api from './routes/api.js';
import './config/db.js';
import expressLayouts from 'express-ejs-layouts';

const app = express();

// Core middleware (once)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

// EJS + express-ejs-layouts
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // views/layout.ejs

// Safe defaults for layout variables
app.use((req, res, next) => {
  res.locals.title = 'dev.trmarvin'; // default <title>
  res.locals.pageCSS = [];           // default extra CSS links
  res.locals.pageScripts = [];       // default extra scripts
  next();
});

// Routes
app.use('/', pages);
app.use('/api', api);

// Health check
app.get('/healthz', (_req, res) => res.send('ok'));

// 404
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  // Use the same key your layout reads: "title"
  res.status(404).render('index', { title: 'Not found' });
});

// 500
app.use((err, req, res, _next) => {
  console.error(err);
  if (req.path.startsWith('/api')) {
    return res.status(500).json({ error: 'Server error' });
  }
  res.status(500).send('Server error');
});

// DB init last before listen
const start = async () => {
  try {
    const { initTable } = await import('./models/postModel.js');
    await initTable();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`dev.trmarvin listening on ${PORT}`));
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
};

// diagnostics
process.on('unhandledRejection', (r) => console.error('Unhandled Rejection:', r));
process.on('uncaughtException', (e) => console.error('Uncaught Exception:', e));

start();
