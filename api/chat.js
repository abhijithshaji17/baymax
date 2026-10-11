import { getChatResult } from '../lib/chat-service.js';

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}

export async function POST(request) {
  let raw;
  try {
    raw = await request.text();
  } catch {
    return json({ error: 'Could not read the message.' }, 400);
  }
  if (raw.length > 24_000) return json({ error: 'Message is too large.' }, 400);

  let payload;
  try {
    payload = JSON.parse(raw || '{}');
  } catch {
    return json({ error: 'Could not read the message.' }, 400);
  }

  const result = await getChatResult(payload);
  return json(result.body, result.status);
}
