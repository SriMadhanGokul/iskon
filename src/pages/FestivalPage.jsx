import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, ChevronRight, HandHeart, Play } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { SITE_PAGES } from '../data/pages.js';
import { SEVA_BY_ID } from '../data/sevas.js';
import { photo } from '../lib/photo.js';
import ArticleBlock from '../components/ArticleBlocks.jsx';

const SIDEBAR_SEVAS = ['festival', 'anna', 'gau', 'sqft'].map((id) => SEVA_BY_ID[id]).filter(Boolean);
const FESTIVAL_CARDS = SITE_PAGES.find(({ path }) => path === '/festivals')?.cards ?? [];

const shortDate = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// Shows the YouTube thumbnail first and only loads the player when the visitor presses play.
function FestivalVideo({ id, title }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-maroon shadow-[0_24px_50px_-24px_rgba(74,26,8,0.5)]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`} className="group absolute inset-0">
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-maroon/60 to-transparent" aria-hidden="true" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-dark text-white shadow-xl ring-4 ring-white/40 transition-transform group-hover:scale-110 sm:h-20 sm:w-20">
            <Play size={30} fill="currentColor" aria-hidden="true" className="ml-1" />
          </span>
        </button>
      )}
    </div>
  );
}

export default function FestivalPage({ page }) {
  const others = FESTIVAL_CARDS.filter((card) => card.to !== page.path);
  const { banner } = page;

  return (
    <>
      <Helmet>
        <title>{page.metaTitle} – {siteConfig.name}</title>
        <meta name="description" content={page.description} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.description} />
      </Helmet>

      <section className="relative flex h-[340px] items-end justify-center overflow-hidden rounded-b-[2rem] text-white sm:h-[375px]">
        <img {...photo(banner.src, '100vw')} alt="" fetchpriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(74,26,8,0.85)_0%,rgba(74,26,8,0.15)_45%,rgba(74,26,8,0.75)_100%)]" aria-hidden="true" />
        <div className="relative z-10 px-4 pb-10 text-center sm:pb-12">
          <h1 className="font-heading text-3xl font-bold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl">{page.title}</h1>
          <nav aria-label="Breadcrumb" className="mt-4">
            <ol className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-white/85">
              <li><Link to="/" className="hover:text-gold">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/festivals" className="hover:text-gold">Festivals</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold">{page.crumb}</li>
            </ol>
          </nav>
        </div>
        {banner.credit && (
          <p className="absolute bottom-2 right-4 z-10 hidden text-[10px] text-white/60 sm:block">
            Photo: <a href={banner.credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{banner.credit.title}</a> · <a href={banner.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{banner.credit.license}</a>
          </p>
        )}
      </section>

      <div className="container-page grid gap-10 py-10 pb-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <article className="min-w-0">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary-dark">
            <CalendarDays size={17} aria-hidden="true" />
            <time dateTime={page.date}>{shortDate(page.date)}</time>
          </p>

          {page.youtubeId && <FestivalVideo id={page.youtubeId} title={page.metaTitle} />}

          <div className="pt-6 text-[17px]">
            {page.blocks.map((block, i) => <ArticleBlock key={i} block={block} />)}
          </div>

          {page.sevas?.length > 0 && (
            <section aria-label="Seva opportunities" className="mt-6">
              <p className="text-[17px] leading-8 text-maroon/85">Available seva opportunities include:</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {page.sevas.map((seva) => {
                  const body = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary-dark"><HandHeart size={20} aria-hidden="true" /></span>
                      <span className="flex-1 font-semibold text-maroon">{seva.label}</span>
                      {seva.to && <ChevronRight size={18} className="text-primary-dark" aria-hidden="true" />}
                    </>
                  );
                  return (
                    <li key={seva.label}>
                      {seva.to ? (
                        <Link to={seva.to} className="flex items-center gap-3 rounded-2xl border border-gold/80 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-primary">{body}</Link>
                      ) : (
                        <div className="flex items-center gap-3 rounded-2xl border border-gold/80 bg-white p-4 shadow-soft">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
              {page.sevaNote && <p className="mt-5 text-[17px] leading-8 text-maroon/85">{page.sevaNote}</p>}
              {page.sevaCta && (
                <Link to={page.sevaCta.to} className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-primary-dark to-[#d9531c] px-7 text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(184,60,0,0.6)] transition-transform hover:scale-[1.03]">
                  {page.sevaCta.label} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
            </section>
          )}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-gold/70 bg-white p-5 shadow-soft">
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
        </aside>
      </div>

      {others.length > 0 && (
        <section className="bg-primary/10 py-14" aria-labelledby="other-festivals-heading">
          <div className="container-page">
            <h2 id="other-festivals-heading" className="mb-6 font-heading text-3xl text-maroon"><span className="font-bold">More</span> festivals</h2>
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
              {others.map((card) => (
                <Link key={card.to} to={card.to} className="card-lift group w-[min(78vw,17rem)] shrink-0 snap-start overflow-hidden rounded-2xl border border-gold/80 bg-white shadow-soft">
                  <img {...photo(card.image.src, '272px')} alt="" loading="lazy" decoding="async" className="card-zoom aspect-[16/10] w-full object-cover" />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold leading-snug text-maroon">{card.title}</h3>
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
