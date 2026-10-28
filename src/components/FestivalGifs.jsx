import { useEffect, useRef, useState } from 'react';

// Animated overlays that appear one at a time at random. "cross" plays across a full-width strip;
// "peek" slides Krishna in from a screen edge.
const GIFS = [
  { src: '/gifs/navratri/01.webp', duration: 7540, kind: 'cross', anchor: 'center' },
  { src: '/gifs/navratri/03.webp', duration: 7540, kind: 'cross', anchor: 'center' },
  { src: '/gifs/navratri/05.webp', duration: 5070, kind: 'cross', anchor: 'left' },
  { src: '/gifs/krishna/01.webp', duration: 7340, kind: 'peek', box: 'left-0 bottom-16 min-[990px]:bottom-0 w-40 sm:w-52 md:w-64 lg:w-80 aspect-[1349/1080]', hidden: '-translate-x-6' },
  { src: '/gifs/krishna/07.webp', duration: 7200, kind: 'peek', box: 'right-0 bottom-14 min-[990px]:-bottom-2 w-48 sm:w-60 md:w-72 lg:w-96 aspect-[801/1080]', hidden: 'translate-x-6' },
  { src: '/gifs/krishna/03.webp', duration: 8740, kind: 'peek', box: 'top-14 -right-8 sm:-right-6 md:-right-4 lg:-right-2 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-64 lg:h-64', hidden: '-translate-y-6' },
];
const SEEN_KEY = 'festival-gif-seen';
const FADE_MS = 300;
const STRIP_RATIO = 1080 / 1916;
const MIN_STRIP_WIDTH = 720;

const blobs = new Map();

// A fresh object URL per showing makes the animation restart from its first frame.
async function loadFresh(src) {
  try {
    if (!blobs.has(src)) blobs.set(src, fetch(src).then((res) => res.blob()));
    return URL.createObjectURL(await blobs.get(src));
  } catch {
    blobs.delete(src);
    return src;
  }
}

export default function FestivalGifs() {
  const [gif, setGif] = useState(null);
  const [shown, setShown] = useState(false);
  const lastIndex = useRef(-1);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer;
    let cancelled = false;
    const randomGap = () => 10000 + 10000 * Math.random();
    const schedule = (delay) => { timer = setTimeout(showNext, delay); };

    async function showNext() {
      if (document.hidden) return schedule(randomGap());
      let index = Math.floor(Math.random() * GIFS.length);
      if (index === lastIndex.current) index = (index + 1) % GIFS.length;
      lastIndex.current = index;
      const next = GIFS[index];
      const url = await loadFresh(next.src);
      if (cancelled) return;
      const height = Math.max(window.innerWidth, MIN_STRIP_WIDTH) * STRIP_RATIO;
      const top = Math.random() * Math.max(0, window.innerHeight - height);
      setGif({ ...next, url, top, height });
      requestAnimationFrame(() => setShown(true));
      timer = setTimeout(() => {
        setShown(false);
        timer = setTimeout(() => {
          setGif(null);
          if (url.startsWith('blob:')) URL.revokeObjectURL(url);
          schedule(randomGap());
        }, FADE_MS);
      }, next.duration - FADE_MS);
    }

    let firstVisit = true;
    try {
      firstVisit = !sessionStorage.getItem(SEEN_KEY);
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Storage blocked; treat as a first visit.
    }
    schedule(firstVisit ? 2000 : randomGap());
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  if (!gif) return null;

  if (gif.kind === 'peek') {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed z-40 overflow-hidden transition-[transform,opacity] ease-out ${gif.box} ${shown ? 'translate-x-0 translate-y-0 opacity-100' : `${gif.hidden} opacity-0`}`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
      >
        <img src={gif.url} alt="" draggable="false" className="absolute inset-0 size-full select-none object-contain object-bottom" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 z-40 overflow-hidden transition-opacity ease-out"
      style={{ top: gif.top, height: gif.height, opacity: shown ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
    >
      <img
        src={gif.url}
        alt=""
        draggable="false"
        className={`absolute top-0 h-full max-w-none select-none ${gif.anchor === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2'}`}
        style={{ width: `max(100%, ${MIN_STRIP_WIDTH}px)` }}
      />
    </div>
  );
}
