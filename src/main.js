/** ZenithFlow – Main Entry Point */
import './styles/main.css';
import { registerRoute, initRouter } from './router.js';
import { renderLanding } from './views/landing.js';
import { renderInterview } from './views/interview.js';
import { renderRoadmap } from './views/roadmap.js';
import { renderWeekDetail } from './views/weekDetail.js';
import { initVibeEngine } from './vibe/engine.js';
import { initParticles } from './vibe/particles.js';

// Initialize vibe engine (dynamic color theming)
initVibeEngine();

// Initialize particle system
initParticles();

// Register routes
registerRoute('/', renderLanding);
registerRoute('/interview', renderInterview);
registerRoute('/roadmap', renderRoadmap);
registerRoute('/week/:id', renderWeekDetail);

// Start router
initRouter();

// Log for dev
console.log('%c✦ ZenithFlow%c – AI Skill Architect', 'color: #4a7cf7; font-weight: bold; font-size: 14px;', 'color: #888; font-size: 14px;');
