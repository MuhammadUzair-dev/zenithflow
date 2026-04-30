import { navigate } from '../router.js';
import { getState, isWeekUnlocked, getWeekProgress, recalcProgress, resetState } from '../store.js';
import { getTierName } from '../vibe/engine.js';

export function renderRoadmap(app) {
  const state = getState();
  if (!state.roadmap) { navigate('/'); return; }

  const { roadmap, progress } = state;
  const tierName = getTierName(progress);

  app.innerHTML = `
    <div class="roadmap" id="roadmap-page">
      <header class="roadmap__header animate-fade-in-up" style="opacity:0">
        <div style="display: flex; justify-content: center; align-items: center; gap: var(--space-md); margin-bottom: var(--space-md);">
          <button class="btn btn-ghost" id="roadmap-home" aria-label="Home">← Home</button>
          <span style="color: var(--text-tertiary);">|</span>
          <span class="badge badge--${progress > 60 ? 'build' : progress > 30 ? 'practice' : 'learn'}">${tierName}</span>
        </div>
        <p class="roadmap__skill-label">${roadmap.skillIcon} Your Learning Journey</p>
        <h1 class="roadmap__title">${roadmap.skillName}</h1>
        <div class="roadmap__progress-section">
          <div class="roadmap__progress-label">
            <span>Overall Progress</span>
            <span style="color: var(--accent-bright); font-weight: var(--fw-semibold);">${progress}%</span>
          </div>
          <div class="progress-bar progress-bar--lg">
            <div class="progress-bar__fill" style="width: ${progress}%;" id="main-progress"></div>
          </div>
        </div>
      </header>

      <div class="roadmap__weeks">
        ${roadmap.weeks.map((week, i) => {
          const unlocked = isWeekUnlocked(i);
          const weekPct = getWeekProgress(i);
          const done = week.tasks.filter(t => t.done).length;
          const total = week.tasks.length;
          const isCurrent = unlocked && weekPct < 100;
          return `
            <div class="glass-card glass-card--interactive week-card ${!unlocked ? 'week-card--locked' : ''} ${isCurrent ? 'week-card--current' : ''} animate-fade-in-up stagger-${i + 1}" style="opacity:0" data-week="${i}" id="week-card-${i}">
              <div class="week-card__number">Week ${i + 1}</div>
              <h3 class="week-card__title">${week.theme}</h3>
              <p class="week-card__desc">${week.desc}</p>
              <div class="progress-bar" style="margin-bottom: var(--space-md);">
                <div class="progress-bar__fill" style="width: ${weekPct}%;"></div>
              </div>
              <div class="week-card__footer">
                <span class="week-card__tasks">${done}/${total} tasks</span>
                <span class="week-card__pct">${weekPct}%</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="roadmap__nav">
        <button class="btn btn-secondary" id="roadmap-restart">↻ Start Over</button>
      </div>

      ${progress === 100 ? `
        <div style="text-align: center; padding: var(--space-2xl);">
          <div style="font-size: 4rem; margin-bottom: var(--space-lg);">🏆</div>
          <h2 style="font-size: var(--fs-2xl); margin-bottom: var(--space-md);">Mastery Achieved!</h2>
          <p style="color: var(--text-secondary); max-width: 400px; margin: 0 auto;">
            You've completed your entire ${roadmap.skillName} roadmap. You are now a ZenithFlow Master!
          </p>
        </div>
      ` : ''}
    </div>
  `;

  // Week card clicks
  document.querySelectorAll('.week-card:not(.week-card--locked)').forEach(card => {
    card.addEventListener('click', () => {
      const weekIdx = card.dataset.week;
      navigate(`/week/${weekIdx}`);
    });
  });

  document.getElementById('roadmap-home')?.addEventListener('click', () => navigate('/'));
  document.getElementById('roadmap-restart')?.addEventListener('click', () => {
    if (confirm('Start over? This will reset all progress.')) {
      resetState(); navigate('/');
    }
  });
}
