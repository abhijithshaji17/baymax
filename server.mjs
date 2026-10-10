import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import OpenAI from 'openai';

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 3000);
const model = process.env.OPENAI_MODEL || 'gpt-5.4-mini';
const aiEnabled = Boolean(process.env.OPENAI_API_KEY);
const openai = aiEnabled ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.obj': 'text/plain; charset=utf-8', '.mtl': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml' };

const instructions = `You are Baymax, a calm, concise, non-judgmental personal healthcare companion. You are not a doctor, diagnostic tool, or emergency service. You may share general health information in plain language and help a user prepare questions for a qualified clinician. Never diagnose, claim to rule out a condition, or tell someone they are safe. Never prescribe medicine or recommend changing treatment. Ask at most one useful question at a time. Encourage contacting a clinician for concerns needing professional judgment. If the user describes a possible emergency, severe symptoms, immediate danger, or risk of self-harm, stop routine conversation and clearly tell them to contact their local emergency services now or go to an emergency department, and reach a nearby trusted person. Do not claim you can detect every emergency. Do not request identifying details. Keep replies brief and supportive.`;

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

function demoReply() {
  return 'DEMO MODE — this is a fixed sample reply, not an AI response. I’m here to listen. You might write down what you’ve noticed and when it started, then share that with a qualified clinician if you’re concerned. What would you like help organizing?';
}

async function handleApi(req, res, url) {
  if (url.pathname === '/api/status' && req.method === 'GET') return json(res, 200, { mode: aiEnabled ? 'ai' : 'demo' });
  if (url.pathname !== '/api/chat') return json(res, 404, { error: 'Not found.' });
  if (req.method !== 'POST') return json(res, 405, { error: 'Use POST for chat.' });
  let payload;
  try { payload = await readJson(req); } catch (error) { return json(res, 400, { error: error.message === 'Message is too large.' ? error.message : 'Could not read the message.' }); }
  const history = Array.isArray(payload.messages) ? payload.messages.slice(-8) : [];
  const clean = history.filter(item => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string').map(item => ({ role: item.role, content: item.content.slice(0, 2000) }));
  if (!clean.length || clean.at(-1).role !== 'user' || !clean.at(-1).content.trim()) return json(res, 400, { error: 'Write a message to begin.' });
  if (!aiEnabled) return json(res, 200, { mode: 'demo', reply: demoReply() });
  try {
    const response = await openai.responses.create({ model, instructions, input: clean.map(item => ({ role: item.role, content: item.content })), max_output_tokens: 450 });
    return json(res, 200, { mode: 'ai', reply: response.output_text || '' });
  } catch {
    return json(res, 502, { error: 'The AI service is temporarily unavailable. Please try again or contact a clinician directly if you need medical advice.' });
  }
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

server.listen(port, '127.0.0.1', () => console.log(`Baymax is ready at http://127.0.0.1:${port} (${aiEnabled ? `AI: ${model}` : 'DEMO MODE'})`));
