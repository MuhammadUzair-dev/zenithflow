/** ZenithFlow – Landing View */
import { navigate } from '../router.js';
import { getState, resetState } from '../store.js';
import { getSkillList } from '../data/skills.js';
import { animateCounter, staggerChildren } from '../utils/animations.js';

export function renderLanding(app) {
  const skills = getSkillList();
  const state = getState();
  const hasRoadmap = !!state.roadmap;

  app.innerHTML = `
    <div class="landing" id="landing-page">
      <div class="landing__hero">
        <div class="landing__badge animate-fade-in">
          <span class="landing__badge-dot"></span>
          AI-Powered Learning
        </div>

        <h1 class="landing__title animate-fade-in-up stagger-1" style="opacity:0">
          Master Any Skill with<br>
          <span class="landing__title-gradient">ZenithFlow</span>
        </h1>

        <p class="landing__subtitle animate-fade-in-up stagger-2" style="opacity:0">
          Your personal AI Skill Architect builds a dynamic 4-week roadmap,
          curates the best resources, and verifies your progress — so you learn
          with clarity, not chaos.
        </p>

        <div class="landing__cta-group animate-fade-in-up stagger-3" style="opacity:0">
          <button class="btn btn-primary btn-lg animate-pulse-glow" id="cta-begin">
            ✦ Begin Your Journey
          </button>
          ${hasRoadmap ? `
            <button class="btn btn-secondary btn-lg" id="cta-resume">
              ↗ Resume Progress
            </button>
          ` : ''}
        </div>
      </div>

      <div class="landing__features">
        ${[
          { icon: '🏗️', title: 'Architect Agent', desc: 'An AI interview builds a personalized 4-week roadmap tailored to your level, schedule, and goals.' },
          { icon: '🔍', title: 'Resource Scavenger', desc: 'Curated YouTube videos, articles, docs, and repos — the exact resource for each step of your journey.' },
          { icon: '🎯', title: 'Progress Auditor', desc: 'Challenge questions and reflections verify real learning before unlocking the next level.' },
        ].map((f, i) => `
          <div class="glass-card glass-card--interactive feature-card animate-fade-in-up stagger-${i + 4}" style="opacity:0" id="feature-${f.title.toLowerCase().replace(/\s/g, '-')}">
            <span class="feature-card__icon">${f.icon}</span>
            <h3 class="feature-card__title">${f.title}</h3>
            <p class="feature-card__desc">${f.desc}</p>
          </div>
        `).join('')}
      </div>

      <div class="landing__stats animate-fade-in-up" style="opacity:0">
        <div class="stat">
          <div class="stat__number" id="stat-skills">0</div>
          <div class="stat__label">Skills Available</div>
        </div>
        <div class="stat">
          <div class="stat__number" id="stat-weeks">4</div>
          <div class="stat__label">Week Roadmaps</div>
        </div>
        <div class="stat">
          <div class="stat__number" id="stat-audit">✓</div>
          <div class="stat__label">Smart Auditing</div>
        </div>
      </div>

      <div style="text-align: center; padding: 0 var(--space-xl) var(--space-2xl);">
        <p style="color: var(--text-tertiary); font-size: var(--fs-sm);">
          Available skills:
          ${skills.map(s => `<span style="margin: 0 0.25rem;">${s.icon} ${s.name}</span>`).join(' · ')}
        </p>
      </div>
    </div>
  `;

  // Animate stat counters
  setTimeout(() => {
    const skillsEl = document.getElementById('stat-skills');
    if (skillsEl) animateCounter(skillsEl, skills.length, 1200);
  }, 800);

  // Event listeners
  document.getElementById('cta-begin')?.addEventListener('click', () => {
    resetState();
    navigate('/interview');
  });

  document.getElementById('cta-resume')?.addEventListener('click', () => {
    navigate('/roadmap');
  });
}
