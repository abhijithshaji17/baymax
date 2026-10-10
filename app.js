const chatForm = document.querySelector('#chatForm');
const chatInput = document.querySelector('#chatInput');
const messages = document.querySelector('#messages');
const typing = document.querySelector('#typingIndicator');
const sendButton = document.querySelector('#sendButton');
const checkinDialog = document.querySelector('#checkinDialog');
const notesDialog = document.querySelector('#notesDialog');
const privacyDialog = document.querySelector('#privacyDialog');
const conversation = [];
const STORAGE_KEY = 'baymax-care-notes-v1';
let toastTimer;

function toast(message) {
  const el = document.querySelector('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function addMessage(role, text) {
  const row = document.createElement('div');
  row.className = `message-row ${role === 'user' ? 'user' : 'assistant'}`;
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.setAttribute('aria-hidden', 'true');
  avatar.textContent = role === 'user' ? 'YOU' : '✳';
  const content = document.createElement('div');
  content.className = 'message-content';
  const name = document.createElement('p');
  name.className = 'message-name';
  const label = document.createElement('span');
  label.textContent = 'JUST NOW';
  name.append(role === 'user' ? 'YOU' : 'BAYMAX', label);
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = text;
  content.append(name, bubble);
  row.append(avatar, content);
  messages.append(row);
  messages.scrollTop = messages.scrollHeight;
  return bubble;
}

function setBusy(isBusy) {
  typing.hidden = !isBusy;
  sendButton.disabled = isBusy;
  chatInput.disabled = isBusy;
  if (!isBusy) chatInput.focus();
}

async function sendMessage(rawText) {
  const text = rawText.trim();
  if (!text || sendButton.disabled) return;
  addMessage('user', text);
  conversation.push({ role: 'user', content: text });
  chatInput.value = '';
  chatInput.style.height = 'auto';
  setBusy(true);
  try {
    const response = await fetch('/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: conversation.slice(-8) })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Baymax could not reply. Please try again.');
    if (data.mode) setMode(data.mode);
    const reply = String(data.reply || '').trim();
    if (!reply) throw new Error('Baymax returned an empty reply. Please try again.');
    addMessage('assistant', reply);
    conversation.push({ role: 'assistant', content: reply });
  } catch (error) {
    const bubble = addMessage('assistant', `I couldn’t connect just now. ${error.message} You can try again, or contact a clinician directly if you need medical advice.`);
    bubble.setAttribute('data-error', 'true');
  } finally { setBusy(false); }
}

function setMode(mode) {
  const pill = document.querySelector('#modePill');
  const label = document.querySelector('#modeLabel');
  const isLive = mode === 'ai';
  pill.classList.toggle('live', isLive);
  label.textContent = isLive ? 'AI mode · key configured' : 'Demo mode · sample replies';
}

async function loadMode() {
  try {
    const res = await fetch('/api/status');
    const data = await res.json();
    setMode(data.mode);
  } catch { setMode('demo'); }
}

chatForm.addEventListener('submit', event => {
  event.preventDefault();
  sendMessage(chatInput.value);
});
chatInput.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); chatForm.requestSubmit(); }
});
chatInput.addEventListener('input', () => { chatInput.style.height = 'auto'; chatInput.style.height = `${Math.min(chatInput.scrollHeight, 100)}px`; });
document.querySelectorAll('[data-starter]').forEach(button => button.addEventListener('click', () => { chatInput.value = button.dataset.starter; document.querySelector('#companion').scrollIntoView({ behavior: 'smooth' }); chatInput.focus(); }));
document.querySelector('#clearChat').addEventListener('click', () => {
  conversation.length = 0;
  messages.replaceChildren();
  const welcome = document.createElement('div'); welcome.className = 'welcome-message';
  welcome.innerHTML = '<div class="message-avatar" aria-hidden="true">✳</div><div class="message-content"><p class="message-name">Baymax <span>JUST NOW</span></p><div class="message-bubble">Hello. I’m Baymax, your personal healthcare companion. What would you like to talk about today?</div></div>';
  messages.append(welcome); toast('This conversation was cleared from the tab.');
});

function openDialog(dialog) { if (!dialog.open) dialog.showModal(); }
document.querySelectorAll('[data-open-checkin]').forEach(button => button.addEventListener('click', () => openDialog(checkinDialog)));
document.querySelectorAll('[data-open-notes]').forEach(button => button.addEventListener('click', () => { loadNotes(); openDialog(notesDialog); }));
document.querySelector('#chatHelp').addEventListener('click', () => openDialog(privacyDialog));
document.querySelector('#chatPrivacy').addEventListener('click', () => openDialog(privacyDialog));
document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelector('#skipCheckin').addEventListener('click', () => { checkinDialog.close(); document.querySelector('#companion').scrollIntoView({ behavior: 'smooth' }); chatInput.focus(); });
document.querySelector('#checkinForm').addEventListener('submit', event => {
  event.preventDefault();
  const mood = document.querySelector('#moodSelect').value;
  const detail = document.querySelector('#checkinText').value.trim();
  const duration = document.querySelector('#durationSelect').value;
  const parts = [];
  if (mood) parts.push(`I’m feeling ${mood.toLowerCase()} today.`);
  if (detail) parts.push(detail);
  if (duration) parts.push(`This has been on my mind for: ${duration.toLowerCase()}.`);
  checkinDialog.close();
  document.querySelector('#checkinForm').reset();
  document.querySelector('#companion').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => parts.length ? sendMessage(parts.join(' ')) : chatInput.focus(), 250);
});

const notesEditor = document.querySelector('#notesEditor');
const notesConsent = document.querySelector('#notesConsent');
function loadNotes() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    notesEditor.value = value || '';
    document.querySelector('#notesStatus').textContent = value ? 'Saved on this device.' : 'Notes are not saved.';
  } catch { document.querySelector('#notesStatus').textContent = 'Local storage is unavailable in this browser.'; }
  updateNotesCount();
}
function updateNotesCount() { document.querySelector('#notesCount').textContent = `${notesEditor.value.length} / 5000`; }
notesEditor.addEventListener('input', updateNotesCount);
document.querySelector('#saveNotes').addEventListener('click', () => {
  if (!notesConsent.checked) { toast('Please confirm local storage consent before saving.'); notesConsent.focus(); return; }
  try { localStorage.setItem(STORAGE_KEY, notesEditor.value); document.querySelector('#notesStatus').textContent = 'Saved on this device.'; toast('Your notes are saved on this device.'); }
  catch { document.querySelector('#notesStatus').textContent = 'Could not save. Check browser storage settings.'; toast('Could not save notes in this browser.'); }
});
document.querySelector('#deleteNotes').addEventListener('click', () => {
  try { localStorage.removeItem(STORAGE_KEY); notesEditor.value = ''; updateNotesCount(); document.querySelector('#notesStatus').textContent = 'Saved notes deleted.'; toast('Saved notes deleted from this device.'); }
  catch { toast('Could not clear browser storage.'); }
});
document.querySelector('#copyNotes').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(notesEditor.value); toast('Notes copied to clipboard.'); }
  catch { notesEditor.select(); toast('Select and copy your notes.'); }
});
document.querySelector('#prepareSummary').addEventListener('click', () => {
  const userMessages = conversation.filter(item => item.role === 'user').map(item => `• ${item.content}`);
  if (!userMessages.length) { toast('Have a chat first, then you can prepare a summary.'); return; }
  const draft = `For my clinician\n\nWhat I’d like to discuss:\n${userMessages.join('\n')}\n\nQuestions I may want to ask:\n• What should I pay attention to?\n• What would you recommend as a next step?`;
  notesEditor.value = notesEditor.value ? `${notesEditor.value}\n\n${draft}` : draft;
  updateNotesCount();
  notesEditor.focus();
  toast('Draft added. Review and edit it before saving or copying.');
});

const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');
menuToggle.addEventListener('click', () => { const open = mainNav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
mainNav.querySelectorAll('a,button').forEach(item => item.addEventListener('click', () => { mainNav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }));
loadMode();
