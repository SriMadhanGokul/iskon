import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Copy, Minus, Music, Play, Plus, Share2 } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { AUTHORS, CATEGORIES, LANGUAGE_NAMES, SONG_BY_SLUG, categoryName, gradientAt, moodName, relatedSongs, songPath } from '../data/bhajans.js';
import useCopyToClipboard from '../hooks/useCopyToClipboard.js';
import { BhajanSearch, Breadcrumb, CollectionTile, StayConnected } from '../components/BhajanParts.jsx';
import NotFound from './NotFound.jsx';

const VIEWS = ['Full Verse', 'Verse by Verse', 'Word by Word'];
const FONT_SIZES = [15, 17, 19, 21, 24];

// Grey bars standing in for lines of text that have not been added yet.
function PlaceholderLines({ widths }) {
  return (
    <span aria-hidden="true" className="block space-y-2">
      {widths.map((w, i) => <span key={i} className="block h-3 rounded-full bg-maroon/10" style={{ width: `${w}%` }} />)}
    </span>
  );
}

// Song page. Lyrics, translation, word meanings and audio are placeholders until the temple
// provides them; the structure (verse count, languages, details) comes from bhajans.json.
export default function BhajanSong() {
  const { slug } = useParams();
  const song = SONG_BY_SLUG[slug];
  const [view, setView] = useState(VIEWS[0]);
  const [language, setLanguage] = useState('en');
  const [sizeIndex, setSizeIndex] = useState(1);
  const [copied, copy] = useCopyToClipboard();
  if (!song) return <NotFound />;

  const verses = Array.from({ length: Math.max(song.verseCount, 1) }, (_, i) => i + 1);
  const author = AUTHORS.find((a) => a.slug === song.authorSlug);
  const related = relatedSongs(song);
  const url = typeof window === 'undefined' ? '' : window.location.href;
  const share = () => (navigator.share ? navigator.share({ title: song.title, url }).catch(() => {}) : copy(url));
  const verseLabel = `${song.verseCount} ${song.verseCount === 1 ? 'verse' : 'verses'}`;
  const details = [
    ['Tradition', song.tradition ?? 'Bhajan'],
    ['Composer', author ? <Link to={`/bhajans/authors/${author.slug}`} className="text-primary-dark underline underline-offset-4">{song.author}</Link> : song.author],
    ['Source', song.source],
    ['Languages', song.languages.map((code) => LANGUAGE_NAMES[code] ?? code).join(', ')],
    ['Verses', verseLabel],
    ['Categories', song.categories.map(categoryName).join(', ')],
    ['Mood', song.moods.map(moodName).join(', ')],
  ].filter(([, value]) => value);

  return (
    <>
      <Helmet>
        <title>{song.title} – {song.author} – {siteConfig.brandName}</title>
        <meta name="description" content={`${song.title}, a bhajan by ${song.author}. ${verseLabel}.`} />
      </Helmet>

      <header className="relative overflow-hidden bg-gradient-to-br from-maroon via-[#6b2409] to-primary-dark text-white">
        {song.image && <img src={song.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />}
        <div className="container-page relative py-10 sm:py-14">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Bhajans', to: '/bhajans' }, { label: song.title }]} />
          <h1 className="mt-8 font-heading text-4xl font-bold sm:text-5xl">{song.title}</h1>
          <p className="mt-2 text-white/85">Bhajan | {song.author}</p>
          <div className="mt-6 flex max-w-xl items-center gap-4 rounded-2xl bg-white/10 p-3 backdrop-blur">
            <button type="button" disabled aria-label="Play bhajan (audio coming soon)" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary-dark opacity-70"><Play size={20} aria-hidden="true" /></button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{song.title}</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/25"><div className="h-full w-0 rounded-full bg-gold" /></div>
            </div>
            <span className="shrink-0 text-xs text-white/75">Audio coming soon</span>
          </div>
        </div>
      </header>

      <div className="container-page py-8">
        <BhajanSearch placeholder="Search by title, composer, or a category…" className="max-w-3xl" />
      </div>

      <div className="container-page grid grid-cols-[minmax(0,1fr)] gap-8 pb-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/70 bg-white p-2 shadow-soft">
            <div className="flex flex-wrap gap-1" role="tablist" aria-label="Lyrics view">
              {VIEWS.map((name) => (
                <button key={name} type="button" role="tab" aria-selected={view === name} onClick={() => setView(name)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${view === name ? 'bg-primary-dark text-white' : 'text-maroon hover:bg-cream'}`}>{name}</button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="lyrics-language">Language</label>
              <select id="lyrics-language" value={language} onChange={(event) => setLanguage(event.target.value)} className="h-9 rounded-full border border-gold bg-white px-3 text-sm text-maroon">
                {song.languages.map((code) => <option key={code} value={code}>{LANGUAGE_NAMES[code] ?? code}</option>)}
              </select>
              <div className="flex items-center rounded-full border border-gold">
                <button type="button" onClick={() => setSizeIndex((i) => Math.max(0, i - 1))} aria-label="Smaller text" className="flex h-9 w-9 items-center justify-center text-maroon hover:text-primary-dark"><Minus size={15} aria-hidden="true" /></button>
                <span className="w-7 text-center text-sm font-semibold text-maroon">{FONT_SIZES[sizeIndex]}</span>
                <button type="button" onClick={() => setSizeIndex((i) => Math.min(FONT_SIZES.length - 1, i + 1))} aria-label="Larger text" className="flex h-9 w-9 items-center justify-center text-maroon hover:text-primary-dark"><Plus size={15} aria-hidden="true" /></button>
              </div>
              <button type="button" onClick={() => copy(url)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-gold px-3 text-sm font-semibold text-maroon hover:bg-cream"><Copy size={14} aria-hidden="true" />{copied ? 'Copied' : 'Copy'}</button>
              <button type="button" onClick={share} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-gold px-3 text-sm font-semibold text-maroon hover:bg-cream"><Share2 size={14} aria-hidden="true" />Share</button>
            </div>
          </div>

          <p className="mt-6 rounded-2xl border border-dashed border-primary/50 bg-primary/10 px-5 py-4 text-sm text-maroon/80">
            The {LANGUAGE_NAMES[language] ?? language} lyrics, translation and audio for this bhajan will be added soon. The layout below shows where each of its {verseLabel} will appear.
          </p>

          <div style={{ fontSize: FONT_SIZES[sizeIndex] }}>
            {view !== 'Word by Word' && (
              <section className="mt-8">
                <h2 className="font-heading text-2xl font-bold text-maroon">Verses</h2>
                <div className={view === 'Verse by Verse' ? 'mt-4 space-y-4' : 'mt-4 space-y-6 rounded-3xl border border-gold/70 bg-white p-6 shadow-soft'}>
                  {verses.map((n) => (
                    <div key={n} className={view === 'Verse by Verse' ? 'rounded-3xl border border-gold/70 bg-white p-6 shadow-soft' : ''}>
                      <p className="text-sm font-bold uppercase tracking-wider text-primary-dark">Verse {n}</p>
                      <div className="mt-3"><PlaceholderLines widths={[78, 64, 52]} /></div>
                      {view === 'Verse by Verse' && (
                        <div className="mt-5 border-t border-gold/50 pt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-maroon/60">Translation</p>
                          <div className="mt-3"><PlaceholderLines widths={[96, 88, 40]} /></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {view === 'Full Verse' && (
              <section className="mt-10">
                <h2 className="font-heading text-2xl font-bold text-maroon">Translation</h2>
                <div className="mt-4 space-y-6 rounded-3xl border border-gold/70 bg-white p-6 shadow-soft">
                  {verses.map((n) => (
                    <div key={n}>
                      <p className="text-sm font-bold uppercase tracking-wider text-primary-dark">Verse {n}</p>
                      <div className="mt-3"><PlaceholderLines widths={[96, 90, 45]} /></div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {view === 'Word by Word' && (
              <section className="mt-8 space-y-4">
                {verses.map((n) => (
                  <div key={n} className="rounded-3xl border border-gold/70 bg-white p-6 shadow-soft">
                    <p className="text-sm font-bold uppercase tracking-wider text-primary-dark">Verse {n}</p>
                    <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                      {[1, 2, 3, 4].map((w) => (
                        <div key={w} className="rounded-xl bg-cream px-4 py-3">
                          <dt><span aria-hidden="true" className="block h-3 w-1/3 rounded-full bg-primary/30" /></dt>
                          <dd className="mt-2"><span aria-hidden="true" className="block h-3 w-2/3 rounded-full bg-maroon/10" /></dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </section>
            )}
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-gold/70 bg-white p-6 shadow-soft">
            <h2 className="font-heading text-xl font-bold text-maroon">Song Details</h2>
            <dl className="mt-4 divide-y divide-gold/50">
              {details.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-2.5 text-sm">
                  <dt className="shrink-0 text-maroon/60">{label}</dt>
                  <dd className="text-right font-semibold text-maroon">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {related.length > 0 && (
            <div className="rounded-3xl border border-gold/70 bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-maroon">Related Bhajans</h2>
                <Link to="/bhajans" className="text-sm font-semibold text-primary-dark hover:underline">View all</Link>
              </div>
              <ul className="mt-4 space-y-2">
                {related.map((other) => (
                  <li key={other.slug}>
                    <Link to={songPath(other)} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-cream">
                      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-dark text-white"><Music size={16} /></span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-maroon">{other.title}</span>
                        <span className="block text-xs text-maroon/60">{other.verseCount} verses</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <StayConnected />

      <section className="container-page py-12">
        <p className="inline-flex rounded-full bg-maroon px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">Browse by category</p>
        <h2 className="mt-3 font-heading text-3xl font-bold text-maroon">Explore More Categories</h2>
        <p className="mt-2 text-maroon/75">Find more bhajans grouped by devotional theme.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category, i) => (
            <CollectionTile key={category.slug} to={`/bhajans/categories/${category.slug}`} title={category.name} subtitle={`${category.count} Songs`} gradient={gradientAt(i + 3)} className="min-h-32 sm:min-h-36" />
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-gold/70 bg-cream p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-primary-dark">Extend your support</p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-maroon sm:text-3xl">Be a Part of Building Gupt Vrindavan Dham</h2>
            <p className="mt-2 max-w-2xl text-maroon/75">Your support helps temple construction, Gau Seva, Annadaan Seva, cultural education and devotional programmes.</p>
          </div>
          <Link to="/donate" className="btn-primary shrink-0">Donate now <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
