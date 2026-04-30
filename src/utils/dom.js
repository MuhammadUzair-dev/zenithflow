/** ZenithFlow – DOM Utilities */
export function $(sel, ctx = document) { return ctx.querySelector(sel); }
export function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k.startsWith('on')) node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v);
  }
  for (const c of children) {
    if (typeof c === 'string') node.appendChild(document.createTextNode(c));
    else if (c) node.appendChild(c);
  }
  return node;
}

export function html(strings, ...vals) {
  const tpl = document.createElement('template');
  tpl.innerHTML = String.raw(strings, ...vals).trim();
  return tpl.content.cloneNode(true);
}

export function clearNode(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}
