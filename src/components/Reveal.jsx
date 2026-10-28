import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -60px 0px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const delayedFadeUp = {
  hidden: fadeUp.hidden,
  show: (delay = 0) => ({ ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } }),
};

// Fades and lifts a block into place the first time it scrolls into view.
export function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={delayedFadeUp}
      custom={delay}
      {...rest}
    >
      {children}
    </Component>
  );
}

// Reveals its StaggerItem children one after another.
export function Stagger({ as = 'div', className, gap = 0.08, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ as = 'div', className, children, ...rest }) {
  const Component = motion[as];
  return (
    <Component className={className} variants={fadeUp} {...rest}>
      {children}
    </Component>
  );
}
