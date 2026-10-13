import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 3000);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml',
};

function error(res, status, message) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end(JSON.stringify({ error: message }));
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method !== 'GET' && req.method !== 'HEAD') return error(res, 405, 'Method not allowed.');
  let requested;
  try { requested = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname); }
  catch { return error(res, 400, 'Invalid path.'); }
  if (requested.split('/').some(segment => segment.startsWith('.'))) return error(res, 404, 'Not found.');
  const file = resolve(root, `.${requested}`);
  if (file !== root && !file.startsWith(root + sep)) return error(res, 403, 'Forbidden.');
  try {
    const info = await stat(file);
    if (!info.isFile()) return error(res, 404, 'Not found.');
    const content = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream', 'content-length': content.length, 'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin' });
    if (req.method === 'HEAD') return res.end();
    return res.end(content);
  } catch { return error(res, 404, 'Not found.'); }
});

let activePort = port;
server.on('listening', () => {
  const address = server.address();
  console.log(`Baymax is ready at http://127.0.0.1:${address.port}`);
});
server.on('error', error => {
  if (error.code === 'EADDRINUSE' && activePort < 65535) {
    console.warn(`Port ${activePort} is already in use; trying ${activePort + 1}.`);
    activePort += 1;
    server.listen(activePort, '127.0.0.1');
    return;
  }
  console.error(`Baymax could not start on port ${activePort}: ${error.message}`);
  process.exitCode = 1;
});
server.listen(activePort, '127.0.0.1');
