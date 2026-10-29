import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CalendarClock, ChevronRight, Clock, Copy, Flame } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { BLOG_BY_SLUG, BLOG_CATEGORIES } from '../data/blogs.js';
import { SITE_PAGES } from '../data/pages.js';
import { SEVA_BY_ID } from '../data/sevas.js';
import { photo } from '../lib/photo.js';
import useCopyToClipboard from '../hooks/useCopyToClipboard.js';
import ArticleBlock from '../components/ArticleBlocks.jsx';
import NotFound from './NotFound.jsx';

const SIDEBAR_SEVAS = ['festival', 'anna', 'gau', 'sqft'].map((id) => SEVA_BY_ID[id]).filter(Boolean);
const RELATED = SITE_PAGES.find(({ path }) => path === '/festivals')?.cards ?? [];

const longDate = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

function ShareLinks({ title }) {
  const [copied, copy] = useCopyToClipboard();
  const url = typeof window === 'undefined' ? '' : window.location.href;
  const text = encodeURIComponent(`${title} ${url}`);
  const links = [
    { label: 'Share on WhatsApp', href: `https://wa.me/?text=${text}`, className: 'bg-[#25D366] text-white', short: 'WhatsApp' },
    { label: 'Share on Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, className: 'bg-[#1877F2] text-white', short: 'Facebook' },
    { label: 'Share on X', href: `https://twitter.com/intent/tweet?text=${text}`, className: 'bg-black text-white', short: 'X' },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-maroon">Share:</span>
      {links.map((link) => (
        <a key={link.short} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className={`inline-flex h-9 items-center rounded-full px-4 text-xs font-semibold transition-transform hover:scale-105 ${link.className}`}>{link.short}</a>
      ))}
      <button type="button" onClick={() => copy(url)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-gold bg-white px-4 text-xs font-semibold text-maroon hover:bg-cream">
        <Copy size={14} aria-hidden="true" />{copied ? 'Copied' : 'Copy link'}
      </button>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_BY_SLUG[slug];
  if (!post) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{post.title} – {siteConfig.name}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
      </Helmet>

      <section className="bg-gradient-to-b from-primary/25 via-cream/60 to-transparent px-4 pb-6 pt-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <nav aria-label="Breadcrumb" className="rounded-full border border-maroon/20 bg-white px-4 py-2 shadow-sm">
            <ol className="flex items-center gap-1 text-sm font-semibold text-maroon/60">
              <li><Link to="/" className="hover:text-primary-dark">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={16} /></li>
              <li><Link to="/blogs" className="hover:text-primary-dark">Blogs</Link></li>
              <li aria-hidden="true"><ChevronRight size={16} /></li>
              <li aria-current="page" className="text-maroon">{post.shortTitle}</li>
            </ol>
          </nav>
          <span className="mt-5 rounded-full bg-gold/70 px-4 py-1.5 text-sm font-semibold text-primary-dark">{post.category}</span>
          <h1 className="mt-5 font-heading text-3xl font-bold leading-tight text-maroon sm:text-4xl lg:text-5xl">{post.title}</h1>
        </div>
      </section>

      <div className="container-page grid gap-10 py-6 pb-16 md:grid-cols-[minmax(0,1fr)_280px] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <article itemScope itemType="https://schema.org/Article" className="min-w-0">
          <img
            {...photo(post.image.src, '(min-width: 1024px) 760px, 100vw')}
            alt={post.image.alt}
            width="940"
            height="620"
            fetchpriority="high"
            className="w-full rounded-3xl object-cover shadow-[0_24px_50px_-24px_rgba(74,26,8,0.5)]"
          />
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-maroon/70">
            <span className="inline-flex items-center gap-1.5"><Clock size={15} className="text-primary-dark" aria-hidden="true" /><span className="font-medium">{post.readMinutes} min read</span></span>
            <span className="inline-flex items-center gap-1.5"><CalendarClock size={15} className="text-primary-dark" aria-hidden="true" />Updated <time dateTime={post.updated} className="font-medium text-maroon">{longDate(post.updated)}</time></span>
          </div>

          <div itemProp="articleBody" className="border-b border-gold/70 pb-10 pt-4 text-[17px]">
            {post.blocks.map((block, i) => <ArticleBlock key={i} block={block} first={i === 0} />)}
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-5 py-6">
            <div className="flex items-center gap-3 text-sm">
              <img src="/govardhan-dham-logo-96.webp" alt="" aria-hidden="true" width="96" height="96" className="h-10 w-10 rounded-full object-cover ring-1 ring-gold" />
              <span className="font-semibold text-maroon">{post.author}</span>
              <span aria-hidden="true" className="text-maroon/40">·</span>
              <time dateTime={post.published} className="text-maroon/70">{longDate(post.published)}</time>
            </div>
            <ShareLinks title={post.title} />
          </footer>

          <div>
            <h2 className="mb-3 font-heading text-lg font-semibold text-maroon">Popular tags</h2>
            <span className="inline-block rounded-xl border border-maroon/30 px-3 py-1 text-sm font-semibold text-maroon">{post.category}</span>
          </div>
        </article>

        <aside className="md:sticky md:top-24 md:self-start">
          <div className="flex flex-col gap-5 rounded-3xl border border-gold/70 bg-white p-5 shadow-soft">
            {post.seva && (
              <Link to={post.seva.to} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-maroon to-primary-dark p-5 text-white">
                <Flame size={28} className="text-gold" aria-hidden="true" />
                <p className="mt-3 font-heading text-lg font-bold leading-snug">{post.seva.label}</p>
                <p className="mt-1 text-sm text-white/80">{post.seva.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-maroon transition-colors group-hover:bg-primary">Offer now <ArrowRight size={15} aria-hidden="true" /></span>
              </Link>
            )}

            <div>
              <p className="font-heading text-lg text-maroon"><span className="font-bold">Explore</span> categories</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {BLOG_CATEGORIES.map((category) => (
                  <li key={category} className={`rounded-xl border px-3 py-1 text-sm font-semibold ${category === post.category ? 'border-primary-dark bg-primary/15 text-primary-dark' : 'border-maroon/25 text-maroon/80'}`}>{category}</li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gold/60 pt-5">
              <p className="font-heading text-lg text-maroon"><span className="font-bold">Offer</span> seva</p>
              <ul className="mt-3 space-y-2">
                {SIDEBAR_SEVAS.map((seva) => (
                  <li key={seva.id}>
                    <Link to={`/donate/${seva.id}`} className="flex items-center justify-between gap-3 rounded-xl bg-cream px-4 py-3 transition-colors hover:bg-primary/20">
                      <span>
                        <span className="block text-sm font-semibold text-maroon">{seva.title}</span>
                        <span className="block text-xs text-maroon/65">{seva.subtitle}</span>
                      </span>
                      <ChevronRight size={16} className="shrink-0 text-primary-dark" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {RELATED.length > 0 && (
        <section className="bg-primary/10 py-14" aria-labelledby="related-heading">
          <div className="container-page">
            <h2 id="related-heading" className="mb-6 font-heading text-3xl text-maroon"><span className="font-bold">Related</span> reading</h2>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              {RELATED.map((card) => (
                <Link key={card.to} to={card.to} className="card-lift group w-[min(78vw,17rem)] shrink-0 snap-start overflow-hidden rounded-2xl border border-gold/80 bg-white shadow-soft">
                  <img {...photo(card.image.src, '272px')} alt="" loading="lazy" decoding="async" className="card-zoom aspect-[16/10] w-full object-cover" />
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-maroon">{card.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-maroon/65">{card.text}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
