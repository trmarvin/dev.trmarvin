--
-- PostgreSQL database dump
--

\restrict qeaogOXPAQkBgYBkwkAmgA41Fkw2nxFO2Zp0Biprdw6sOeeTfj2e1laUyC4YnXH

-- Dumped from database version 18.1 (Homebrew)
-- Dumped by pg_dump version 18.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Post" (id, slug, title, excerpt, content, "createdAt", "updatedAt", published) VALUES (4, 'reflections-bootcamp', 'Reflections from Bootcamp, Six Months In', 'I’m six months into a programming bootcamp, which feels both impossibly fast and somehow… not fast enough? Time in bootcamp is weird like that. Blink and you’ve learned three new frameworks. Blink again and you’re still stuck on the same concept you swore you understood yesterday.', 'I’m six months into a programming bootcamp, which feels both impossibly fast and somehow… not fast enough? Time in bootcamp is weird like that. Blink and you’ve learned three new frameworks. Blink again and you’re still stuck on the same concept you swore you understood yesterday.

One thing became clear very early on: the pace assumes a lot of self-learning. Not in a “here’s a gentle reading list” way, but in a “you will ask ChatGPT, panic slightly, read five conflicting Stack Overflow answers, and eventually emerge with a fragile understanding” way. Lectures set the direction, exercises reinforce the basics, but most of the real learning happens alone, after hours, with your IDE quietly judging you.

Which brings me to my biggest discovery so far: I learn the most when I’m building real things. Exercises are necessary — I’m not anti-exercise — but they’re like scales on a piano. Useful, important, occasionally soul-sucking. Real projects, on the other hand, are where everything clicks and falls apart at the same time. They force you to make decisions, confront edge cases, and realize that the tidy example from class bears only a passing resemblance to reality.

Projects are also where you learn the truest lesson of programming:

Programming is 98% breaking things and fixing them, 2% joy.

That 98% includes:

- Fixing something that worked five minutes ago
- Discovering the fix broke three other things
- Realizing the bug was a typo
- Then realizing it was actually another typo
- Then realizing it was neither typo, but your entire mental model that was wrong

The remaining 2%? Pure joy. A test finally passes. The app runs. The feature works. It will probably still look like something out of 1999, making your inner designer die a little. Nevertheless, you sit back, triumphant, briefly convinced you understand computers. This feeling lasts anywhere from 30 seconds to one hour, at which point something else breaks.

And yet — somehow — this is not discouraging. It’s… clarifying. I’ve stopped expecting programming to feel smooth. The friction is the work. Debugging isn’t a failure state; it’s the default mode. Once I internalized that, things got easier mentally, even when they didn’t get easier technically.

It can feel like cheating learning to talk to machines in this vibe coding era, but I''ve found AI to be incredibly helpful. It can critique my code, and I can ask it questions back, like why did you do this and not that in line 27? Or I ask it to explain one specific code snippet that I can''t wrap my head around. I''m grateful to be learning programming now and not earlier. I''m really curious and sometimes I can''t do an exercise without understanding down to assembly language, like how does this machine actually understand what I''m telling it to do?

As a recovering academic, it can be hard to get over the feeling that I need a second doctorate in comp sci now. But I try to remind myself that that''s not my specific purpose or contribution. I am a builder using new tools to bring my scholarship into digital. Hopefully, I''ll be able to bridge the two worlds in the next six months and beyond.', '2025-12-23 17:59:00.046', '2025-12-23 17:59:00.046', true);
INSERT INTO public."Post" (id, slug, title, excerpt, content, "createdAt", "updatedAt", published) VALUES (5, 'highlight-text', 'This is a syntax highlighting test', 'This is just a test to see if syntax highlighting is working.', 'This is just a test to see if syntax highlighting is working:

```ts
const greeting = "hello";
console.log(greeting);
```

And also:

Here is a test of syntax highlighting:

```ts
function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));
```

If this works, the code block should be colored.

While we''re here let''s also test some markdown:
- point 1
- point 2
', '2026-01-06 09:00:13.047', '2026-01-06 09:00:13.047', true);


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Project" (id, slug, title, summary, content, year, role, status, "techStack", "createdAt", "updatedAt") VALUES (4, 'kosher-world-kitchen', 'Kosher World Kitchen', 'Custom WordPress block theme with React-powered faceted search and regional taxonomy design.', NULL, 2025, 'Full-stack developer & designer', 'live', '{WordPress,PHP,React,Tailwind,"WP REST API"}', '2025-12-09 15:34:34.839', '2025-12-09 15:34:34.839');
INSERT INTO public."Project" (id, slug, title, summary, content, year, role, status, "techStack", "createdAt", "updatedAt") VALUES (5, 'trmarvin-org', 'trmarvin.org – Scholarly Site & Knowledge Platform', 'Strapi-powered knowledge platform for halakhic essays, teaching materials, and scholarly writing, with custom frontend styling and long-form content workflows.', NULL, 2025, 'Writer & developer', 'in-progress', '{Strapi,Next.js,TypeScript,Tailwind,PostgreSQL}', '2025-12-09 15:36:05.447', '2025-12-09 15:36:05.447');
INSERT INTO public."Project" (id, slug, title, summary, content, year, role, status, "techStack", "createdAt", "updatedAt") VALUES (3, 'dev-portfolio', 'Developer Portfolio (dev.trmarvin.org)', 'Next.js + Tailwind developer portfolio.', '
Overview  
I rebuilt my developer portfolio as a modern Next.js App Router project with a focus on clarity and maintainability rather than clever animations.

Goals  
- Have a real home for long-form project writeups and dev notes.  
- Practice Prisma, Tailwind, and the App Router on a real personal project.  
- Build something that can grow into a proper freelance / job-hunt hub.

Highlights  
- Blog backed by Postgres + Prisma with markdown content.  
- Project model with case-study pages and tech stack metadata.  
- Tailwind-powered design system that can scale to future sections (reading notes, now page, etc.).
', 2025, 'Full-stack developer', 'in-progress', '{Next.js,TypeScript,Tailwind,Prisma,PostgreSQL}', '2025-12-09 15:33:34.622', '2025-12-09 15:39:56.881');


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('bfa2f61a-2749-4fd7-bef2-284883a86fc1', '3544724bcc5a38b57feed7e581bec09cfbe1bf9e32f00d49e255f0aca8a55f4d', '2025-12-08 19:28:39.095394+02', '20251208172839_init_posts', NULL, NULL, '2025-12-08 19:28:39.063462+02', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('4eebe982-43d2-4eb6-92ba-e02644b0d2a8', '1c5baa9d648dafba444f3cbd0dd0b69a9596c7e899d19c210117711fab752f08', '2025-12-09 14:54:08.482905+02', '20251209125408_add_project_model', NULL, NULL, '2025-12-09 14:54:08.442328+02', 1);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Post_id_seq"', 5, true);


--
-- Name: Project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Project_id_seq"', 5, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

\unrestrict qeaogOXPAQkBgYBkwkAmgA41Fkw2nxFO2Zp0Biprdw6sOeeTfj2e1laUyC4YnXH

