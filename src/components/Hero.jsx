import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, Flower2, MapPin, Sparkles } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { photo } from '../lib/photo.js';
import Countdown from './Countdown.jsx';

const EASE = [0.22, 1, 0.36, 1];
const HEADLINE = 'Discover a sacred home in Jaipur';

// Kept short so the hero is fully readable within ~0.7s (it is the page's LCP area).
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
  return (
    // Pulled up under the transparent header so the hero fills the top of the page.
    <section id="home" className="relative -mt-[72px] overflow-hidden bg-maroon pt-[72px] text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(255,210,122,0.22),transparent_38%),linear-gradient(120deg,rgba(74,26,8,0.98),rgba(74,26,8,0.88)_56%,rgba(224,98,10,0.38))]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-saffron/20 blur-3xl" aria-hidden="true" />
      <div className="container-page relative grid min-h-[640px] items-center gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <motion.div variants={sequence} initial="hidden" animate="show" className="relative z-10">
          <motion.div variants={rise} className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-2 text-sm text-gold backdrop-blur-sm">
            <Sparkles size={16} aria-hidden="true" /> A place for devotion and community
          </motion.div>

          <motion.h1 variants={words} aria-label={HEADLINE} className="max-w-2xl font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {HEADLINE.split(' ').map((w, i) => (
              <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span variants={word} className={`inline-block ${w === 'sacred' ? 'bg-gradient-to-r from-gold to-saffron bg-clip-text italic text-transparent' : ''}`}>{w}</motion.span>
                {' '}
              </span>
            ))}
          </motion.h1>

          <motion.figure variants={rise} className="mt-6 max-w-xl border-l-2 border-gold/60 pl-4">
            <blockquote className="font-heading text-lg italic leading-snug text-gold sm:text-xl">
              <span lang="sa-Latn">patraṁ puṣpaṁ phalaṁ toyaṁ</span>
              <span className="mt-1 block text-base not-italic text-cream/85 sm:text-lg">A leaf, a flower, a fruit or water, offered with love.</span>
            </blockquote>
            <figcaption className="mt-2 text-xs uppercase tracking-[0.2em] text-cream/60">Bhagavad-gītā 9.26</figcaption>
          </motion.figure>

          <motion.p variants={rise} className="mt-5 max-w-xl text-base leading-7 text-cream/85 sm:text-lg">
            Visit Gupt Vrindavan Dham in Jagatpura for darshan, kirtan, spiritual learning and service inspired by the teachings of Krishna.
          </motion.p>

          <motion.div variants={rise} className="mt-7 flex flex-wrap gap-3">
            <a href="#mandir" className="btn-primary group shadow-[0_10px_30px_-8px_rgba(224,98,10,0.8)]">
              Explore the Dham <ArrowDown size={16} aria-hidden="true" className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <Link to="/donate" className="btn-secondary">Offer seva</Link>
          </motion.div>

          <motion.p variants={rise} className="mt-6 flex items-center gap-2 text-sm text-gold"><MapPin size={16} aria-hidden="true" /> Jagatpura, Jaipur, Rajasthan</motion.p>
        </motion.div>

        {/* No opacity fade: the photo is the likely LCP element, so it must paint on the first frame. */}
        <motion.div
          initial={{ scale: 0.96, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute -inset-3 rotate-3 rounded-[2rem] border border-gold/40" aria-hidden="true" />
          <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] border border-gold/40 bg-gradient-to-br from-gold/70 via-cream to-saffron/40 shadow-2xl md:aspect-[5/4]">
            <img {...photo(siteConfig.images.hero, '(min-width: 768px) 512px, calc(100vw - 32px)')} alt="Main gate of an ISKCON temple in Mayapur, shown as representative temple architecture" width="2743" height="2516" fetchpriority="high" loading="eager" decoding="async" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/55 via-transparent to-maroon/20" aria-hidden="true" />
            <figcaption className="absolute left-3 right-3 top-3 rounded-xl bg-maroon/80 px-3 py-2 text-xs text-cream backdrop-blur-sm sm:left-4 sm:right-4 sm:top-4">
              Representative temple photo · Mayapur · <a href={siteConfig.imageCredits.hero.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{siteConfig.imageCredits.hero.title}</a> by {siteConfig.imageCredits.hero.author} · <a href={siteConfig.imageCredits.hero.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{siteConfig.imageCredits.hero.license}</a>
            </figcaption>
          </figure>
          <div className="absolute -bottom-7 left-4 right-4 rounded-2xl border border-gold/50 bg-maroon/85 p-4 text-cream shadow-soft backdrop-blur-md sm:left-8 sm:right-8 sm:p-5">
            <div className="mb-3 flex items-center gap-2 font-medium"><Flower2 size={18} className="text-saffron" aria-hidden="true" /> The Dham is taking shape</div>
            <Countdown />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
