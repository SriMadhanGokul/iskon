// Every editable value lives here. Values starting with "TO BE FILLED" are
// placeholders the temple must confirm. Nothing here is invented.
export const PLACEHOLDER = 'TO BE FILLED BY TEMPLE';
export const isFilled = (v) => Boolean(v) && !String(v).startsWith('TO BE FILLED');

const siteConfig = {
  name: 'Gupt Vrindavan Dham',
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
  openingDate: '2027-05-12T00:00:00+05:30',
  donation: {
    onlinePortal: 'https://donation.guptvrindavandham.org',
    upi: { id: PLACEHOLDER, payeeName: 'Gupt Vrindavan Dham' },
    bank: { accountName: PLACEHOLDER, bankName: PLACEHOLDER, accountNumber: PLACEHOLDER, ifsc: PLACEHOLDER, branch: PLACEHOLDER },
    has80G: false, // set true ONLY after the temple confirms 80G status
    amounts: [501, 1100, 2100, 5100, 11000],
    // Impact lines per amount. Leave '' until the temple confirms real figures.
    impact: { 501: '', 1100: '', 2100: '', 5100: '', 11000: '' },
    sevas: [
      { id: 'sqft', label: 'Square Feet Seva' },
      { id: 'anna', label: 'Anna Daan (food distribution)' },
      { id: 'gau', label: 'Gau Seva' },
      { id: 'construction', label: 'Temple Construction' },
      { id: 'festival', label: 'Festival Seva' },
      { id: 'general', label: 'General Donation' },
    ],
  },
  stats: { sqftRaised: 82880, sqftTotal: 350000, lastUpdated: PLACEHOLDER },
  timings: [
    ['Mangala Aarti', '04:30 AM'], ['Shringar Darshan', '07:30 AM'], ['Bhagavatam Class', '08:15 AM'],
    ['Rajbhog Aarti', '12:00 PM'], ['Dhoop Aarti', '04:30 PM'], ['Sandhya Aarti', '07:00 PM'], ['Shayan Aarti', '08:15 PM'],
  ],
  images: {
    hero: '/images/temple-gate.webp',
    about: '/images/prabhupada-samadhi.webp',
    gauSeva: '/images/vechur-cow.webp',
    garden: '/images/garden.webp',
    kirtan: '/images/kirtan.webp',
    prasadam: '/images/fruit-offering.webp',
  },
  imageCredits: {
    hero: {
      title: 'Main gate of ISKCON, Mayapur 07102013',
      author: 'Joydeep',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      url: 'https://commons.wikimedia.org/wiki/File:Main_gate_of_ISKCON,_Mayapur_07102013.jpg',
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
