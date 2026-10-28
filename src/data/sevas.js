import siteConfig from './siteConfig.js';

// One entry per seva: the /donate card and the /donate/<id> page are both built from this.
// Option labels and amounts are the temple's to set. Keep labels free of quantities
// (e.g. "25 meals") until the temple confirms what each amount provides.

const photo = (key, alt) => ({ src: siteConfig.images[key], alt, credit: siteConfig.imageCredits[key] });

const tiers = (label, amounts) => amounts.map((amount) => ({ label, amount }));

export const DIYA_PRICE = 11;

export const SEVAS = [
  {
    id: 'festival',
    title: 'Deep Daan · Kartik Seva',
    subtitle: 'Light a Lamp for Damodara',
    summary: 'Offer ghee lamps to Lord Damodara during the holy month of Kartik.',
    badge: 'Kartik · 26 Oct – 24 Nov',
    body: 'Kartik is the month most dear to Lord Damodara. Devotees offer ghee lamps each evening while singing the Damodarastakam, remembering how mother Yashoda bound child Krishna with ropes of love. Your offering lights lamps on your behalf and supports the festival programmes at the Dham.',
    gallery: [photo('kirtan', 'Hare Krishna devotees taking part in kirtan'), photo('prasadam', 'Fruit arranged as a devotional offering')],
    options: [30, 51, 108, 251, 501, 1008].map((n) => ({ label: `Offer ${n} diyas`, amount: n * DIYA_PRICE })),
  },
  {
    id: 'anna',
    title: 'Anna Daan Seva',
    subtitle: 'Share the Joy of Giving',
    summary: 'Offering sanctified food is honoured in the Vedic tradition as one of the highest gifts.',
    body: 'Anna Daan, the gift of food, is honoured in the Vedic tradition as maha-daan, a great gift. Food first offered to Lord Krishna becomes prasadam, and sharing it with visitors and the community nourishes both body and heart. Your seva helps prepare and serve prasadam at the Dham.',
    gallery: [photo('prasadam', 'Fruit arranged as a devotional offering'), photo('kirtan', 'Hare Krishna devotees taking part in kirtan')],
    options: tiers('Anna Daan seva', [501, 1100, 2100, 5100, 11000, 21000, 51000, 108000]),
  },
  {
    id: 'gau',
    title: 'Gau Seva',
    subtitle: 'Serve Mother Cow',
    summary: 'Help care for the cows that are so dear to Lord Gopala.',
    body: 'Lord Krishna, who spent His childhood tending cows in Vrindavan, is known as Gopala, the protector of cows. Gau Seva supports feeding, shelter and gentle care for the cows connected with the Dham.',
    gallery: [photo('gauSeva', 'Vechur cow photographed in India'), photo('garden', 'Garden at ISKCON Mayapur')],
    options: tiers('Gau Seva', [501, 1100, 2100, 5100, 11000, 21000, 51000]),
  },
  {
    id: 'sqft',
    title: 'Square Feet Seva',
    subtitle: 'Build a Home for the Lord',
    summary: 'Contribute toward the square feet of the temple and cultural centre.',
    body: 'Gupt Vrindavan Dham is planned across about 3.5 lakh square feet in Jagatpura, Jaipur. Square Feet Seva lets each family take part in building the temple, one portion at a time, for generations of devotees to come.',
    gallery: [photo('hero', 'Main gate of an ISKCON temple in Mayapur, shown as representative architecture'), photo('garden', 'Garden at ISKCON Mayapur')],
    options: tiers('Square Feet Seva', [1100, 2100, 5100, 11000, 21000, 51000, 108000]),
  },
  {
    id: 'construction',
    title: 'Temple Construction',
    subtitle: 'Serve the Lord, Share the Mercy',
    summary: 'Support the construction of the temple, its halls and facilities for visitors.',
    body: 'Every brick offered to the Lord becomes a lasting service. Contributions to temple construction help complete the halls, gardens and facilities where visitors will gather for darshan, kirtan and learning.',
    gallery: [photo('hero', 'Main gate of an ISKCON temple in Mayapur, shown as representative architecture'), photo('about', 'Samadhi Mandir of Srila Prabhupada in Mayapur')],
    options: tiers('Construction seva', [1100, 2100, 5100, 11000, 21000, 51000, 108000]),
  },
  {
    id: 'general',
    title: 'General Donation',
    subtitle: 'Wherever the Need is Greatest',
    summary: 'Support the daily worship, programmes and service of the Dham.',
    body: 'A general donation lets the temple direct your offering where it is needed most, from daily deity worship and festivals to education and community service.',
    gallery: [photo('about', 'Samadhi Mandir of Srila Prabhupada in Mayapur'), photo('kirtan', 'Hare Krishna devotees taking part in kirtan')],
    options: tiers('General donation', [501, 1100, 2100, 5100, 11000, 21000]),
  },
];

export const SEVA_BY_ID = Object.fromEntries(SEVAS.map((s) => [s.id, s]));

// Short summaries in our own words, with the verse to look up.
export const SCRIPTURE = [
  { ref: 'Bhagavad Gita 18.5', text: 'Sacrifice, charity and austerity should never be given up; performed rightly, they purify even the wise.' },
  { ref: 'Bhagavad Gita 17.20', text: 'Charity given out of duty, at the right time and place, to a worthy cause and without expecting a return, is charity in goodness.' },
  { ref: 'Bhagavad Gita 9.26', text: 'The Lord accepts even a leaf, a flower, a fruit or a little water when it is offered with love and devotion.' },
  { ref: 'Srimad Bhagavatam 10.22.35', text: 'A life is made fruitful by using one’s life, wealth, intelligence and words for the welfare of others.' },
];

export const inr = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`;
