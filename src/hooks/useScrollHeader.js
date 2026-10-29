import { useEffect, useState } from 'react';

const SCROLLED_AT = 16;
const HIDE_AFTER = 420;
const JITTER = 6;

// Tracks whether the page has left the top (header turns to glass) and whether the
// reader is scrolling down past the hero (header tucks away until they scroll up).
export default function useScrollHeader() {
  const [state, setState] = useState({ scrolled: false, hidden: false, goingDown: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      setState((prev) => {
        let { hidden, goingDown } = prev;
        if (y < HIDE_AFTER) hidden = false;
        else if (delta > JITTER) hidden = true;
        else if (delta < -JITTER) hidden = false;
        if (delta > JITTER) goingDown = true;
        else if (delta < -JITTER) goingDown = false;
        const scrolled = y > SCROLLED_AT;
        return hidden === prev.hidden && scrolled === prev.scrolled && goingDown === prev.goingDown ? prev : { scrolled, hidden, goingDown };
      });
      if (Math.abs(delta) > JITTER || y < HIDE_AFTER) lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return state;
}
