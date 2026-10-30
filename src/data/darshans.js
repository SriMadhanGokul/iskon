// Daily darshan photos for the gallery at /mandir/darshans, keyed by date (YYYY-MM-DD, India time)
// and then by darshan type. A date or type with no entry shows the "no images" message.
//
// PLACEHOLDERS: until the temple sends its own daily photos, the entries below reuse the
// Wikimedia Commons deity photos already in public/images/deity (Banke Bihari and Radha
// Syamasundar, Vrindavan). Replace them with the Dham's photos and the matching post links.

// The day's darshans in temple order, then festival darshans. Photos are filed under one of
// these ids; festival photos also carry the festival's name.
export const DARSHAN_TYPES = [
  { id: 'mangala', label: 'Mangala', note: 'Mangala aarti · early morning' },
  { id: 'shringar', label: 'Shringar', note: 'Daily adornment' },
  { id: 'bhog', label: 'Bhog', note: 'Morning bhog offering' },
  { id: 'rajbhog', label: 'Rajbhog', note: 'Rajbhog aarti · noon' },
  { id: 'dhoop', label: 'Dhoop', note: 'Dhoop aarti · afternoon' },
  { id: 'sandhya', label: 'Sandhya', note: 'Sandhya aarti · evening' },
  { id: 'shayan', label: 'Shayan', note: 'Shayan aarti · night' },
  { id: 'festival', label: 'Festival', note: 'Special festival darshan' },
];

export const DEFAULT_DARSHAN_TYPE = 'shringar';

// Festivals offered when filing a festival darshan. Uploaders can also type any other name.
export const FESTIVAL_DARSHANS = [
  'Janmashtami', 'Radhashtami', 'Kartik (Damodar Month)', 'Diwali', 'Govardhan Puja', 'Gaura Purnima',
  'Nityananda Trayodashi', 'Narasimha Chaturdashi', 'Rama Navami', 'Ratha Yatra', 'Gita Jayanti',
  'Vyasa Puja', 'Ekadashi',
];

const SAMPLE_PHOTOS = [
  { slug: 'radha-syamasundar', alt: 'Radha and Syamasundar deities, Vrindavan', postUrl: 'https://commons.wikimedia.org/wiki/File:Radha_Syamasundar_Vrindavan_Radhastami_2004.jpg', credit: 'Sahadeva, CC BY-SA 3.0' },
  { slug: 'banke-bihari-vrindavan', alt: 'Banke Bihari deity, Vrindavan', postUrl: 'https://commons.wikimedia.org/wiki/File:Banke_Bihari_Vrindavan.jpg', credit: 'Kridha20, CC BY-SA 4.0' },
  { slug: 'banke-bihari-40', alt: 'Banke Bihari deity, Vrindavan', postUrl: 'https://commons.wikimedia.org/wiki/File:Banke_bihari_(40).JPG', credit: 'Guptaele, CC BY-SA 4.0' },
  { slug: 'banke-bihari-42', alt: 'Banke Bihari deity, Vrindavan', postUrl: 'https://commons.wikimedia.org/wiki/File:Banke_bihari_(42).JPG', credit: 'Guptaele, CC BY-SA 4.0' },
  { slug: 'banke-bihari-484', alt: 'Banke Bihari deity, Vrindavan', postUrl: 'https://commons.wikimedia.org/wiki/File:Banke_bihari_(484).JPG', credit: 'Guptaele, CC BY-SA 4.0' },
  { slug: 'banke-bihari-50', alt: 'Banke Bihari deity, Vrindavan', postUrl: 'https://commons.wikimedia.org/wiki/File:Banke_bihari_(50).JPG', credit: 'Guptaele, CC BY-SA 4.0' },
].map(({ slug, ...rest }) => ({
  ...rest,
  id: slug,
  thumb: `/images/deity/${slug}-640.webp`,
  full: `/images/deity/${slug}-1280.webp`,
}));

// `count` photos starting at `start`, wrapping round the sample list.
const sample = (start, count) =>
  Array.from({ length: count }, (_, i) => SAMPLE_PHOTOS[(start + i) % SAMPLE_PHOTOS.length]);

export const DARSHAN_PHOTOS = {
  '2026-10-23': { shringar: sample(0, 4), mangala: sample(3, 2) },
  '2026-10-24': { shringar: sample(1, 5), mangala: sample(4, 3) },
  '2026-10-25': { shringar: sample(2, 3) },
  '2026-10-26': { shringar: sample(3, 6), mangala: sample(0, 2) },
  '2026-10-27': { shringar: sample(4, 4), mangala: sample(1, 3) },
  '2026-10-28': { shringar: sample(5, 5), mangala: sample(2, 2) },
  '2026-10-29': { shringar: sample(0, 6), mangala: sample(5, 3) },
};
