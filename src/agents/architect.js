/** ZenithFlow – Architect Agent */
import { getSkill, getSkillList, searchSkills } from '../data/skills.js';
import { setState, updateInterview, getState } from '../store.js';

/**
 * Build a roadmap from the interview answers.
 * Adjusts task times based on level and available hours.
 */
export function generateRoadmap(interview) {
  const skill = getSkill(interview.skillKey);
  if (!skill) return null;

  const levelMultiplier = {
    beginner: 1,
    intermediate: 0.8,
    advanced: 0.6,
  }[interview.level] || 1;

  const weeks = skill.weeks.map(week => ({
    theme: week.theme,
    desc: week.desc,
    tasks: week.tasks.map(task => ({
      ...task,
      time: Math.round(task.time * levelMultiplier),
      done: false,
    })),
  }));

  const roadmap = {
    skillKey: interview.skillKey,
    skillName: skill.name,
    skillIcon: skill.icon,
    weeks,
  };

  setState({
    roadmap,
    progress: 0,
    currentView: 'roadmap',
  });

  return roadmap;
}

/** Get suggested skills for display */
export function getSuggestions() {
  return getSkillList();
}

/** Match a free-text query to a skill key */
export function matchSkill(query) {
  const results = searchSkills(query);
  return results.length > 0 ? results[0] : null;
}

/** Interview questions config */
export const INTERVIEW_STEPS = [
  {
    id: 'skill',
    agentMessage: "Welcome! I'm your Skill Architect. 🏗️\n\nWhat skill would you like to master over the next 4 weeks?",
    type: 'skill-select',
  },
  {
    id: 'level',
    agentMessage: "Great choice! Now, where would you say you currently stand with this skill?",
    type: 'level-select',
    options: [
      { value: 'beginner', icon: '🌱', label: 'Beginner', desc: 'Starting from scratch' },
      { value: 'intermediate', icon: '🌿', label: 'Intermediate', desc: 'Know the basics' },
      { value: 'advanced', icon: '🌳', label: 'Advanced', desc: 'Looking to master' },
    ],
  },
  {
    id: 'hours',
    agentMessage: "How many hours per week can you dedicate to learning? Don't worry — I'll adjust the plan to fit your schedule.",
    type: 'slider',
    min: 2,
    max: 20,
    defaultVal: 8,
    unit: 'hours/week',
  },
  {
    id: 'style',
    agentMessage: "Everyone learns differently. What's your preferred learning style?",
    type: 'style-select',
    options: [
      { value: 'video', icon: '🎬', label: 'Video', desc: 'Watch & follow along' },
      { value: 'reading', icon: '📖', label: 'Reading', desc: 'Articles & docs' },
      { value: 'hands-on', icon: '🛠️', label: 'Hands-on', desc: 'Build stuff immediately' },
      { value: 'mix', icon: '🎯', label: 'Mix', desc: 'A bit of everything' },
    ],
  },
  {
    id: 'goal',
    agentMessage: "Last question — do you have a specific goal in mind? (e.g., \"Build a portfolio site\" or \"Cook a dinner party\")\n\nFeel free to type anything or skip this step.",
    type: 'text',
    placeholder: 'e.g., Build a 3D portfolio site...',
    optional: true,
  },
];
