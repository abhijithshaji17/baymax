import OpenAI from 'openai';

const model = process.env.OPENAI_MODEL || 'gpt-5.4-mini';
const apiKey = process.env.OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey }) : null;

const instructions = `You are Baymax, a calm, concise, non-judgmental personal healthcare companion. You are not a doctor, diagnostic tool, or emergency service. You may share general health information in plain language and help a user prepare questions for a qualified clinician. Never diagnose, claim to rule out a condition, or tell someone they are safe. Never prescribe medicine or recommend changing treatment. Ask at most one useful question at a time. Encourage contacting a clinician for concerns needing professional judgment. If the user describes a possible emergency, severe symptoms, immediate danger, or risk of self-harm, stop routine conversation and clearly tell them to contact their local emergency services now or go to an emergency department, and reach a nearby trusted person. Do not claim you can detect every emergency. Do not request identifying details. Keep replies brief and supportive.`;

export function getMode() {
  return openai ? 'ai' : 'demo';
}

function demoReply() {
  return 'DEMO MODE — this is a fixed sample reply, not an AI response. I’m here to listen. You might write down what you’ve noticed and when it started, then share that with a qualified clinician if you’re concerned. What would you like help organizing?';
}

export async function getChatResult(payload) {
  const history = Array.isArray(payload?.messages) ? payload.messages.slice(-8) : [];
  const clean = history
    .filter(item => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
    .map(item => ({ role: item.role, content: item.content.slice(0, 2000) }));

  if (!clean.length || clean.at(-1).role !== 'user' || !clean.at(-1).content.trim()) {
    return { status: 400, body: { error: 'Write a message to begin.' } };
  }
  if (!openai) {
    return { status: 200, body: { mode: 'demo', reply: demoReply() } };
  }

  try {
    const response = await openai.responses.create({
      model,
      instructions,
      input: clean.map(item => ({ role: item.role, content: item.content })),
      max_output_tokens: 450
    });
    return { status: 200, body: { mode: 'ai', reply: response.output_text || '' } };
  } catch {
    return { status: 502, body: { error: 'The AI service is temporarily unavailable. Please try again or contact a clinician directly if you need medical advice.' } };
  }
}
