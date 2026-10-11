import { getMode } from '../lib/chat-service.js';

export function GET() {
  return new Response(JSON.stringify({ mode: getMode() }), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff'
    }
  });
}
