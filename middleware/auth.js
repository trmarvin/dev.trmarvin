import basicAuth from 'basic-auth';

export function requireAdmin(req, res, next) {
  const creds = basicAuth(req);
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;
  if (creds && creds.name === user && creds.pass === pass) return next();
  res.set('WWW-Authenticate', 'Basic realm="admin"');
  return res.status(401).send('Auth required');
}