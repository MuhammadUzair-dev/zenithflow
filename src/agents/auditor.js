/** ZenithFlow – Progress Auditor Agent */
import { getSkill } from '../data/skills.js';
import { getState, completeTask } from '../store.js';

/**
 * Get a challenge for a given skill.
 * Picks a random challenge from the skill's challenge bank.
 */
export function getChallenge(skillKey) {
  const skill = getSkill(skillKey);
  if (!skill || !skill.challenges.length) return getReflectionChallenge();
  const idx = Math.floor(Math.random() * skill.challenges.length);
  return {
    type: 'quiz',
    ...skill.challenges[idx],
  };
}

/** Fallback reflection challenge */
function getReflectionChallenge() {
  const prompts = [
    "What was the most surprising thing you learned in this task?",
    "How would you explain what you just learned to a friend?",
    "What part was the most challenging, and how did you overcome it?",
    "Can you think of a real-world application for what you just learned?",
  ];
  return {
    type: 'reflection',
    q: prompts[Math.floor(Math.random() * prompts.length)],
  };
}

/**
 * Verify a quiz answer.
 * Returns { passed, feedback }
 */
export function verifyAnswer(challenge, selectedIndex) {
  if (challenge.type === 'reflection') {
    return {
      passed: true,
      feedback: "Great reflection! Self-awareness is a powerful learning tool. 🧠",
    };
  }

  const correct = selectedIndex === challenge.answer;
  return {
    passed: correct,
    feedback: correct
      ? getPositiveFeedback()
      : `Not quite! The correct answer is: "${challenge.options[challenge.answer]}". Review the material and try again!`,
  };
}

function getPositiveFeedback() {
  const msgs = [
    "Excellent! You've nailed it! 🎯",
    "Perfect answer! You're making great progress! 🌟",
    "Spot on! Your understanding is solid! 💪",
    "Correct! You're well on your way to mastery! 🚀",
    "Brilliant! That knowledge is locked in! 🔐",
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

/**
 * Run the audit flow for a task.
 * Returns a promise that resolves with the modal element.
 */
export function createAuditModal(weekIndex, taskIndex, onComplete) {
  const state = getState();
  const challenge = getChallenge(state.roadmap.skillKey);

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.id = 'audit-modal-backdrop';

  const isQuiz = challenge.type === 'quiz';

  backdrop.innerHTML = `
    <div class="modal" id="audit-modal">
      <div class="modal__header">
        <h3 class="modal__title">🎯 Progress Check</h3>
        <button class="modal__close" id="audit-close">✕</button>
      </div>
      <div id="audit-content">
        <p style="color: var(--text-secondary); margin-bottom: var(--space-lg); line-height: 1.7;">
          ${challenge.q}
        </p>
        ${isQuiz ? `
          <div style="display: flex; flex-direction: column; gap: var(--space-sm);" id="audit-options">
            ${challenge.options.map((opt, i) => `
              <button class="selection-card" style="text-align: left; padding: var(--space-md) var(--space-lg);" data-idx="${i}" id="audit-option-${i}">
                <span class="selection-card__title">${opt}</span>
              </button>
            `).join('')}
          </div>
        ` : `
          <textarea class="input" id="audit-reflection" rows="4" placeholder="Type your reflection here..." style="resize: vertical;"></textarea>
          <div style="margin-top: var(--space-lg); text-align: right;">
            <button class="btn btn-primary" id="audit-submit-reflection">Submit Reflection</button>
          </div>
        `}
      </div>
      <div id="audit-result" style="display: none; text-align: center; padding: var(--space-xl) 0;">
      </div>
    </div>
  `;

  const close = () => {
    backdrop.style.animation = 'fadeIn 0.2s ease-out reverse forwards';
    setTimeout(() => backdrop.remove(), 200);
  };

  backdrop.querySelector('#audit-close').addEventListener('click', close);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });

  if (isQuiz) {
    backdrop.querySelectorAll('[data-idx]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        const result = verifyAnswer(challenge, idx);
        showResult(backdrop, result, weekIndex, taskIndex, onComplete, close);
      });
    });
  } else {
    const submitBtn = backdrop.querySelector('#audit-submit-reflection');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const result = verifyAnswer(challenge, null);
        showResult(backdrop, result, weekIndex, taskIndex, onComplete, close);
      });
    }
  }

  document.body.appendChild(backdrop);
  return backdrop;
}

function showResult(backdrop, result, weekIndex, taskIndex, onComplete, closeFn) {
  const content = backdrop.querySelector('#audit-content');
  const resultEl = backdrop.querySelector('#audit-result');

  content.style.display = 'none';
  resultEl.style.display = 'block';

  if (result.passed) {
    resultEl.innerHTML = `
      <div style="font-size: 3rem; margin-bottom: var(--space-md);">🎉</div>
      <h3 style="font-size: var(--fs-xl); margin-bottom: var(--space-md);">${result.feedback}</h3>
      <p style="color: var(--text-secondary); margin-bottom: var(--space-xl);">Task completed and verified!</p>
      <button class="btn btn-primary" id="audit-continue">Continue</button>
    `;
    completeTask(weekIndex, taskIndex);
    resultEl.querySelector('#audit-continue').addEventListener('click', () => {
      closeFn();
      if (onComplete) onComplete(true);
    });
  } else {
    resultEl.innerHTML = `
      <div style="font-size: 3rem; margin-bottom: var(--space-md);">📚</div>
      <h3 style="font-size: var(--fs-xl); margin-bottom: var(--space-md);">Not Quite!</h3>
      <p style="color: var(--text-secondary); margin-bottom: var(--space-xl);">${result.feedback}</p>
      <button class="btn btn-secondary" id="audit-retry">Try Again Later</button>
    `;
    resultEl.querySelector('#audit-retry').addEventListener('click', () => {
      closeFn();
      if (onComplete) onComplete(false);
    });
  }
}
