import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { getChatResult, getMode } from './lib/chat-service.js';

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 3000);
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.obj': 'text/plain; charset=utf-8', '.mtl': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml' };

function json(res, status, value) {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
  res.end(JSON.stringify(value));
}

async function readJson(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 24_000) throw new Error('Message is too large.');
  }
  return JSON.parse(body || '{}');
}

async function handleApi(req, res, url) {
  if (url.pathname === '/api/status' && req.method === 'GET') return json(res, 200, { mode: getMode() });
  if (url.pathname !== '/api/chat') return json(res, 404, { error: 'Not found.' });
  if (req.method !== 'POST') return json(res, 405, { error: 'Use POST for chat.' });
  let payload;
  try { payload = await readJson(req); } catch (error) { return json(res, 400, { error: error.message === 'Message is too large.' ? error.message : 'Could not read the message.' }); }
  const result = await getChatResult(payload);
  return json(res, result.status, result.body);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (url.pathname.startsWith('/api/')) return handleApi(req, res, url);
  if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'Method not allowed.' });
  let requested;
  try { requested = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname); }
  catch { return json(res, 400, { error: 'Invalid path.' }); }
  if (requested.split('/').some(segment => segment.startsWith('.'))) return json(res, 404, { error: 'Not found.' });
  const file = resolve(root, `.${requested}`);
  if (file !== root && !file.startsWith(root + sep)) return json(res, 403, { error: 'Forbidden.' });
  try {
    const info = await stat(file);
    if (!info.isFile()) return json(res, 404, { error: 'Not found.' });
    const content = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream', 'content-length': content.length, 'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin' });
    if (req.method === 'HEAD') return res.end();
    return res.end(content);
  } catch { return json(res, 404, { error: 'Not found.' }); }
});

let activePort = port;
server.on('listening', () => {
  const address = server.address();
  console.log(`Baymax is ready at http://127.0.0.1:${address.port} (${getMode() === 'ai' ? 'AI mode' : 'DEMO MODE'})`);
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
