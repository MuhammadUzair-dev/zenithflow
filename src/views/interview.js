/** ZenithFlow – Interview View */
import { navigate } from '../router.js';
import { getState, updateInterview } from '../store.js';
import { INTERVIEW_STEPS, generateRoadmap, getSuggestions, matchSkill } from '../agents/architect.js';
import { typeWriter, waitMs } from '../utils/animations.js';

let chatContainer;

function addMessage(role, content, skipAnim = false) {
  const msg = document.createElement('div');
  msg.className = `chat-msg chat-msg--${role}`;
  msg.innerHTML = `
    <div class="chat-msg__label">${role === 'agent' ? '🏗️ Architect' : '👤 You'}</div>
    <div class="chat-msg__bubble">${skipAnim ? content : ''}</div>
  `;
  chatContainer.appendChild(msg);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  if (!skipAnim && role === 'agent') {
    const bubble = msg.querySelector('.chat-msg__bubble');
    return typeWriter(bubble, content, 18);
  }
  return Promise.resolve();
}

function showTyping() {
  const el = document.createElement('div');
  el.className = 'chat-msg chat-msg--agent';
  el.id = 'typing-el';
  el.innerHTML = `
    <div class="chat-msg__label">🏗️ Architect</div>
    <div class="typing-indicator">
      <div class="typing-indicator__dot"></div>
      <div class="typing-indicator__dot"></div>
      <div class="typing-indicator__dot"></div>
    </div>
  `;
  chatContainer.appendChild(el);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function hideTyping() {
  document.getElementById('typing-el')?.remove();
}

function updateDots(step) {
  document.querySelectorAll('.interview__progress-dot').forEach((dot, i) => {
    dot.className = 'interview__progress-dot';
    if (i < step) dot.classList.add('interview__progress-dot--done');
    else if (i === step) dot.classList.add('interview__progress-dot--active');
  });
}

function renderInput(step, inputArea) {
  const config = INTERVIEW_STEPS[step];
  inputArea.innerHTML = '';

  if (config.type === 'skill-select') {
    const skills = getSuggestions();
    inputArea.innerHTML = `
      <div class="interview__suggestions">
        ${skills.map(s => `
          <div class="selection-card" data-key="${s.key}" id="skill-${s.key}">
            <div class="selection-card__icon">${s.icon}</div>
            <div class="selection-card__title">${s.name}</div>
          </div>
        `).join('')}
      </div>
      <div style="display: flex; gap: var(--space-sm);">
        <input type="text" class="input" id="skill-input" placeholder="Or type any skill..." />
        <button class="btn btn-primary" id="skill-submit" style="flex-shrink: 0;">→</button>
      </div>
    `;

    inputArea.querySelectorAll('.selection-card').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.dataset.key;
        const skill = skills.find(s => s.key === key);
        selectSkill(key, skill.name, skill.icon, inputArea);
      });
    });

    document.getElementById('skill-submit')?.addEventListener('click', () => {
      const val = document.getElementById('skill-input').value.trim();
      if (!val) return;
      const match = matchSkill(val);
      if (match) {
        selectSkill(match.key, match.name, match.icon, inputArea);
      } else {
        // Default to first skill if no match
        const first = skills[0];
        selectSkill(first.key, first.name, first.icon, inputArea);
      }
    });

    document.getElementById('skill-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('skill-submit')?.click();
    });
  }

  else if (config.type === 'level-select' || config.type === 'style-select') {
    inputArea.innerHTML = `
      <div class="interview__suggestions">
        ${config.options.map(o => `
          <div class="selection-card" data-value="${o.value}" id="opt-${o.value}">
            <div class="selection-card__icon">${o.icon}</div>
            <div class="selection-card__title">${o.label}</div>
            <div class="selection-card__desc">${o.desc}</div>
          </div>
        `).join('')}
      </div>
    `;

    inputArea.querySelectorAll('.selection-card').forEach(card => {
      card.addEventListener('click', () => {
        const val = card.dataset.value;
        const opt = config.options.find(o => o.value === val);
        answerStep(config.id, val, `${opt.icon} ${opt.label}`, inputArea);
      });
    });
  }

  else if (config.type === 'slider') {
    const def = config.defaultVal;
    inputArea.innerHTML = `
      <div class="glass-card" style="padding: var(--space-lg);">
        <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-md);">
          <span style="color: var(--text-secondary);">${config.min}h</span>
          <span style="font-family: var(--font-heading); font-size: var(--fs-xl); font-weight: var(--fw-bold); color: var(--accent-bright);" id="hours-display">${def}</span>
          <span style="color: var(--text-secondary);">${config.max}h</span>
        </div>
        <input type="range" class="range-slider" id="hours-slider" min="${config.min}" max="${config.max}" value="${def}" />
        <div style="text-align: center; margin-top: var(--space-md);">
          <button class="btn btn-primary" id="hours-submit">Confirm Hours</button>
        </div>
      </div>
    `;

    document.getElementById('hours-slider')?.addEventListener('input', (e) => {
      document.getElementById('hours-display').textContent = e.target.value;
    });

    document.getElementById('hours-submit')?.addEventListener('click', () => {
      const val = document.getElementById('hours-slider').value;
      answerStep('hours', parseInt(val), `${val} hours/week`, inputArea);
    });
  }

  else if (config.type === 'text') {
    inputArea.innerHTML = `
      <div style="display: flex; gap: var(--space-sm);">
        <input type="text" class="input" id="text-input" placeholder="${config.placeholder || 'Type here...'}" />
        <button class="btn btn-primary" id="text-submit" style="flex-shrink: 0;">→</button>
      </div>
      ${config.optional ? '<p style="color: var(--text-tertiary); font-size: var(--fs-xs); margin-top: var(--space-sm); text-align: center;">Press → or Enter to skip</p>' : ''}
    `;

    const submit = () => {
      const val = document.getElementById('text-input').value.trim();
      answerStep('goal', val || 'No specific goal', val || 'Skip — surprise me! ✨', inputArea);
    };

    document.getElementById('text-submit')?.addEventListener('click', submit);
    document.getElementById('text-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit();
    });
  }
}

async function selectSkill(key, name, icon, inputArea) {
  updateInterview({ skillKey: key, skillQuery: name });
  addMessage('user', `${icon} ${name}`, true);
  inputArea.innerHTML = '';
  const state = getState();
  await advanceStep(state.interview.step + 1, inputArea);
}

async function answerStep(field, value, displayText, inputArea) {
  updateInterview({ [field]: value });
  addMessage('user', displayText, true);
  inputArea.innerHTML = '';
  const state = getState();
  await advanceStep(state.interview.step + 1, inputArea);
}

async function advanceStep(nextStep, inputArea) {
  updateInterview({ step: nextStep });
  updateDots(nextStep);

  if (nextStep >= INTERVIEW_STEPS.length) {
    // Generate roadmap
    showTyping();
    await waitMs(1500);
    hideTyping();
    await addMessage('agent', "Perfect! I've crafted your personalized 4-week roadmap. Let's begin your journey! 🚀");
    await waitMs(800);
    const state = getState();
    generateRoadmap(state.interview);
    navigate('/roadmap');
    return;
  }

  showTyping();
  await waitMs(800);
  hideTyping();
  await addMessage('agent', INTERVIEW_STEPS[nextStep].agentMessage);
  renderInput(nextStep, inputArea);
}

export async function renderInterview(app) {
  const state = getState();
  const totalSteps = INTERVIEW_STEPS.length;

  app.innerHTML = `
    <div class="interview" id="interview-page">
      <header class="interview__header">
        <div class="interview__logo">
          <span class="landing__title-gradient">ZenithFlow</span>
        </div>
        <div class="interview__progress" id="interview-dots">
          ${Array.from({ length: totalSteps }, (_, i) =>
            `<div class="interview__progress-dot${i === 0 ? ' interview__progress-dot--active' : ''}" id="progress-dot-${i}"></div>`
          ).join('')}
        </div>
        <button class="btn btn-ghost" id="interview-back" aria-label="Back to home">✕</button>
      </header>

      <div class="interview__chat" id="chat-container"></div>

      <div class="interview__input-area" id="interview-input"></div>
    </div>
  `;

  chatContainer = document.getElementById('chat-container');
  const inputArea = document.getElementById('interview-input');

  document.getElementById('interview-back')?.addEventListener('click', () => navigate('/'));

  // Start interview
  showTyping();
  await waitMs(1000);
  hideTyping();
  await addMessage('agent', INTERVIEW_STEPS[0].agentMessage);
  renderInput(0, inputArea);
}
