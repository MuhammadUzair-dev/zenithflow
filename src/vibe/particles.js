/** ZenithFlow – Particle System */
import { getCurrentVibe } from './engine.js';

let canvas, ctx;
let particles = [];
let animId = null;
let mouse = { x: -1000, y: -1000 };

class Particle {
  constructor(w, h, color) {
    this.reset(w, h, color);
  }
  reset(w, h, color) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.color = color;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.005;
    this.w = w;
    this.h = h;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += this.pulseSpeed;

    // Mouse repulsion
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      const force = (120 - dist) / 120;
      this.x += (dx / dist) * force * 1.5;
      this.y += (dy / dist) * force * 1.5;
    }

    // Wrap around
    if (this.x < -10) this.x = this.w + 10;
    if (this.x > this.w + 10) this.x = -10;
    if (this.y < -10) this.y = this.h + 10;
    if (this.y > this.h + 10) this.y = -10;
  }
  draw(ctx) {
    const a = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
    const [r, g, b] = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.fill();

    // Glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a * 0.15})`;
    ctx.fill();
  }
}

function createParticles(count, color) {
  const w = canvas.width;
  const h = canvas.height;
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(w, h, color));
  }
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const alpha = (1 - dist / 150) * 0.08;
        const [r, g, b] = particles[i].color;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

let lastVibe = null;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Check if vibe changed
  const vibe = getCurrentVibe();
  if (!lastVibe ||
      vibe.particleColor.join() !== lastVibe.particleColor.join() ||
      vibe.particleCount !== lastVibe.particleCount) {
    // Update colors smoothly
    particles.forEach(p => p.color = vibe.particleColor);
    // Adjust count
    const diff = vibe.particleCount - particles.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        particles.push(new Particle(canvas.width, canvas.height, vibe.particleColor));
      }
    } else if (diff < 0) {
      particles.splice(0, -diff);
    }
    lastVibe = { ...vibe };
  }

  particles.forEach(p => { p.update(); p.draw(ctx); });
  drawConnections();
  animId = requestAnimationFrame(animate);
}

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function initParticles() {
  canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  handleResize();

  const vibe = getCurrentVibe();
  createParticles(vibe.particleCount, vibe.particleColor);
  lastVibe = { ...vibe };

  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  animate();
}

export function destroyParticles() {
  if (animId) cancelAnimationFrame(animId);
  particles = [];
}
