/** ZenithFlow – SPA Router */

import { clearNode } from './utils/dom.js';

let routes = {};
let currentCleanup = null;
const appEl = () => document.getElementById('app');

export function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

export function navigate(path) {
  window.location.hash = path;
}

async function handleRoute() {
  const hash = window.location.hash.slice(1) || '/';
  const app = appEl();

  // Find matching route
  let renderFn = null;
  let params = {};

  for (const [pattern, fn] of Object.entries(routes)) {
    const paramNames = [];
    const regexStr = pattern.replace(/:(\w+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    const match = hash.match(new RegExp(`^${regexStr}$`));
    if (match) {
      renderFn = fn;
      paramNames.forEach((name, i) => { params[name] = match[i + 1]; });
      break;
    }
  }

  if (!renderFn) {
    renderFn = routes['/'] || (() => {});
  }

  // Animate exit
  if (app.children.length > 0) {
    app.style.animation = 'viewExit 0.25s ease-in forwards';
    await new Promise(r => setTimeout(r, 250));
  }

  // Cleanup previous view
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  clearNode(app);
  app.style.animation = 'viewEnter 0.4s ease-out forwards';

  // Render new view
  const cleanup = await renderFn(app, params);
  if (typeof cleanup === 'function') {
    currentCleanup = cleanup;
  }
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
