/** ZenithFlow – Animation Utilities */

export function typeWriter(element, text, speed = 30) {
  return new Promise(resolve => {
    let i = 0;
    element.textContent = '';
    const tick = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(tick, speed);
      } else {
        resolve();
      }
    };
    tick();
  });
}

export function animateCounter(element, target, duration = 1500) {
  const start = performance.now();
  const from = 0;
  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(from + (target - from) * ease);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function staggerChildren(parent, selector, delay = 100) {
  const children = parent.querySelectorAll(selector);
  children.forEach((child, i) => {
    child.style.opacity = '0';
    child.style.animation = `fadeInUp 0.5s ease-out ${i * delay}ms forwards`;
  });
}

export function waitMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
