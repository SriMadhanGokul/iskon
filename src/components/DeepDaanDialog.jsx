import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Layout is in units of the 456×718 design; --u is one design unit at the current card width.
const DESIGN_W = 456;
const DESIGN_H = 718;
const PRICE = 11;
const MAX_DIYAS = 999;
const PRESETS = [30, 51, 108, 251, 501];
const SLOTS = 4;
const SLOT_Y = 205.2;
const slotX = (index) => 168.7 + 26.62 * index;
const LIT = { w: 27.39, h: 30.35 };
const EMPTY = { w: 23.62, h: 23.45 };
const COUNTER = { x: 270, y: 185, w: 41, h: 40 };
const PRICE_DIYA = { x: 168, y: 379, w: 24.44, h: 27.08 };

const u = (n) => `calc(${n} * var(--u))`;
const box = (x, y, w, h) => ({ left: u(x), top: u(y), width: u(w), height: u(h) });
// Inputs keep a real 16px font (no iOS zoom) and are scaled down to the design size via --s.
const inputBox = (x, y, w, h) => ({
  left: u(x),
  top: u(y),
  width: `calc(${w} * var(--u) / var(--s, 1))`,
  height: `calc(${h} * var(--u) / var(--s, 1))`,
  fontSize: '16px',
  transform: 'scale(var(--s, 1))',
  transformOrigin: '0 0',
});
const pop = (el) => el?.animate([{ transform: 'scale(1.35)' }, { transform: 'scale(0.92)' }, { transform: 'scale(1)' }], { duration: 380, easing: 'ease-out' });
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The backdrop uses overflow-clip, not hidden: the oversized glow art would otherwise let focus scroll it sideways.
// The card grows out of the diya flame while a warm glow bursts behind it.
function playOpen(card, glow, origin, onLanded) {
  const rect = card.getBoundingClientRect();
  const from = origin?.getBoundingClientRect();
  const dx = from ? from.left - (rect.left + rect.width / 2) : 0;
  const dy = from ? from.top - (rect.top + rect.height / 2) : 0.25 * rect.height;
  const animations = [
    card.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(0.06) rotate(-8deg)`, opacity: 0, easing: 'cubic-bezier(0.3, 0.6, 0.35, 1)' },
        { transform: 'translate(0, 0) scale(1.04) rotate(0.6deg)', opacity: 1, offset: 0.7, easing: 'ease-in-out' },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 800 },
    ),
    glow?.animate(
      [
        { transform: 'scale(0.2)', opacity: 0 },
        { transform: 'scale(0.9)', opacity: 1, offset: 0.35 },
        { transform: 'scale(1.3)', opacity: 0 },
      ],
      { duration: 1100, delay: 250, easing: 'ease-out', fill: 'both' },
    ),
  ];
  const timer = setTimeout(onLanded, 600);
  return () => {
    clearTimeout(timer);
    animations.forEach((animation) => animation?.cancel());
  };
}

function FieldLabel({ y, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="absolute font-medium leading-normal text-[#19191b]" style={{ left: u(35), top: u(y), width: u(385.34), fontSize: u(15.225) }}>
      {children}
    </label>
  );
}

export default function DeepDaanDialog({ open, onClose, originRef }) {
  const navigate = useNavigate();
  const [backdropShown, setBackdropShown] = useState(false);
  const [count, setCount] = useState(1);
  const [landed, setLanded] = useState(1);
  const [flights, setFlights] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const slotRefs = useRef([]);
  const counterRef = useRef(null);
  const priceDiyaRef = useRef(null);
  const flightId = useRef(0);

  useEffect(() => {
    if (!open) {
      setBackdropShown(false);
      return undefined;
    }
    setCount(1);
    setLanded(1);
    setFlights([]);
    setError('');
    const frame = requestAnimationFrame(() => setBackdropShown(true));
    const stopOpen = reducedMotion()
      ? null
      : playOpen(cardRef.current, glowRef.current, originRef?.current, () => {
        pop(slotRefs.current[0]);
        pop(counterRef.current);
      });
    const focusTimer = window.matchMedia('(pointer: fine)').matches && setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 650);
    const onKey = (event) => event.key === 'Escape' && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      stopOpen?.();
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose, originRef]);

  useEffect(() => {
    const card = cardRef.current;
    if (!open || !card) return undefined;
    const observer = new ResizeObserver(() => {
      card.style.setProperty('--s', String((card.offsetWidth / DESIGN_W) * (15.225 / 16)));
    });
    observer.observe(card);
    return () => observer.disconnect();
  }, [open]);

  const land = useCallback((target) => {
    setLanded((n) => n + 1);
    pop(target < SLOTS ? slotRefs.current[target] : counterRef.current);
  }, []);

  const add = () => {
    if (count >= MAX_DIYAS) return;
    const target = Math.min(count, SLOTS);
    setCount(count + 1);
    if (reducedMotion()) {
      land(target);
      return;
    }
    setFlights((list) => [...list, { id: ++flightId.current, target }]);
  };

  const remove = () => {
    if (count <= 1) return;
    const target = Math.min(count - 1, SLOTS);
    setCount(count - 1);
    // A diya still in the air is simply taken back.
    const inFlight = flights.filter((flight) => !flight.back).pop();
    if (landed < count && inFlight) {
      setFlights((list) => list.filter((flight) => flight.id !== inFlight.id));
      return;
    }
    setLanded(count - 1);
    if (!reducedMotion()) setFlights((list) => [...list, { id: ++flightId.current, target, back: true }]);
  };

  const choosePreset = (n) => {
    setCount(n);
    setLanded(n);
    setFlights([]);
    pop(counterRef.current);
  };

  // Each added diya arcs from the price tag up to its lamp slot (or the counter once all four are lit).
  const launch = (el, flight) => {
    if (!el || el.dataset.flying) return;
    el.dataset.flying = '1';
    const scale = cardRef.current.offsetWidth / DESIGN_W;
    const fromX = PRICE_DIYA.x + PRICE_DIYA.w / 2;
    const fromY = PRICE_DIYA.y + PRICE_DIYA.h / 2;
    const toX = flight.target < SLOTS ? slotX(flight.target) : COUNTER.x + COUNTER.w / 2;
    const toY = flight.target < SLOTS ? SLOT_Y : COUNTER.y + COUNTER.h / 2;
    const dx = (toX - fromX) * scale;
    const dy = (toY - fromY) * scale;
    const endScale = flight.target < SLOTS ? LIT.w / PRICE_DIYA.w : 0.6;
    const start = { transform: 'translate(0,0) scale(1)', opacity: 0.4 };
    const mid = { transform: `translate(${0.35 * dx}px, ${0.55 * dy - 40 * scale}px) scale(1.5)`, opacity: 1, offset: flight.back ? 0.55 : 0.45 };
    const end = { transform: `translate(${dx}px, ${dy}px) scale(${endScale})`, opacity: 1 };
    el.animate(flight.back ? [end, mid, start] : [start, mid, end], { duration: 750, easing: 'cubic-bezier(0.45, 0, 0.25, 1)', fill: 'forwards' }).onfinish = () => {
      if (!el.isConnected) return;
      setFlights((list) => list.filter((f) => f.id !== flight.id));
      if (flight.back) pop(priceDiyaRef.current);
      else land(flight.target);
    };
  };

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter your name.');
      nameRef.current?.focus();
      return;
    }
    if (phone.length !== 10) {
      setError('Please enter a valid 10 digit mobile number.');
      phoneRef.current?.focus();
      return;
    }
    onClose();
    navigate('/donate/checkout', { state: { donor: { name: trimmed, phone }, amount: PRICE * count, sevaId: 'festival' } });
  };

  if (!open) return null;

  const offered = Math.min(landed, count);
  const litSlots = Math.min(offered, SLOTS);

  return createPortal(
    <div className={`fixed inset-0 z-[70] flex items-center justify-center overflow-clip bg-black/60 transition-opacity duration-300 ${backdropShown ? 'opacity-100' : 'opacity-0'}`} onClick={onClose}>
      <span ref={glowRef} aria-hidden="true" className="pointer-events-none absolute size-[min(130vw,130vh,1000px)] rounded-full bg-[radial-gradient(circle,rgba(255,200,90,0.55)_0%,rgba(255,150,20,0.25)_35%,rgba(255,120,0,0)_68%)] opacity-0" />
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label="Deep Daan - offer a diya"
        onClick={(event) => event.stopPropagation()}
        className="relative font-body [container-type:inline-size]"
        style={{
          width: `min(${DESIGN_W}px, calc(100vw - 32px), calc((100dvh - 32px) * ${DESIGN_W / DESIGN_H}))`,
          aspectRatio: `${DESIGN_W} / ${DESIGN_H}`,
          '--u': `calc(100cqw / ${DESIGN_W})`,
        }}
      >
        <img src="/pop_ups/diya_pop_up.png" alt="" draggable="false" className="pointer-events-none absolute max-w-none select-none" style={{ left: '-46.271929824561%', top: '-29.38718662952646%', width: '192.54385964912282%', height: '158.77437325905293%' }} />

        {Array.from({ length: SLOTS }, (_, i) => {
          const lit = i < litSlots;
          const size = lit ? LIT : EMPTY;
          return (
            <img
              key={i}
              ref={(el) => { slotRefs.current[i] = el; }}
              src={lit ? '/pop_ups/diya.png' : '/pop_ups/placeholder.png'}
              alt=""
              className="pointer-events-none absolute object-contain"
              style={box(slotX(i) - size.w / 2, SLOT_Y - size.h / 2, size.w, size.h)}
            />
          );
        })}
        <div ref={counterRef} aria-label={`${offered} diya${offered > 1 ? 's' : ''} offered`} className="absolute flex items-center justify-center font-bold leading-none text-[#5f2fd6]" style={{ ...box(COUNTER.x, COUNTER.y, COUNTER.w, COUNTER.h), fontSize: u(offered > 99 ? 14 : 18) }}>
          <img src="/pop_ups/icons/plus-small.svg" alt="" style={{ width: u(10), height: u(10), marginRight: u(-2), marginTop: u(3) }} />
          {offered}
        </div>

        <div className="absolute flex flex-col items-center" style={{ left: u(35), top: u(245), width: u(385.34), gap: u(3.456) }}>
          <h2 className="sr-only">Deep Daan</h2>
          <img src="/pop_ups/icons/deep-daan.svg" alt="" style={{ width: u(211.546), height: u(42.427) }} />
          <p className="text-center leading-normal text-[#888]" style={{ width: u(325), fontSize: u(16) }}>Offer sacred diyas in this holy month of Kartik and receive divine blessings.</p>
        </div>

        <img src="/pop_ups/icons/rupee.svg" alt="" className="absolute" style={box(81, 378.54, 27.35, 27.35)} />
        <span className="absolute flex items-center font-bold leading-[1.2] text-white" style={{ ...box(107.09, 373, 34.59, 38.12), fontSize: u(28.815) }}>{PRICE}</span>
        <span className="absolute flex items-center justify-center" style={box(141.68, 380.86, 23.29, 31.39)}>
          <img src="/pop_ups/icons/slash.svg" alt="" style={{ width: u(17.48), height: u(29.38) }} />
        </span>
        <img ref={priceDiyaRef} src="/pop_ups/diya.png" alt="per diya" className="absolute object-contain" style={box(164.97, 373.39, 33.71, 37.35)} />

        <button type="button" onClick={remove} disabled={count <= 1} aria-label="Remove a diya" className="absolute flex items-center justify-center rounded-full bg-white transition active:scale-90 disabled:opacity-50" style={box(231.68, 373, 40, 40)}>
          <img src="/pop_ups/icons/minus.svg" alt="" style={{ width: u(25), height: u(25) }} />
        </button>
        <span aria-live="polite" className="absolute flex items-center justify-center whitespace-nowrap font-bold leading-[1.2] text-[#5f2fd6]" style={{ ...box(271.68, 383.5, 63, 19), fontSize: u(count > 99 ? 11 : count > 9 ? 13 : count > 1 ? 14.5 : 16) }}>
          {count} {count > 1 ? 'Diyas' : 'Diya'}
        </span>
        <button type="button" onClick={add} disabled={count >= MAX_DIYAS} aria-label="Add a diya" className="absolute flex items-center justify-center rounded-full bg-[#5f2fd6] transition hover:brightness-110 active:scale-90 disabled:opacity-50" style={box(334.68, 373, 40, 40)}>
          <img src="/pop_ups/icons/plus.svg" alt="" style={{ width: u(25), height: u(25) }} />
        </button>

        <div className="absolute flex" style={{ ...box(65, 426, 315, 24), gap: u(7) }}>
          {PRESETS.map((n) => {
            const selected = count === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => choosePreset(n)}
                aria-pressed={selected}
                aria-label={`Offer ${n} diyas`}
                className={`flex flex-1 items-center justify-center rounded-full font-semibold leading-none tabular-nums transition active:scale-95 ${selected ? 'bg-gradient-to-r from-[#2f3fb5] to-[#7a2fcf] text-white shadow-[0_2px_6px_rgba(95,47,214,0.35)]' : 'bg-white text-[#5f2fd6] ring-1 ring-inset ring-[#5f2fd6]/20 hover:bg-[#f4f0ff] hover:ring-[#5f2fd6]/45'}`}
                style={{ fontSize: u(12.5) }}
              >
                {n}
              </button>
            );
          })}
        </div>

        <FieldLabel y={458} htmlFor="diya-name">Your Name</FieldLabel>
        <input ref={nameRef} id="diya-name" type="text" autoComplete="name" placeholder="Enter your name" value={name} onChange={(event) => setName(event.target.value)} className="absolute bg-transparent font-medium text-[#19191b] outline-none placeholder:text-[#999]" style={inputBox(82.6, 485.135, 326.3, 45.675)} />
        <FieldLabel y={545.81} htmlFor="diya-mobile">Mobile Number</FieldLabel>
        <input ref={phoneRef} id="diya-mobile" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="+91 Enter mobile number" maxLength={10} value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))} className="absolute bg-transparent font-medium text-[#19191b] outline-none placeholder:text-[#999]" style={inputBox(82.6, 572.95, 326.3, 45.675)} />

        <button type="button" onClick={submit} className="absolute flex items-center justify-center rounded-full font-bold text-white transition hover:bg-white/10 active:scale-[0.98]" style={{ ...box(35, 635.62, 385.34, 60), gap: u(5.329) }}>
          <span style={{ fontSize: u(18.27), letterSpacing: u(0.3654) }}>Offer {count} {count > 1 ? 'Diyas' : 'Diya'} ·</span>
          <span className="flex items-center" style={{ fontSize: u(22.614) }}>
            <img src="/pop_ups/icons/rupee-button.svg" alt="₹" style={{ width: u(21.46), height: u(21.46) }} />
            {PRICE * count}
          </span>
        </button>
        {error && (
          <p role="alert" className="absolute text-center font-medium text-[#c62828]" style={{ left: u(35), top: u(697), width: u(385.34), fontSize: u(12) }}>{error}</p>
        )}

        <button type="button" onClick={onClose} aria-label="Close" className="absolute z-20 flex items-center justify-center rounded-full bg-white text-[#5f2fd6] shadow-[0_2px_10px_rgba(0,0,0,0.3)] ring-2 ring-[#f5b301] transition hover:scale-105 active:scale-95" style={{ right: u(-10), top: u(-10), width: `max(32px, ${u(36)})`, height: `max(32px, ${u(36)})` }}>
          <X className="size-[55%]" strokeWidth={2.75} />
        </button>

        {flights.map((flight) => (
          <img key={flight.id} ref={(el) => launch(el, flight)} src="/pop_ups/diya.png" alt="" className="pointer-events-none absolute z-10 object-contain drop-shadow-[0_0_6px_rgba(255,170,0,0.9)]" style={box(PRICE_DIYA.x, PRICE_DIYA.y, PRICE_DIYA.w, PRICE_DIYA.h)} />
        ))}
      </div>
    </div>,
    document.body,
  );
}
