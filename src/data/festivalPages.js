import siteConfig from './siteConfig.js';

// Full festival pages (banner, date, video, article, seva). A path listed here replaces the short
// festival guide for the same path in data/pages.js. Blocks use the same format as data/blogs.js.
// Dates and seva options come from the temple's own page; confirm them each year.

export const FESTIVAL_PAGES = [
  {
    path: '/festivals/govardhana-puja',
    crumb: 'Govardhana Puja',
    title: 'ISKCON Govardhan Puja: 10 November, 2026',
    metaTitle: 'ISKCON Govardhan Puja 2026: Date & Annakuta Festival',
    description: 'Celebrate ISKCON Govardhan Puja on 10 November 2026 with Annakuta offerings, Gau Puja, kirtan and seva at Gupt Vrindavan Dham.',
    date: '2026-11-10',
    banner: { src: siteConfig.images.hero, credit: siteConfig.imageCredits.hero },
    youtubeId: 'dd7QHnDGMSU',
    blocks: [
      { p: 'When fierce rains threatened Vrindavan, Lord Krishna lifted Govardhan Hill on His little finger and welcomed His devotees beneath its shelter. Govardhan Puja celebrates this loving protection and the faith of the residents of Vraja.' },
      { p: 'ISKCON Govardhan Puja brings this devotional spirit to life through Annakuta offerings, cow worship, beautiful darshan and joyful Hare Krishna kirtan. From preparing food for the Lord to sharing prasadam, every service offers a way to express gratitude to Krishna.' },
      { p: 'Govardhan Puja will be celebrated on **Tuesday, 10 November 2026**. Join the festivities at Gupt Vrindavan Dham, Jaipur, with your family, offer prayers to Sri Giriraj and participate through worship and seva.' },

      { h2: 'When Is ISKCON Govardhan Puja in 2026?' },
      { p: 'According to the [ISKCON Bangalore Vaishnava Calendar](https://www.iskconbangalore.org/vaishnava-calendar/), Govardhan Puja falls on Tuesday, 10 November 2026.' },
      { p: 'The festival is observed during the holy month of [Kartika](/blogs/kartik-maas), following [Diwali](/blogs/diwali-celebration). Devotees worship Sri Giriraj, offer Annakuta bhoga and remember Lord Krishna’s protection of the residents of Vrindavan.' },

      { h2: 'What Is Govardhan Puja?' },
      { p: 'Govardhan Puja honours Sri Giriraj Govardhan and remembers Lord Krishna’s loving protection of His devotees.' },
      { p: 'Krishna instructed the residents of Vraja to worship Govardhan Hill, the cows and the brahmanas. Following His guidance, they prepared abundant food offerings, fed the cows and walked around the hill in devotion.' },
      { p: 'When Indra responded with devastating rain, Krishna lifted the hill and sheltered the entire community for seven days. This beloved Govardhan Lila is described in the Tenth Canto of the Srimad-Bhagavatam.' },
      { p: 'The annual celebration continues the spirit of that original offering through worship, cow service and the sharing of prasadam.' },

      { h2: 'How Is Govardhan Puja Celebrated in ISKCON?' },
      { p: 'ISKCON temples celebrate Govardhan Puja with offerings to the Lord, worship of the cows, kirtan and prasadam distribution. The arrangements vary from temple to temple, while loving service to Krishna remains at the heart of the festival.' },
      { h3: 'Annakuta Offering' },
      { p: 'Annakuta means “a mountain of food.” Devotees prepare many varieties of food and arrange them in the form of a hill as an offering to the Lord.' },
      { p: 'Rice, dal, vegetables, puris, halwa, sweet rice and milk sweets are among the preparations offered. Families and temple volunteers come together to cook, arrange and present the feast with care.' },
      { p: 'Each preparation becomes part of a collective offering made for Krishna’s pleasure. This abundant feast gives the celebration its other familiar name, the Annakuta Festival.' },
      { h3: 'Go Puja and Cow Service' },
      { p: 'Krishna’s life in Vrindavan is closely connected with the cows. As Gopala, He is their protector, and caring for them is an important part of Govardhan Puja.' },
      { p: 'During Go Puja, cows are decorated, honoured with worship and fed. Devotees can carry this spirit beyond the festival by [supporting their daily nourishment, shelter and care](/donate/gau).' },
      { h3: 'Giridhari Darshan' },
      { p: 'Krishna is lovingly known as Giridhari, the lifter of Govardhan Hill. Special Giridhari decorations recall the Lord holding the hill above His devotees.' },
      { p: 'This darshan helps worshippers remember Krishna’s affection for the residents of Vraja, who approached Him as their dearest shelter.' },
      { h3: 'Kirtan, Arati and Parikrama' },
      { p: 'Hare Krishna kirtan fills the celebration with the chanting of the Lord’s holy names. Devotees offer arati, hear Krishna’s pastimes and glorify Sri Giriraj through devotional prayers.' },
      { p: 'Circumambulation, or parikrama, follows the example of the residents of Vraja, who walked around Govardhan after making their offerings.' },
      { h3: 'Prasadam Distribution' },
      { p: 'After offering the food to the Lord, it is distributed as prasadam.' },
      { p: 'Sharing the Annakuta feast brings devotees and visitors together, allowing everyone to receive and honour the food offered to Krishna.' },

      { h2: 'Govardhan Puja Celebration at Gupt Vrindavan Dham, Jaipur' },
      { p: 'Experience the joy of Govardhan Puja through darshan, worship and the association of devotees at Gupt Vrindavan Dham.' },
      { p: 'The temple’s celebration includes Lord Krishna’s Giridhari decoration, worship of a representation of Govardhan Hill, Go Puja and Hare Krishna maha-mantra kirtan. Devotees also sing the Damodarashtakam during this sacred Kartika observance.' },
      { p: 'Varieties of food are offered to the Lord and shared with visitors as Annakuta prasadam.' },
      { p: 'Come with your family to take [darshan](/darshan), chant with devotees and offer your gratitude to Sri Krishna.' },

      { h2: 'Participate in Govardhan Puja Through Seva' },
      { p: 'Serving during the festival is a meaningful way to participate in the celebration. You can support food offerings, cow service and the arrangements made for the Lord.' },
    ],
    // Shown as cards after the article; `to` is optional and points at an existing seva page.
    sevas: [
      { label: 'Govardhan Seva' },
      { label: 'Gau Seva', to: '/donate/gau' },
      { label: '56 Bhog Seva' },
      { label: 'Annakoot Seva', to: '/donate/anna' },
      { label: 'Alankar Seva' },
    ],
    sevaNote: 'Choose an offering according to your capacity and present it with devotion.',
    sevaCta: { label: 'Offer Govardhan Puja seva', to: '/donate' },
  },
];

export const FESTIVAL_PAGE_BY_PATH = Object.fromEntries(FESTIVAL_PAGES.map((page) => [page.path, page]));
