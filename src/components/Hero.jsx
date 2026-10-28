import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ChevronLeft, ChevronRight, Flower2, MapPin, Pause, Play, Sparkles } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { photo } from '../lib/photo.js';
import Countdown from './Countdown.jsx';

const EASE = [0.22, 1, 0.36, 1];
const HEADLINE = 'Discover a sacred home in Jaipur';
const slides = [
  {
    src: siteConfig.images.hero,
    alt: 'Main gate of an ISKCON temple in Mayapur',
    label: 'Temple architecture',
    credit: siteConfig.imageCredits.hero,
  },
  {
    src: siteConfig.images.mayapurRadhaKrishna,
    alt: 'Decorated Radha and Krishna deities at New Mayapur',
    label: 'Radha and Krishna at New Mayapur',
    credit: siteConfig.imageCredits.mayapurRadhaKrishna,
  },
  {
    src: siteConfig.images.vrindavanRadhaKrishna,
    alt: 'Radha and Krishna deities in Vrindavan',
    label: 'Radha and Krishna in Vrindavan',
    credit: siteConfig.imageCredits.vrindavanRadhaKrishna,
  },
  {
    src: siteConfig.images.laljiTempleRadhaKrishna,
    alt: 'Radha and Krishna idols at Lalji Temple, Kalna',
    label: 'Radha and Krishna at Lalji Temple',
    credit: siteConfig.imageCredits.laljiTempleRadhaKrishna,
  },
];

const sequence = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const words = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const word = {
  hidden: { opacity: 0, y: '0.6em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const activeSlide = slides[activeIndex];
  const imageProps = activeIndex === 0
    ? photo(activeSlide.src, '100vw')
    : { src: activeSlide.src };

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion) return undefined;
    const interval = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveIndex((index) => (index + 1) % slides.length);
      }
    }, 6000);
    return () => window.clearInterval(interval);
  }, [isPaused, reducedMotion]);

  const goToSlide = (direction) => {
    setActiveIndex((index) => (index + direction + slides.length) % slides.length);
  };

  return (
    <section
      id="home"
      aria-label="Gupt Vrindavan Dham"
      className="relative overflow-hidden bg-maroon text-white"
    >
      <div className="absolute inset-0 bg-maroon" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeSlide.src}
            {...imageProps}
            alt={activeSlide.alt}
            width={activeIndex === 0 ? '2743' : undefined}
            height={activeIndex === 0 ? '2516' : undefined}
            fetchPriority={activeIndex === 0 ? 'high' : undefined}
            loading={activeIndex === 0 ? 'eager' : 'lazy'}
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 1.1, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(24,8,4,0.82)_0%,rgba(35,12,5,0.70)_42%,rgba(35,12,5,0.26)_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(24,8,4,0.28)_0%,transparent_32%,transparent_66%,rgba(24,8,4,0.68)_100%)]" aria-hidden="true" />

      <div className="container-page relative z-10 grid min-h-[600px] grid-rows-[1fr_auto] gap-6 py-12 sm:min-h-[620px] md:min-h-[min(680px,calc(100svh-60px))] md:py-14">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
          <motion.div variants={sequence} initial="hidden" animate="show" className="max-w-3xl">
            <motion.div variants={rise} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/20 px-4 py-2 text-sm text-white backdrop-blur-sm">
              <Sparkles size={16} aria-hidden="true" /> A place for devotion and community
            </motion.div>

            <motion.h1 variants={words} aria-label={HEADLINE} className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
              {HEADLINE.split(' ').map((w, i) => (
                <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span variants={word} className={`inline-block ${w === 'sacred' ? 'text-primary' : ''}`}>{w}</motion.span>
                  {' '}
                </span>
              ))}
            </motion.h1>

            <motion.figure variants={rise} className="mt-6 max-w-xl border-l-2 border-primary/80 pl-4">
              <blockquote className="font-heading text-lg italic leading-snug text-white sm:text-xl">
                <span lang="sa-Latn">patraṁ puṣpaṁ phalaṁ toyaṁ</span>
                <span className="mt-1 block text-base not-italic text-white/85 sm:text-lg">A leaf, a flower, a fruit or water, offered with love.</span>
              </blockquote>
              <figcaption className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70">Bhagavad-gītā 9.26</figcaption>
            </motion.figure>

            <motion.p variants={rise} className="mt-5 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
              Visit Gupt Vrindavan Dham in Jagatpura for darshan, kirtan, spiritual learning and service inspired by the teachings of Krishna.
            </motion.p>

            <motion.div variants={rise} className="mt-7 flex flex-wrap gap-3">
              <a href="#mandir" className="btn group border border-primary bg-primary text-maroon shadow-[0_10px_30px_-8px_rgba(184,60,0,0.5)] hover:bg-primary-dark hover:text-white">
                Explore the Dham <ArrowDown size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
              </a>
              <Link to="/donate" className="btn border border-white/65 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20">Offer seva</Link>
            </motion.div>

            <motion.p variants={rise} className="mt-6 flex items-center gap-2 text-sm text-white/90">
              <MapPin size={16} aria-hidden="true" /> Jagatpura, Jaipur, Rajasthan
            </motion.p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="w-full max-w-sm justify-self-start rounded-2xl border border-primary/55 bg-maroon/70 p-4 text-white shadow-2xl backdrop-blur-md md:justify-self-end md:p-5"
          >
            <div className="mb-3 flex items-center gap-2 font-medium">
              <Flower2 size={18} className="text-primary" aria-hidden="true" /> The Dham is taking shape
            </div>
            <Countdown />
          </motion.aside>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/20 pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Image carousel controls">
            <button type="button" onClick={() => goToSlide(-1)} aria-label="Previous image" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-black/25 text-white transition-colors hover:bg-white/20">
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setIsPaused((paused) => !paused)}
              disabled={reducedMotion}
              aria-label={reducedMotion ? 'Automatic slideshow paused because reduced motion is enabled' : isPaused ? 'Start automatic slideshow' : 'Pause automatic slideshow'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-black/25 text-white transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPaused || reducedMotion ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => goToSlide(1)} aria-label="Next image" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-black/25 text-white transition-colors hover:bg-white/20">
              <ChevronRight size={20} aria-hidden="true" />
            </button>
            <div className="ml-1 flex items-center gap-1.5" role="group" aria-label="Choose an image">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show image ${index + 1}: ${slide.label}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-7 bg-primary' : 'w-2.5 bg-white/65 hover:bg-white'}`}
                />
              ))}
            </div>
          </div>

          <p className="max-w-xl text-[10px] leading-4 text-white/75 sm:text-right">
            Representative image: <a href={activeSlide.credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{activeSlide.credit.title}</a>
            {' '}by {activeSlide.credit.author} · <a href={activeSlide.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{activeSlide.credit.license}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
