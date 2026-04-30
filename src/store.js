/** ZenithFlow – State Store with localStorage persistence */

const STORAGE_KEY = 'zenithflow_state';

const defaultState = {
  /** 'landing' | 'interview' | 'roadmap' | 'week' */
  currentView: 'landing',
  /** Interview data */
  interview: {
    step: 0,
    skillQuery: '',
    skillKey: '',
    level: '',       // beginner | intermediate | advanced
    hoursPerWeek: 8,
    learningStyle: '', // video | reading | hands-on | mix
    goal: '',
  },
  /** Generated roadmap */
  roadmap: null, // { skillKey, skillName, weeks: [{ theme, desc, tasks: [{ ...task, done }] }] }
  /** Current week being viewed (0-3) */
  activeWeek: 0,
  /** Overall progress 0–100 */
  progress: 0,
  /** Completed audits per week */
  audits: {}, // { 'w0_t2': true }
};

let state = loadState();
let listeners = [];

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultState, ...parsed };
    }
  } catch (e) {
    console.warn('ZenithFlow: Failed to load state', e);
  }
  return { ...defaultState };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('ZenithFlow: Failed to save state', e);
  }
}

export function getState() {
  return state;
}

export function setState(partial) {
  state = { ...state, ...partial };
  saveState();
  listeners.forEach(fn => fn(state));
}

export function updateInterview(partial) {
  setState({
    interview: { ...state.interview, ...partial },
  });
}

export function subscribe(fn) {
  listeners.push(fn);
  return () => { listeners = listeners.filter(l => l !== fn); };
}

export function resetState() {
  state = { ...defaultState };
  saveState();
  listeners.forEach(fn => fn(state));
}

/** Calculate overall progress percentage from roadmap */
export function recalcProgress() {
  if (!state.roadmap) return;
  const allTasks = state.roadmap.weeks.flatMap(w => w.tasks);
  const done = allTasks.filter(t => t.done).length;
  const pct = allTasks.length > 0 ? Math.round((done / allTasks.length) * 100) : 0;
  setState({ progress: pct });
  return pct;
}

/** Mark a task as done */
export function completeTask(weekIndex, taskIndex) {
  if (!state.roadmap) return;
  const weeks = JSON.parse(JSON.stringify(state.roadmap.weeks));
  weeks[weekIndex].tasks[taskIndex].done = true;
  setState({
    roadmap: { ...state.roadmap, weeks },
  });
  recalcProgress();
}

/** Check if a week is unlocked (week 0 always unlocked, others need previous 60%+ done) */
export function isWeekUnlocked(weekIndex) {
  if (!state.roadmap) return false;
  if (weekIndex === 0) return true;
  const prevWeek = state.roadmap.weeks[weekIndex - 1];
  const done = prevWeek.tasks.filter(t => t.done).length;
  return done / prevWeek.tasks.length >= 0.6;
}

/** Get completion % for a specific week */
export function getWeekProgress(weekIndex) {
  if (!state.roadmap) return 0;
  const week = state.roadmap.weeks[weekIndex];
  const done = week.tasks.filter(t => t.done).length;
  return Math.round((done / week.tasks.length) * 100);
}
