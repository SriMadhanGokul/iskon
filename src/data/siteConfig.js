// Every editable value lives here. Values starting with "TO BE FILLED" are
// placeholders the temple must confirm. Nothing here is invented.
export const PLACEHOLDER = 'TO BE FILLED BY TEMPLE';
export const isFilled = (v) => Boolean(v) && !String(v).startsWith('TO BE FILLED');

const siteConfig = {
  name: 'Gupt Vrindavan Dham',
  brandName: 'Hare Krishna',
  tagline: "Rajasthan's Biggest Krishna Temple",
  contact: {
    phone: '+91-97999 99881',
    phoneHref: '+919799999881',
    whatsapp: '919799999881', // digits only, country code first. Confirm with temple.
    email: 'info@guptvrindavandham.org',
    address: 'C6-C11, Mahal Scheme, Goner Road, Jagatpura, Jaipur-302017',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Gupt+Vrindavan+Dham+Jagatpura+Jaipur',
  },
  social: { youtube: '', instagram: '', facebook: '', x: '' }, // full URLs; empty ones are hidden
  // Floating "Hare Krishna" WhatsApp button in the bottom-right corner. Change `number` when the
  // contact person changes (digits only, country code first), or set `link` to any full URL
  // (e.g. a WhatsApp channel or group invite), which then takes priority over the number.
  whatsappButton: {
    label: 'Hare Krishna',
    number: '919799999881',
    message: 'Hare Krishna! I would like to know more about Gupt Vrindavan Dham.',
    link: '',
  },
  openingDate: '2027-05-12T00:00:00+05:30',
  donation: {
    upi: { id: PLACEHOLDER, payeeName: 'Gupt Vrindavan Dham' },
    bank: { accountName: PLACEHOLDER, bankName: PLACEHOLDER, accountNumber: PLACEHOLDER, ifsc: PLACEHOLDER, branch: PLACEHOLDER },
    has80G: false, // set true ONLY after the temple confirms 80G status
    amounts: [501, 1100, 2100, 5100, 11000],
    // Impact lines per amount. Leave '' until the temple confirms real figures.
    impact: { 501: '', 1100: '', 2100: '', 5100: '', 11000: '' },
    // Seva pages, amounts and wording live in data/sevas.js.
  },
  stats: { sqftRaised: 82880, sqftTotal: 350000, lastUpdated: PLACEHOLDER },
  // Home-page notice board. Kartik dates follow the temple website's 2026 banner; confirm each year.
  announcements: [
    { tag: 'Kartik month', date: '26 Oct – 24 Nov', text: 'Offer a diya each day of this holy month through Deep Daan.', to: '/donate/festival' },
    { tag: 'Grand opening', date: '12 May 2027', text: 'The Dham is taking shape. Follow the countdown and plan your first visit.', to: '/visit' },
    { tag: 'Festival days', date: 'Ongoing', text: 'Darshan timings can change on festival days. Please call before you travel.', to: '/contact' },
  ],
  // Darshan open windows (IST, 24h) for the "Darshan open / closed" badge in the top bar. Confirm with temple.
  darshanHours: [['04:30', '13:00'], ['16:30', '20:30']],
  timings: [
    ['Mangala Aarti', '04:30 AM'], ['Shringar Darshan', '07:30 AM'], ['Bhagavatam Class', '08:15 AM'],
    ['Rajbhog Aarti', '12:00 PM'], ['Dhoop Aarti', '04:30 PM'], ['Sandhya Aarti', '07:00 PM'], ['Shayan Aarti', '08:15 PM'],
  ],
  images: {
    hero: '/images/temple-gate.webp',
    gitaBook: '/images/bhagavad-gita-book.webp',
    prasadamDistribution: '/images/prasadam-distribution.webp',
    mayapurRadhaKrishna: '/images/mayapur-radha-krishna.webp',
    vrindavanRadhaKrishna: '/images/vrindavan-radha-krishna.webp',
    laljiTempleRadhaKrishna: '/images/lalji-temple-radha-krishna.webp',
    about: '/images/prabhupada-samadhi.webp',
    gauSeva: '/images/vechur-cow.webp',
    garden: '/images/garden.webp',
    guestHouse: '/images/guest-house-room.webp',
    kirtan: '/images/kirtan.webp',
    prasadam: '/images/fruit-offering.webp',
  },
  imageCredits: {
    gitaBook: {
      title: 'Bhagavad Gita - The Song of God',
      author: 'Anna Monday',
      license: 'Public domain',
      licenseUrl: 'https://creativecommons.org/publicdomain/mark/1.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Bhagavad_Gita_-_The_Song_of_God.jpg',
    },
    prasadamDistribution: {
      title: 'Daily Free Prasadam Distribution at ISKCON Juhu',
      author: 'Rrbdgm',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Daily_Free_Prasadam_Distribution_at_ISKCON_Juhu.jpg',
    },
    hero: {
      title: 'Main gate of ISKCON, Mayapur 07102013',
      author: 'Joydeep',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Main_gate_of_ISKCON,_Mayapur_07102013.jpg',
    },
    mayapurRadhaKrishna: {
      title: 'New Mayapur Radha Krishna deities 05',
      author: 'Ilya Mauter',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      url: 'https://commons.wikimedia.org/wiki/File:New_Mayapur_Radha_Krishna_deities_05.jpg',
    },
    vrindavanRadhaKrishna: {
      title: 'Radha Krishna Vrindavan',
      author: 'Odisha1',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Radha_Krishna_Vrindavan.jpg',
    },
    laljiTempleRadhaKrishna: {
      title: 'Radha Krishna Idol, Lalji Temple, Kalna',
      author: 'Rangan Datta Wiki',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Radha_Krishna_Idol,_Lalji_Temple,_Kalna.jpg',
    },
    about: {
      title: 'Samadhi Mandir of Srila Prabhupada, Mayapur',
      author: 'Joydeep',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Samadhi_Mandir_of_Srila_Prabhupada,_Mayapur_07102013_04.jpg',
    },
    gauSeva: {
      title: 'Vechur Cow',
      author: 'Mullookkaaran',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Vechur_Cow.jpg',
    },
    garden: {
      title: 'Garden at ISKCON, Mayapur',
      author: 'Joydeep',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Garden_at_ISKCON,_Mayapur_07102013.jpg',
    },
    guestHouse: {
      title: 'Hotel Central - Room (II)',
      author: 'Fred Cherrygarden',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Hotel_Central_-_Room_(II).jpg',
    },
    kirtan: {
      title: 'Kirtan hare Krishna',
      author: 'Litan Paul',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Kirtan_hare_Krishna.jpg',
    },
    prasadam: {
      title: 'Fruit offering',
      author: 'Yuv103m',
      license: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Fruit_offering.jpg',
    },
  },
};
export default siteConfig;
