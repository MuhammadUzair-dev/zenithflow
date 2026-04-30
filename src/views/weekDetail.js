/** ZenithFlow – Week Detail View */
import { navigate } from '../router.js';
import { getState, getWeekProgress, isWeekUnlocked, recalcProgress } from '../store.js';
import { createAuditModal } from '../agents/auditor.js';
import { getResourcesForSkill, renderResourceHTML } from '../agents/scavenger.js';
import { waitMs } from '../utils/animations.js';

export function renderWeekDetail(app, params) {
  const weekIdx = parseInt(params.id);
  const state = getState();

  if (!state.roadmap || isNaN(weekIdx)) { navigate('/roadmap'); return; }
  if (!isWeekUnlocked(weekIdx)) { navigate('/roadmap'); return; }

  const week = state.roadmap.weeks[weekIdx];
  const weekPct = getWeekProgress(weekIdx);
  const resources = getResourcesForSkill(state.roadmap.skillKey);

  function render() {
    const freshState = getState();
    const freshWeek = freshState.roadmap.weeks[weekIdx];
    const freshPct = getWeekProgress(weekIdx);

    app.innerHTML = `
      <div class="week-detail" id="week-detail-page">
        <div class="week-detail__header">
          <button class="week-detail__back" id="back-to-roadmap">
            ← Back to Roadmap
          </button>
          <h1 class="week-detail__title">Week ${weekIdx + 1}: ${freshWeek.theme}</h1>
          <p class="week-detail__subtitle">${freshWeek.desc}</p>
          <div style="display: flex; align-items: center; gap: var(--space-lg); flex-wrap: wrap;">
            <div style="flex: 1; min-width: 200px;">
              <div style="display: flex; justify-content: space-between; font-size: var(--fs-sm); margin-bottom: var(--space-xs);">
                <span>Progress</span>
                <span style="color: var(--accent-bright); font-weight: var(--fw-semibold);">${freshPct}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-bar__fill" style="width: ${freshPct}%;"></div>
              </div>
            </div>
            <span class="badge badge--${freshPct === 100 ? 'build' : 'learn'}">
              ${freshPct === 100 ? '✓ Complete' : `${freshWeek.tasks.filter(t => t.done).length}/${freshWeek.tasks.length} tasks`}
            </span>
          </div>
        </div>

        <div class="week-detail__tasks" id="task-list">
          ${freshWeek.tasks.map((task, ti) => `
            <div class="glass-card task-card animate-fade-in-up stagger-${Math.min(ti + 1, 6)}" style="opacity:0" id="task-${weekIdx}-${ti}">
              <div class="checkbox ${task.done ? 'checkbox--checked' : ''}" data-wi="${weekIdx}" data-ti="${ti}" id="check-${weekIdx}-${ti}">
                <div class="checkbox__box"></div>
              </div>
              <div class="task-card__content">
                <div class="task-card__top">
                  <span class="task-card__title ${task.done ? 'task-card__title--done' : ''}">${task.title}</span>
                  <span class="badge badge--${task.type}">${task.type}</span>
                </div>
                <p class="task-card__desc">${task.desc}</p>
                <div class="task-card__meta">
                  <span>⏱ ~${task.time} min</span>
                </div>
                ${!task.done ? `
                  <div style="margin-top: var(--space-md);">
                    <button class="btn btn-sm btn-secondary" data-complete-wi="${weekIdx}" data-complete-ti="${ti}" id="complete-btn-${weekIdx}-${ti}">
                      ✓ Mark Complete
                    </button>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Resources Section -->
        <div style="max-width: 900px; margin: var(--space-2xl) auto 0; padding: 0 var(--space-xl);">
          <h3 style="font-size: var(--fs-lg); margin-bottom: var(--space-lg); font-weight: var(--fw-semibold);">
            🔍 Curated Resources
          </h3>
          <div style="display: flex; flex-direction: column; gap: var(--space-sm);">
            ${resources.map(r => renderResourceHTML(r)).join('')}
          </div>
        </div>

        ${freshPct === 100 ? `
          <div style="text-align: center; padding: var(--space-3xl) var(--space-xl);">
            <div style="font-size: 3rem; margin-bottom: var(--space-md);">🎉</div>
            <h3 style="font-size: var(--fs-xl); margin-bottom: var(--space-sm);">Week ${weekIdx + 1} Complete!</h3>
            <p style="color: var(--text-secondary); margin-bottom: var(--space-xl);">
              ${weekIdx < 3 ? 'The next week has been unlocked!' : 'You have completed all weeks!'}
            </p>
            <button class="btn btn-primary" id="next-action">
              ${weekIdx < 3 ? `→ Continue to Week ${weekIdx + 2}` : '🏆 View Roadmap'}
            </button>
          </div>
        ` : ''}
      </div>
    `;

    // Bind events
    document.getElementById('back-to-roadmap')?.addEventListener('click', () => navigate('/roadmap'));

    document.querySelectorAll('[data-complete-wi]').forEach(btn => {
      btn.addEventListener('click', () => {
        const wi = parseInt(btn.dataset.completeWi);
        const ti = parseInt(btn.dataset.completeTi);
        // Launch audit modal
        createAuditModal(wi, ti, (passed) => {
          if (passed) {
            recalcProgress();
            checkLevelUp(wi);
            render(); // Re-render
          }
        });
      });
    });

    document.getElementById('next-action')?.addEventListener('click', () => {
      if (weekIdx < 3) navigate(`/week/${weekIdx + 1}`);
      else navigate('/roadmap');
    });
  }

  render();
}

async function checkLevelUp(weekIdx) {
  const pct = getWeekProgress(weekIdx);
  if (pct === 100) {
    await waitMs(500);
    showLevelUp(weekIdx);
  }
}

function showLevelUp(weekIdx) {
  const overlay = document.createElement('div');
  overlay.className = 'level-up-overlay';
  overlay.id = 'level-up-overlay';
  overlay.innerHTML = `
    <div class="level-up-content">
      <div class="level-up-content__icon">🏅</div>
      <h2 class="level-up-content__title">Week ${weekIdx + 1} Mastered!</h2>
      <p class="level-up-content__subtitle">
        ${weekIdx < 3 ? `Week ${weekIdx + 2} is now unlocked!` : 'You\'ve completed all weeks!'}
      </p>
      <button class="btn btn-primary btn-lg" id="level-up-dismiss">Continue</button>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector('#level-up-dismiss').addEventListener('click', () => {
    overlay.style.animation = 'fadeIn 0.3s ease-out reverse forwards';
    setTimeout(() => overlay.remove(), 300);
  });
}
