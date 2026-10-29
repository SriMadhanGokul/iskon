// Home-page banner slides (the peek carousel at the top of the home page). Each banner is a
// poster in public/banners, and the whole banner is the link: `to` for an internal route, or
// `href` for an external one. `title` is read out to screen readers in place of the poster text.
// Posters without button artwork get a coded button from `cta`: its label and where it sits.
// `focus` is the object-position used when the poster's shape differs from the 3:2 slide.
export const BANNER_SLIDES = [
  { id: 'kartik', title: 'Kartik Month, 26 Oct to 24 Nov. Learn more', image: '/banners/kartik.webp', to: '/blogs/kartik-maas', cta: { label: 'Learn More', position: 'left-[6%] bottom-[6%]' } },
  { id: 'diwali', title: 'Diwali. Learn more', image: '/banners/diwali.webp', to: '/blogs/diwali-celebration', cta: { label: 'Learn More', position: 'right-[6%] bottom-[6%]' } },
  { id: 'govardhan', title: 'Govardhan Puja. Learn more', image: '/banners/govardhan-puja.webp', to: '/festivals/govardhana-puja', focus: '50% 15%', cta: { label: 'Learn More', position: 'left-[8%] bottom-[6%]' } },
  { id: 'bhajan', title: 'Vaishnav Bhajan, explore by mood and moment', image: '/banners/vaishnav-bhajan.webp', to: '/bhajans', cta: { label: 'Explore Now', position: 'right-[6%] bottom-[8%]' } },
  { id: 'dresses', title: 'Look at them, let them look at you. Explore dresses', image: '/banners/deity-dresses.webp', to: '/mandir/darshans', cta: { label: 'Explore Dresses', position: 'left-1/2 -translate-x-1/2 bottom-[5%]', serif: true } },
  { id: 'shila-pujan', title: 'Shila Pujan of Sri Sri Radha Shyamsundar by Chief Minister Shri Bhajanlal Sharma', image: '/banners/shila-pujan.webp', to: '/blogs/cm-bhajan-lal-sharma-performed-shila-pujan' },
  { id: 'akshaya-patra', title: 'Hon’ble President Droupadi Murmu commemorates Akshaya Patra’s 5 Billion Meals milestone. Learn more', image: '/banners/akshaya-patra-5-billion.webp', to: '/blogs/akshaya-patra-5-billion-meals' },
  { id: 'whatsapp', title: 'Join the Gupt Vrindavan Dham WhatsApp channel for updates on events and festivals', image: '/banners/whatsapp-channel.webp', href: 'https://whatsapp.com/channel/0029Va5CMU93WHTe78tVfG37' },
];
