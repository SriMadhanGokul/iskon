// One-shot canvas effect played once the diya has slid in: golden sparks sweep in from the
// bottom-left, circle a tilted ellipse in the middle of the screen, then stream into the diya flame.
// Timings are seconds since the diya's slide-in animation started.

const SWEEP_START = 5.2;
const SPAWN_SPREAD = 3.0909090909090904;
const ENTER = 1.6363636363636362;
const ORBIT = 3.6363636363636362;
const DIVE = 1.8181818181818181;
const LIFE = ENTER + ORBIT + DIVE;
const END = SWEEP_START + SPAWN_SPREAD + 7.464114832535885 + 1.2;
const TILT = (-12 * Math.PI) / 180;
const SLIDE_DELAY_MS = 600;

// Phones and low-core devices draw half the sparks with shorter trails and smaller sprites.
const isLightDevice = () =>
  window.innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4 || Boolean(navigator.connection?.saveData);

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const progress = (from, to, x) => clamp01((x - from) / (to - from));
const bezier = (a, b, c, t) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;

function glowSprite(stops, size = 64) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

function starSprite(size = 64) {
  const canvas = glowSprite([[0, 'rgba(255,250,225,1)'], [0.18, 'rgba(255,214,90,0.9)'], [0.45, 'rgba(255,170,0,0.25)'], [1, 'rgba(255,150,0,0)']], size);
  const ctx = canvas.getContext('2d');
  const c = size / 2;
  ctx.globalCompositeOperation = 'lighter';
  [[0.5 * size, 0.035 * size], [0.035 * size, 0.5 * size]].forEach(([rx, ry]) => {
    const ray = ctx.createRadialGradient(c, c, 0, c, c, Math.max(rx, ry));
    ray.addColorStop(0, 'rgba(255,245,200,1)');
    ray.addColorStop(1, 'rgba(255,200,60,0)');
    ctx.fillStyle = ray;
    ctx.beginPath();
    ctx.ellipse(c, c, rx, ry, 0, 0, 2 * Math.PI);
    ctx.fill();
  });
  return canvas;
}

// Seeded so every visitor sees the same pattern.
function seededRandom(seed) {
  let t = seed;
  return () => {
    t |= 0;
    t = (t + 1831565813) | 0;
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e;
    return ((e ^ (e >>> 14)) >>> 0) / 4294967296;
  };
}

export function playDiyaSparkles(canvas, diyaEl, flameEl) {
  const ctx = canvas.getContext('2d');
  canvas.style.display = 'none';
  let width = 0;
  let viewHeight = 0;
  let canvasHeight = 0;
  let sparks = [];
  let dust = [];
  let frame = 0;
  let wait = 0;
  let visible = false;
  const light = isLightDevice();
  const amount = light ? 0.5 : 1;
  const trailLength = light ? 2 : 3;
  const spriteSize = light ? 32 : 64;

  const gold = glowSprite([[0, 'rgba(255,248,215,1)'], [0.2, 'rgba(255,213,74,0.95)'], [0.5, 'rgba(255,170,0,0.35)'], [1, 'rgba(255,150,0,0)']], spriteSize);
  const ember = glowSprite([[0, 'rgba(255,226,140,1)'], [0.22, 'rgba(240,160,0,0.95)'], [0.5, 'rgba(210,110,0,0.35)'], [1, 'rgba(200,90,0,0)']], spriteSize);
  const star = starSprite(spriteSize);

  const resize = () => {
    viewHeight = window.innerHeight;
    if (window.innerWidth === width && viewHeight <= canvasHeight) return;
    width = window.innerWidth;
    canvasHeight = Math.max(viewHeight, window.screen?.height || 0);
    canvas.width = width;
    canvas.height = canvasHeight;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${canvasHeight}px`;
    const density = clamp01((width * viewHeight) / 2073600);
    const rand = seededRandom(108);
    sparks = Array.from({ length: Math.round((280 + 470 * density) * amount) }, () => ({
      start: SWEEP_START + SPAWN_SPREAD * rand(),
      speed: 0.95 + 0.1 * rand(),
      jx: (rand() - 0.5) * 0.06,
      jy: (rand() - 0.5) * 0.06,
      size: 0.7 + 1.9 * rand(),
      alpha: 0.55 + 0.45 * rand(),
      star: rand() < 0.08,
      deep: rand() < 0.45,
      twSpeed: 4 + 9 * rand(),
      twPhase: rand() * Math.PI * 2,
    }));
    dust = Array.from({ length: Math.round((90 + 170 * density) * amount) }, () => ({
      x: rand(),
      y: rand(),
      size: 0.6 + 1.6 * rand(),
      twSpeed: 2 + 5 * rand(),
      twPhase: rand() * Math.PI * 2,
      drift: 6 + 18 * rand(),
      star: rand() < 0.12,
    }));
  };

  const draw = () => {
    frame = requestAnimationFrame(draw);
    const slideIn = diyaEl.getAnimations?.()[0];
    const now = document.timeline?.currentTime;
    if (slideIn?.startTime == null || now == null) return;
    const time = (now - slideIn.startTime - SLIDE_DELAY_MS) / 1000;
    if (time > END) {
      ctx.clearRect(0, 0, width, canvasHeight);
      canvas.style.display = 'none';
      cancelAnimationFrame(frame);
      return;
    }
    if (time < SWEEP_START) {
      // Nothing to draw yet: sleep until just before the sweep instead of spinning every frame.
      cancelAnimationFrame(frame);
      wait = setTimeout(() => { frame = requestAnimationFrame(draw); }, Math.max(0, (SWEEP_START - time) * 1000 - 50));
      return;
    }
    if (!visible) canvas.style.display = '';
    visible = true;
    ctx.clearRect(0, 0, width, canvasHeight);
    viewHeight = window.innerHeight;

    const flame = flameEl.getBoundingClientRect();
    const unit = Math.min(width, viewHeight);
    const scale = unit / 400;
    const cx = 0.5 * width;
    const cy = 0.48 * viewHeight;
    const rx = 0.3 * unit;
    const ry = 0.18 * unit;
    const cos = Math.cos(TILT);
    const sin = Math.sin(TILT);
    const onEllipse = (x, y) => [cx + x * cos - y * sin, cy + x * sin + y * cos];
    const [orbitX, orbitY] = onEllipse(0, ry);
    const [enterCtrlX, enterCtrlY] = onEllipse(-1.25 * rx, 1.2 * ry);
    const [diveCtrlX, diveCtrlY] = onEllipse(1.1 * rx, 1.25 * ry);
    const enterY = cy + 0.4 * ry;

    const pathAt = (age) => {
      if (age < ENTER) {
        const t = age / ENTER;
        return [bezier(-40, enterCtrlX, orbitX, t), bezier(enterY, enterCtrlY, orbitY, t), 1];
      }
      if (age < ENTER + ORBIT) {
        const angle = Math.PI / 2 - ((age - ENTER) / ORBIT) * Math.PI * 2;
        const [x, y] = onEllipse(rx * Math.cos(angle), ry * Math.sin(angle));
        return [x, y, 1];
      }
      const t = Math.pow(clamp01((age - ENTER - ORBIT) / DIVE), 1.35);
      return [bezier(orbitX, diveCtrlX, flame.left, t), bezier(orbitY, diveCtrlY, flame.top, t), 1 - 0.7 * t];
    };

    ctx.globalCompositeOperation = 'lighter';

    const dustFade = progress(6, 7.7, time) * (1 - progress(END - 3, END, time));
    if (dustFade > 0) {
      for (const mote of dust) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * mote.twSpeed + mote.twPhase);
        const alpha = dustFade * twinkle * twinkle * 0.85;
        if (alpha < 0.02) continue;
        const size = mote.size * scale * (mote.star ? 9 : 5);
        const x = mote.x * width;
        const y = (((mote.y * viewHeight - time * mote.drift) % viewHeight) + viewHeight) % viewHeight;
        ctx.globalAlpha = alpha;
        ctx.drawImage(mote.star ? star : gold, x - size / 2, y - size / 2, size, size);
      }
    }

    const sparkAt = (spark, t) => {
      const age = (t - spark.start) * spark.speed;
      if (age < 0 || age > LIFE) return null;
      const [x, y, size] = pathAt(age);
      const jitter = age > ENTER + ORBIT ? 1 - (age - ENTER - ORBIT) / DIVE : 1;
      const fadeIn = Math.min(1, 4 * age);
      const fadeOut = 1 - Math.pow(clamp01((age - LIFE + 0.35) / 0.35), 2);
      return [x + spark.jx * unit * jitter, y + spark.jy * unit * jitter, fadeIn * fadeOut, size];
    };

    let arriving = 0;
    for (const spark of sparks) {
      const twinkle = 0.6 + 0.4 * Math.sin(time * spark.twSpeed + spark.twPhase);
      const sprite = spark.star ? star : spark.deep ? ember : gold;
      for (let trail = 0; trail < trailLength; trail++) {
        const pos = sparkAt(spark, time - 0.035 * trail);
        if (!pos) break;
        const [x, y, alpha, sizeScale] = pos;
        const size = spark.size * scale * (spark.star ? 14 : 6) * sizeScale * (1 - 0.25 * trail);
        ctx.globalAlpha = spark.alpha * twinkle * alpha * (trail === 0 ? 1 : 0.35 / trail);
        ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
      }
      const age = (time - spark.start) * spark.speed;
      if (age > LIFE - 0.3 && age < LIFE + 0.2) arriving++;
    }

    const flare = Math.min(1, (arriving / sparks.length) * 14);
    if (flare > 0.01) {
      const size = 0.12 * unit * (0.6 + flare);
      ctx.globalAlpha = 0.8 * flare;
      ctx.drawImage(gold, flame.left - size / 2, flame.top - size / 2, size, size);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  };

  resize();
  window.addEventListener('resize', resize);
  frame = requestAnimationFrame(draw);
  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(wait);
    window.removeEventListener('resize', resize);
  };
}
