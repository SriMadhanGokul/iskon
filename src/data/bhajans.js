// Bhajan library, mirrored from guptvrindavandham.org/bhajans. bhajans.json holds song metadata only
// (title, composer, categories, moods, languages, verse count, source). Lyrics, translations and
// audio are not included yet: song pages show placeholders until the temple provides them.
import data from './bhajans.json';

export const WHATSAPP_CHANNEL = 'https://whatsapp.com/channel/0029Va5CMU93WHTe78tVfG37';

export const LANGUAGE_NAMES = { en: 'English', hi: 'Hindi', ne: 'Nepali', te: 'Telugu' };

// Tile gradients used on the live site, cycled across mood, category and festival tiles.
export const TILE_GRADIENTS = [
  'from-[#8B6FE8] to-[#5B3FB1]',
  'from-[#E0A94A] to-[#B8792A]',
  'from-[#4CAF7D] to-[#2C7350]',
  'from-[#E8734A] to-[#C2452B]',
  'from-[#9B7FE0] to-[#6B4CFD]',
  'from-[#4FA89A] to-[#2C6F66]',
  'from-[#6A8BE0] to-[#3F5BB8]',
  'from-[#7B5BE0] to-[#5A2FB0]',
];

export const SONGS = data.songs;
export const SONG_BY_SLUG = Object.fromEntries(SONGS.map((song) => [song.slug, song]));
export const MOODS = data.moods;
export const CATEGORIES = data.categories;
export const AUTHORS = data.authors;
export const FESTIVALS = data.festivals;
export const HOME = {
  heroTabs: data.hero.tabs.map((tab) => tab.trim()),
  templeRhythm: data.templeRhythm,
  featuredMonth: data.featuredMonth,
  featuredSongs: data.featuredSongs.map((slug) => SONG_BY_SLUG[slug]).filter(Boolean),
  homeAuthors: data.homeAuthors,
};

const bySlug = (list) => Object.fromEntries(list.map((item) => [item.slug, item]));
const MOOD_BY_SLUG = bySlug(MOODS);
const CATEGORY_BY_SLUG = bySlug(CATEGORIES);
const AUTHOR_BY_SLUG = bySlug(AUTHORS);
const FESTIVAL_BY_SLUG = bySlug(FESTIVALS);

// One entry per kind of collection page: /bhajans/<path>/<slug>.
export const COLLECTION_TYPES = {
  moods: { label: 'Mood', find: (slug) => MOOD_BY_SLUG[slug], songs: (slug) => SONGS.filter((song) => song.moods.includes(slug)) },
  categories: { label: 'Category', find: (slug) => CATEGORY_BY_SLUG[slug], songs: (slug) => SONGS.filter((song) => song.categories.includes(slug)) },
  authors: { label: 'Author', find: (slug) => AUTHOR_BY_SLUG[slug], songs: (slug) => SONGS.filter((song) => song.authorSlug === slug) },
  festivals: { label: 'Festival collection', find: (slug) => FESTIVAL_BY_SLUG[slug], songs: (slug) => (FESTIVAL_BY_SLUG[slug]?.songs ?? []).map((s) => SONG_BY_SLUG[s]).filter(Boolean) },
};

export const categoryName = (slug) => CATEGORY_BY_SLUG[slug]?.name ?? slug;
export const moodName = (slug) => MOOD_BY_SLUG[slug]?.name ?? slug;
export const songPath = (song) => `/bhajans/${song.slug}`;
export const gradientAt = (i) => TILE_GRADIENTS[i % TILE_GRADIENTS.length];

// Search matches the title, composer, source, category names and mood names.
const haystack = Object.fromEntries(SONGS.map((song) => [song.slug, [
  song.title, song.author, song.source, ...song.categories.map(categoryName), ...song.moods.map(moodName),
].filter(Boolean).join(' ').toLowerCase()]));

export function searchSongs(query, songs = SONGS) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return songs;
  return songs.filter((song) => words.every((word) => haystack[song.slug].includes(word)));
}

// Songs sharing the most categories and moods with this one, best matches first.
export function relatedSongs(song, count = 6) {
  const score = (other) =>
    other.categories.filter((c) => song.categories.includes(c)).length * 2
    + other.moods.filter((m) => song.moods.includes(m)).length
    + (other.authorSlug && other.authorSlug === song.authorSlug ? 1 : 0);
  return SONGS.filter((other) => other.slug !== song.slug)
    .map((other) => [score(other), other])
    .filter(([s]) => s > 0)
    .sort((a, b) => b[0] - a[0])
    .slice(0, count)
    .map(([, other]) => other);
}
