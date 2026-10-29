import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BANNER_SLIDES } from '../data/banners.js';
import { photo } from '../lib/photo.js';

const GAP_PX = 20;
const SWIPE_PX = 50;
// With few slides the loop is doubled, so the slide that wraps round always jumps while off screen.
const LOOP = BANNER_SLIDES.length < 6 ? [...BANNER_SLIDES, ...BANNER_SLIDES] : BANNER_SLIDES;

// Position of slide i relative to the active one, in the range [-L/2, L/2).
const offsetOf = (i, active) => {
  const L = LOOP.length;
  const half = Math.floor(L / 2);
  return ((i - active + L + half) % L) - half;
};

// The whole active banner is the link; side banners are not links, a click there moves the carousel.
function BannerLink({ slide, children }) {
  const className = 'group block h-full w-full focus-visible:outline-none';
  if (slide.href) {
    return <a href={slide.href} target="_blank" rel="noopener noreferrer" aria-label={slide.title} draggable="false" className={className}>{children}</a>;
  }
  return <Link to={slide.to} aria-label={slide.title} draggable="false" className={className}>{children}</Link>;
}

// Manual peek carousel: the active banner sits in the middle with its neighbours peeking in at
// both sides. It only moves when the visitor clicks the arrows, a dot, a side banner, or swipes.
export default function BannerSlider() {
  const [active, setActive] = useState(0);
  const track = useRef({ active: 0, offsets: LOOP.map((_, i) => offsetOf(i, 0)), jumped: LOOP.map(() => false) });
  const drag = useRef(null);
  const count = BANNER_SLIDES.length;
  const current = active % count;

  const go = (step) => setActive((i) => (i + step + LOOP.length) % LOOP.length);
  // Dots take the shortest way round to the chosen banner.
  const goTo = (slideIndex) => {
    const step = (slideIndex - current + count) % count;
    go(step > count / 2 ? step - count : step);
  };

  const onPointerDown = (event) => {
    drag.current = { x: event.clientX, moved: false };
  };
  const onPointerUp = (event) => {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    if (Math.abs(dx) > SWIPE_PX) {
      drag.current.moved = true;
      go(dx < 0 ? 1 : -1);
    }
  };
  // Swallow the click that ends a swipe so it does not follow a banner link.
  const onClickCapture = (event) => {
    if (drag.current?.moved) {
      event.preventDefault();
      event.stopPropagation();
    }
    drag.current = null;
  };

  // A slide that wraps from one end of the loop to the other moves without a transition.
  if (track.current.active !== active) {
    const offsets = LOOP.map((_, i) => offsetOf(i, active));
    track.current = { active, offsets, jumped: offsets.map((offset, i) => Math.abs(offset - track.current.offsets[i]) > 1) };
  }
  const { offsets, jumped } = track.current;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative overflow-hidden bg-gradient-to-b from-cream to-white py-6 sm:py-8"
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') go(-1);
        if (event.key === 'ArrowRight') go(1);
      }}
    >
      <div
        className="relative mx-auto touch-pan-y select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { drag.current = null; }}
        onClickCapture={onClickCapture}
      >
        {/* In-flow spacer that gives the track the active slide's height. */}
        <div className="invisible mx-auto aspect-[3/2] w-[86%] sm:w-[72%] lg:w-[52%]" aria-hidden="true" />

        {LOOP.map((item, i) => {
          const offset = offsets[i];
          const isActive = offset === 0;
          const visible = Math.abs(offset) <= 1;
          return (
            <div
              key={`${item.id}-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${(i % count) + 1} of ${count}: ${item.title}`}
              aria-hidden={!isActive}
              onClick={() => { if (!isActive && visible) go(offset); }}
              style={{
                transform: `translateX(calc(${offset * 100 - 50}% + ${offset * GAP_PX}px)) scale(${isActive ? 1 : 0.94})`,
                transition: jumped[i] ? 'none' : undefined,
              }}
              className={`absolute left-1/2 top-0 aspect-[3/2] w-[86%] overflow-hidden rounded-3xl bg-cream shadow-[0_24px_50px_-20px_rgba(74,26,8,0.55)] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transition-property:transform,opacity] motion-reduce:duration-0 sm:w-[72%] lg:w-[52%] ${isActive ? 'z-10 opacity-100' : `z-0 ${visible ? 'cursor-pointer opacity-70 hover:opacity-90' : 'opacity-0'}`}`}
            >
              {(() => {
                const img = (
                  <img
                    {...photo(item.image, '(min-width: 1024px) 52vw, (min-width: 640px) 72vw, 86vw')}
                    alt=""
                    width="940"
                    height="620"
                    draggable="false"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchpriority={i === 0 ? 'high' : undefined}
                    decoding="async"
                    style={item.focus ? { objectPosition: item.focus } : undefined}
                    className="h-full w-full object-cover"
                  />
                );
                // The button is drawn over the poster; clicks land on the banner link around it.
                const cta = item.cta && (
                  <span
                    aria-hidden="true"
                    style={{ fontSize: 'clamp(11px, 0.9vw + 6px, 19px)' }}
                    className={`absolute inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[#fdf3e3] px-[1.6em] py-[0.75em] font-semibold text-maroon shadow-[0_8px_20px_-6px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 ${item.cta.serif ? 'font-heading' : ''} ${item.cta.position}`}
                  >
                    {item.cta.label}
                  </span>
                );
                const content = <>{img}{cta}</>;
                return isActive && (item.to || item.href) ? <BannerLink slide={item}>{content}</BannerLink> : content;
              })()}
            </div>
          );
        })}

        <button type="button" onClick={() => go(-1)} aria-label="Previous banner" className="absolute left-[3%] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-maroon shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:scale-105 hover:bg-white sm:flex lg:left-[22%]">
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next banner" className="absolute right-[3%] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-maroon shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:scale-105 hover:bg-white sm:flex lg:right-[22%]">
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Choose a banner">
        {BANNER_SLIDES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`Show ${item.title}`}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-primary-dark' : 'w-2.5 bg-maroon/25 hover:bg-maroon/45'}`}
          />
        ))}
      </div>

    </section>
  );
}
