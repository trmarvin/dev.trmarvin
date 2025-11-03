import 'dotenv/config';
import { createPost, initTable } from '../models/postModel.js';

await initTable();

const posts = [
  {
    title: 'Hello, dev.trmarvin!',
    slug: 'hello-dev-trmarvin',
    excerpt: 'Bootstrapping the vanilla iteration.',
    body: '<p>This was built with Node, Express, EJS, and Postgres.</p>'
  },
  {
    title: 'Hackathon roadmap',
    slug: 'hackathon-roadmap',
    excerpt: 'Scope, milestones, and deployment plan.',
    body: '<p>Quick notes on what I shipped and what’s next.</p>'
  }
];

for (const p of posts) await createPost(p);
console.log('Seeded!');
process.exit(0);