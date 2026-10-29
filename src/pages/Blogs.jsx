import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { BLOGS } from '../data/blogs.js';
import { photo } from '../lib/photo.js';

export default function Blogs() {
  return (
    <>
      <Helmet>
        <title>Blogs – {siteConfig.name}</title>
        <meta name="description" content="Articles on festivals, Krishna katha and devotional practice from Gupt Vrindavan Dham." />
      </Helmet>
      <section className="bg-gradient-to-b from-primary/25 via-cream/60 to-transparent px-4 pb-6 pt-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">From the Dham</p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-maroon sm:text-5xl">Blogs</h1>
        <p className="mx-auto mt-3 max-w-xl text-maroon/75">Festivals, Krishna katha and simple guides to devotional practice.</p>
      </section>
      <div className="container-page grid gap-6 py-10 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {BLOGS.map((post) => (
          <Link key={post.slug} to={`/blogs/${post.slug}`} className="card-lift group overflow-hidden rounded-3xl border border-gold/80 bg-white shadow-soft">
            <img {...photo(post.image.src, '(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw')} alt="" loading="lazy" decoding="async" className="card-zoom aspect-[3/2] w-full object-cover" />
            <div className="p-5">
              <span className="rounded-full bg-gold/70 px-3 py-1 text-xs font-semibold text-primary-dark">{post.category}</span>
              <h2 className="mt-3 font-heading text-lg font-bold leading-snug text-maroon">{post.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm text-maroon/70">{post.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-maroon/60">
                <span className="inline-flex items-center gap-1"><Clock size={13} aria-hidden="true" />{post.readMinutes} min read</span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary-dark">Read <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
