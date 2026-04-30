/** ZenithFlow – Resource Scavenger Agent */
import { getSkill } from '../data/skills.js';

const TYPE_ICONS = {
  video: '▶️',
  article: '📄',
  docs: '📚',
  repo: '💻',
};

const TYPE_CSS = {
  video: 'video',
  article: 'article',
  docs: 'docs',
  repo: 'repo',
};

/**
 * Get curated resources for a skill.
 * Returns resources matched to the overall skill.
 */
export function getResourcesForSkill(skillKey) {
  const skill = getSkill(skillKey);
  if (!skill) return [];
  return skill.resources.map(r => ({
    ...r,
    icon: TYPE_ICONS[r.type] || '🔗',
    cssType: TYPE_CSS[r.type] || 'article',
  }));
}

/**
 * Get resources relevant to a specific task based on keyword matching.
 * Falls back to general skill resources.
 */
export function getResourcesForTask(skillKey, taskTitle) {
  const allResources = getResourcesForSkill(skillKey);
  // Simple keyword relevance: return all resources (in a real app, we'd do NLP matching)
  return allResources;
}

/** Render a resource card HTML string */
export function renderResourceHTML(resource) {
  return `
    <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="resource-card" id="resource-${resource.title.replace(/\s+/g, '-').toLowerCase()}">
      <div class="resource-card__icon resource-card__icon--${resource.cssType}">
        ${resource.icon}
      </div>
      <div class="resource-card__info">
        <div class="resource-card__title">${resource.title}</div>
        <div class="resource-card__meta">${resource.type.toUpperCase()} · ${resource.duration}</div>
      </div>
    </a>
  `;
}
