import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, LayoutGrid, List, Play, Search } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { COLLECTION_TYPES, searchSongs, songPath } from '../data/bhajans.js';
import { Avatar, Breadcrumb, SongCard, StayConnected } from '../components/BhajanParts.jsx';
import NotFound from './NotFound.jsx';

// One page for every song collection: /bhajans/moods/:slug, /categories/:slug, /authors/:slug
// and /festivals/:slug. Lists the songs with a search box and a list / grid view.
export default function BhajanCollection({ type }) {
  const { slug } = useParams();
  const config = COLLECTION_TYPES[type];
  const entity = config?.find(slug);
  const [query, setQuery] = useState('');
  const [view, setView] = useState('list');
  if (!entity) return <NotFound />;

  const songs = config.songs(slug);
  const visible = searchSongs(query, songs);

  return (
    <>
      <Helmet>
        <title>{entity.name} Bhajans – {siteConfig.brandName}</title>
        <meta name="description" content={entity.description || `${songs.length} bhajans in ${entity.name}.`} />
      </Helmet>

      <header className="relative overflow-hidden bg-gradient-to-br from-maroon via-[#6b2409] to-primary-dark text-white">
        <span aria-hidden="true" className="absolute -right-24 -top-24 h-96 w-96 rounded-full border-[40px] border-white/5" />
        <div className="container-page relative py-10 sm:py-14">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Bhajans', to: '/bhajans' }, { label: entity.name }]} />
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            {type === 'authors' && <Avatar name={entity.name} image={entity.image} className="h-28 w-28 sm:h-36 sm:w-36" />}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{config.label}</p>
              <h1 className="mt-2 font-heading text-4xl font-bold sm:text-5xl">{entity.name}</h1>
              <p className="mt-2 text-white/80">{songs.length} {songs.length === 1 ? 'Song' : 'Songs'}</p>
            </div>
          </div>
          {entity.description && <p className="mt-6 max-w-3xl leading-7 text-white/85">{entity.description}</p>}
        </div>
      </header>

      <section className="container-page py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full sm:max-w-md">
            <span className="sr-only">Search songs in {entity.name}</span>
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-maroon/50" aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search songs by title or composer…" className="min-h-12 w-full rounded-full border border-gold bg-white pl-11 pr-4 text-maroon shadow-soft outline-none focus:ring-2 focus:ring-primary" />
          </label>
          <div className="flex items-center justify-between gap-4">
            <p className="font-heading text-lg font-semibold text-maroon">Songs ({visible.length})</p>
            <div className="flex items-center gap-1 rounded-full border border-gold bg-white p-1" role="group" aria-label="View">
              {[['list', List], ['grid', LayoutGrid]].map(([mode, Icon]) => (
                <button key={mode} type="button" onClick={() => setView(mode)} aria-pressed={view === mode} aria-label={`${mode} view`} className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${view === mode ? 'bg-primary-dark text-white' : 'text-maroon hover:bg-cream'}`}>
                  <Icon size={17} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {visible.length === 0 && <p className="mt-8 rounded-2xl border border-dashed border-primary/40 bg-primary/5 px-6 py-10 text-center text-maroon/70">No songs match “{query.trim()}”.</p>}

        {visible.length > 0 && view === 'list' && (
          <div className="mt-6 overflow-hidden rounded-3xl border border-gold/70 bg-white shadow-soft">
            <div className="hidden grid-cols-[3rem_1fr_auto] gap-4 border-b border-gold/60 bg-primary/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-dark sm:grid">
              <span>#</span><span>Song title</span><span>Action</span>
            </div>
            <ol>
              {visible.map((song, i) => (
                <li key={song.slug} className="border-b border-gold/40 last:border-0">
                  <Link to={songPath(song)} className="group grid grid-cols-[2rem_1fr_auto] items-center gap-3 px-4 py-3.5 transition-colors hover:bg-cream sm:grid-cols-[3rem_1fr_auto] sm:gap-4 sm:px-5">
                    <span className="text-sm font-semibold text-maroon/50">{i + 1}</span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-maroon group-hover:text-primary-dark">{song.title}</span>
                        {song.featured && <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-dark">Featured</span>}
                      </span>
                      <span className="block text-sm text-maroon/60">{song.author} · {song.verseCount} {song.verseCount === 1 ? 'verse' : 'verses'}</span>
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-primary-dark">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 transition-colors group-hover:bg-primary-dark group-hover:text-white"><Play size={15} aria-hidden="true" /></span>
                      <ChevronRight size={16} className="hidden sm:block" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        )}

        {visible.length > 0 && view === 'grid' && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((song) => <SongCard key={song.slug} song={song} />)}
          </div>
        )}
      </section>

      <StayConnected />
    </>
  );
}
