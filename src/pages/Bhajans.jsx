import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Music, Play, Sparkles } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { AUTHORS, CATEGORIES, FESTIVALS, HOME, MOODS, SONG_BY_SLUG, gradientAt, songPath } from '../data/bhajans.js';
import { Avatar, BhajanSearch, CollectionTile, SectionHeading, SongCard, StayConnected } from '../components/BhajanParts.jsx';

const ALL = 'All';
const CATEGORY_BY_NAME = Object.fromEntries(CATEGORIES.map((c) => [c.name.trim().toLowerCase(), c]));

// Category tabs under the search box. "All" shows the featured songs.
function CategoryTabs() {
  const [tab, setTab] = useState(ALL);
  const category = CATEGORY_BY_NAME[tab.toLowerCase()];
  const songs = category
    ? Object.values(SONG_BY_SLUG).filter((song) => song.categories.includes(category.slug)).slice(0, 12)
    : HOME.featuredSongs;

  return (
    <div className="mt-8">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]" role="tablist" aria-label="Browse by category">
        {HOME.heroTabs.filter((name) => name === ALL || CATEGORY_BY_NAME[name.toLowerCase()]).map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={tab === name}
            onClick={() => setTab(name)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${tab === name ? 'border-primary-dark bg-primary-dark text-white' : 'border-gold bg-white text-maroon hover:bg-cream'}`}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {songs.map((song) => <SongCard key={song.slug} song={song} />)}
      </div>
      {category && (
        <Link to={`/bhajans/categories/${category.slug}`} className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary-dark hover:underline">
          View all {category.count} songs in {category.name} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

// Horizontal row of cards with arrow buttons.
function Carousel({ label, children }) {
  const track = useRef(null);
  const scroll = (dir) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <div className="relative">
      <div className="absolute -top-16 right-0 hidden gap-2 sm:flex">
        <button type="button" onClick={() => scroll(-1)} aria-label={`Previous ${label}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-dark/40 bg-white text-primary-dark hover:bg-cream"><ChevronLeft size={20} aria-hidden="true" /></button>
        <button type="button" onClick={() => scroll(1)} aria-label={`Next ${label}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-dark text-white hover:bg-maroon"><ChevronRight size={20} aria-hidden="true" /></button>
      </div>
      <div ref={track} className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">{children}</div>
    </div>
  );
}

export default function Bhajans() {
  const [allAuthors, setAllAuthors] = useState(false);
  const featured = SONG_BY_SLUG[HOME.featuredMonth.song];
  const authors = allAuthors ? AUTHORS : HOME.homeAuthors.map((slug) => AUTHORS.find((a) => a.slug === slug)).filter(Boolean);

  return (
    <>
      <Helmet>
        <title>Vaishnava Bhajans – {siteConfig.brandName}</title>
        <meta name="description" content="A collection of Vaishnava aartis, bhajans and prayers by the Acharyas, organised by mood, composer and festival." />
      </Helmet>

      <section className="bg-gradient-to-b from-primary/25 via-cream/70 to-transparent">
        <div className="container-page py-12 text-center sm:py-16">
          <p className="inline-flex rounded-full bg-maroon px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">Gaudiya Vaishnava songs</p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-maroon sm:text-6xl">Vaishnava Bhajans</h1>
          <p className="mx-auto mt-4 max-w-2xl text-maroon/80">A collection of Vaishnava aartis, bhajans and popular prayers by the Acharyas.</p>
          <BhajanSearch className="mx-auto mt-8 max-w-2xl" />
          <div className="text-left"><CategoryTabs /></div>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading badge="Temple rhythm" title={HOME.templeRhythm.title} text={HOME.templeRhythm.description} />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {HOME.templeRhythm.songs.map((slug, i) => {
            const song = SONG_BY_SLUG[slug];
            return (
              <Link key={slug} to={songPath(song)} className={`group flex min-h-28 items-end rounded-2xl bg-gradient-to-br p-4 text-white shadow-soft transition-transform hover:-translate-y-1 ${gradientAt(i)}`}>
                <span className="font-semibold leading-snug">{song.title}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {featured && (
        <section className="container-page py-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-maroon to-primary-dark px-6 py-10 text-white sm:px-12 sm:py-14">
            <span aria-hidden="true" className="absolute -right-16 -top-16 h-72 w-72 rounded-full border-[30px] border-white/10" />
            <p className="relative inline-flex rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">Featured this month</p>
            <h2 className="relative mt-4 font-heading text-3xl font-bold sm:text-5xl">{HOME.featuredMonth.title}</h2>
            <p className="relative mt-3 max-w-xl text-white/85">{HOME.featuredMonth.description}</p>
            <Link to={songPath(featured)} className="relative mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-primary-dark transition-transform hover:scale-105"><Play size={16} aria-hidden="true" /> Read now</Link>
          </div>
        </section>
      )}

      <section className="container-page py-12">
        <SectionHeading badge="Browse by category" title="Songs for Your Soul" text="Find the right bhajan for how you feel, whatever your mood or moment." />
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {MOODS.map((mood, i) => (
            <CollectionTile key={mood.slug} to={`/bhajans/moods/${mood.slug}`} title={mood.name} subtitle={`${mood.count} Songs`} gradient={gradientAt(i)} icon={Sparkles} />
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading badge="Vaishnava Acharyas" title="Vani of the Acharyas" text="Listen to popular bhajans sung by the great Gaudiya Vaishnava Acharyas." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <div key={author.slug} className="flex items-center gap-4 rounded-2xl border border-gold/70 bg-white p-5 shadow-soft">
              <Avatar name={author.name} image={author.image} />
              <div className="min-w-0">
                <p className="font-semibold text-maroon">{author.name}</p>
                <p className="text-sm text-maroon/65">{author.count} {author.count === 1 ? 'Song' : 'Songs'}</p>
                <Link to={`/bhajans/authors/${author.slug}`} className="mt-3 inline-flex rounded-full border border-primary-dark/50 px-5 py-1.5 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary-dark hover:text-white">Explore</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button type="button" onClick={() => setAllAuthors((v) => !v)} className="btn-outline">{allAuthors ? 'Show fewer composers' : `Show all ${AUTHORS.length} composers`}</button>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading badge="Browse by trends" title="Featured Songs" />
        <div className="mt-8">
          <Carousel label="featured songs">
            {HOME.featuredSongs.map((song, i) => (
              <div key={song.slug} className={`relative flex min-h-64 w-[85%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white sm:w-[48%] sm:p-8 ${gradientAt(i)}`}>
                <span aria-hidden="true" className="absolute -right-10 -top-10 h-48 w-48 rounded-full border-[24px] border-white/10" />
                <p className="relative w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">Today’s recommended</p>
                <h3 className="relative mt-3 font-heading text-2xl font-bold sm:text-3xl">{song.title}</h3>
                <p className="relative mt-1 text-white/85">{song.author}</p>
                <Link to={songPath(song)} className="relative mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary-dark transition-transform hover:scale-105"><Play size={15} aria-hidden="true" /> Listen now</Link>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading badge="Festival collections" title="Bhajans for Every Festival" text="Celebrate each sacred day with bhajans composed for that very occasion.">
          <Link to="/festivals" className="btn-outline shrink-0"><CalendarDays size={16} aria-hidden="true" /> Festival calendar</Link>
        </SectionHeading>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {FESTIVALS.map((festival, i) => (
            <CollectionTile key={festival.slug} to={`/bhajans/festivals/${festival.slug}`} title={festival.name} subtitle={`Collection · ${festival.songs.length} ${festival.songs.length === 1 ? 'song' : 'songs'}`} gradient={gradientAt(i)} icon={CalendarDays} />
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading badge="All categories" title="Explore by Theme" text="Every bhajan grouped by the devotional theme it belongs to." />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((category, i) => (
            <CollectionTile key={category.slug} to={`/bhajans/categories/${category.slug}`} title={category.name} subtitle={`${category.count} Songs`} gradient={gradientAt(i + 3)} icon={Music} className="min-h-32 sm:min-h-36" />
          ))}
        </div>
      </section>

      <StayConnected />
    </>
  );
}
