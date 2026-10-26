import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Flower2, MapPin, Sparkles } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import Countdown from './Countdown.jsx';

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="home" className="relative overflow-hidden bg-maroon text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(255,210,122,0.22),transparent_38%),linear-gradient(120deg,rgba(74,26,8,0.98),rgba(74,26,8,0.88)_56%,rgba(224,98,10,0.38))]" />
      <div className="container-page relative grid min-h-[620px] items-center gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="relative z-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/10 px-4 py-2 text-sm text-gold">
            <Sparkles size={16} aria-hidden="true" /> A place for devotion and community
          </div>
          <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">Discover a sacred home in Jaipur</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-cream/90 sm:text-lg">Visit Gupt Vrindavan Dham in Jagatpura for darshan, kirtan, spiritual learning and service inspired by the teachings of Krishna.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#mandir" className="btn-primary">Explore the Dham <ArrowDown size={16} aria-hidden="true" /></a>
            <Link to="/donate" className="btn-secondary">Offer seva</Link>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-gold"><MapPin size={16} aria-hidden="true" /> Jagatpura, Jaipur, Rajasthan</p>
        </motion.div>
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-3 rotate-3 rounded-[2rem] border border-gold/40" aria-hidden="true" />
          <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] border border-gold/40 bg-gradient-to-br from-gold/70 via-cream to-saffron/40 shadow-2xl md:aspect-[5/4]">
            <img src={siteConfig.images.hero} alt="Main gate of an ISKCON temple in Mayapur, shown as representative temple architecture" width="2743" height="2516" fetchpriority="high" decoding="async" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/55 via-transparent to-maroon/20" aria-hidden="true" />
            <figcaption className="absolute left-3 right-3 top-3 rounded-xl bg-maroon/80 px-3 py-2 text-xs text-cream backdrop-blur-sm sm:left-4 sm:right-4 sm:top-4">
              Representative temple photo · Mayapur · <a href={siteConfig.imageCredits.hero.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{siteConfig.imageCredits.hero.title}</a> by {siteConfig.imageCredits.hero.author} · <a href={siteConfig.imageCredits.hero.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{siteConfig.imageCredits.hero.license}</a>
            </figcaption>
          </figure>
          <div className="absolute -bottom-7 left-4 right-4 rounded-2xl border border-gold/50 bg-maroon p-4 text-cream shadow-soft sm:left-8 sm:right-8 sm:p-5">
            <div className="mb-3 flex items-center gap-2 font-medium"><Flower2 size={18} className="text-saffron-dark" aria-hidden="true" /> The Dham is taking shape</div>
            <Countdown />
          </div>
        </div>
      </div>
    </section>
  );
}
