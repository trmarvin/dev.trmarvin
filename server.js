import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import pages from './routes/pages.js';
import api from './routes/api.js';
import admin from './routes/admin.js';
import './config/db.js';
import expressLayouts from 'express-ejs-layouts';
import cors from 'cors';
import helmet from "helmet";
import compression from "compression";
import { rateLimit } from "express-rate-limit";

const app = express();

// ===== CORS =====
// Basic setup for now (allow everything during dev)
app.use(cors());

// Later: tighten this up once you know your frontends
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://dev.trmarvin.org'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true, // if using cookies or auth
// }));

// Mount core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use((req, res, next) => {
  res.locals.path = req.path; // makes "path" available in all EJS views
  next();
});

// Mount router
app.use('/', pages);
app.use('/api', api);
app.use('/admin', admin);
app.use(express.static(path.join(process.cwd(), 'public')));

// Helmet & other security features
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

// Only rate-limit sensitive endpoints
const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});

app.use("/admin", sensitiveLimiter);

// static cache
app.use(express.static("public", { maxAge: "7d", etag: true }));


// Health check -> for future deployment
app.get('/healthz', (_req, res) => res.send('ok'));

// 404 handler (AFTER all routes)
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(404).type('text').send('Not found');
});

// 500 handler (LAST; note 4 args)
app.use((err, req, res, next) => {
  // If headers already sent, delegate to Express' default
  if (res.headersSent) return next(err);

  // Log full error (stack in dev)
  console.error(err && err.stack ? err.stack : err);

  if (req.path.startsWith('/api')) {
    return res.status(500).json({
      error: 'Server error',
      // include message in dev only
      ...(process.env.NODE_ENV !== 'production' && { detail: String(err?.message || err) }),
    });
  }

  // Plain text response, no templates
  const body =
    process.env.NODE_ENV !== 'production'
      ? `Server error\n\n${err && err.stack ? err.stack : String(err)}`
      : 'Server error';

  res.status(500).type('text').send(body);
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

// start server
start();
