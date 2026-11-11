import { parse as parseYaml } from 'yaml';
import imagesYaml from '../../images.yml?raw';

const SITE_IMAGES = parseYaml(imagesYaml).images as Record<string, string>;

export interface PhilosophyItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: 'Flame' | 'Dumbbell' | 'Target' | 'Scale';
}

export interface ExerciseStep {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  cue: string;
}

export interface WorkoutItem {
  id: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'All Levels' | 'Advanced';
  duration: string;
  description: string;
  image: string;
  equipment: string;
  focusAreas: string[];
  warmup: string[];
  exercises: ExerciseStep[];
  cooldown: string[];
  workoutUrl?: string;
}

export interface ResourceSection {
  heading: string;
  points: string[];
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  readTime: string;
  format: string;
  description: string;
  image: string;
  downloadUrl?: string;
  keyTakeaways: string[];
  sections: ResourceSection[];
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  embedUrl: string;
  thumbnail: string;
  keyPoints: string[];
}

export interface SocialPost {
  id: string;
  caption: string;
  category: string;
  image: string;
  permalink: string;
  aspectRatio: 'square' | 'portrait';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  verifiedContext: string;
  isPlaceholder: boolean;
  avatarPlaceholder?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  instagramUsername: string;
  instagramUrl: string;
  instagramDmUrl: string;
  locationLabel: string;
  accentColor: string;
  hero: {
    headlineLine1: string;
    headlineLine2: string;
    supportingText: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    credibilityText: string;
    heroImage: string;
    profileImage: string;
    useProfilePlaceholderBadge: boolean;
  };
  about: {
    heading: string;
    subheadline: string;
    aboutImage: string;
    usePlaceholderBadge: boolean;
    whoSheIs: string;
    approachToFitness: string;
    whatMotivatesHer: string;
    whatPeopleCanLearn: string;
    consistencyPhilosophy: string;
    ctaText: string;
  };
  philosophy: PhilosophyItem[];
  workouts: WorkoutItem[];
  resources: ResourceItem[];
  featuredVideo: {
    heading: string;
    subheading: string;
    ctaText: string;
    primaryVideo: VideoItem;
    additionalVideos: VideoItem[];
  };
  socialGallery: {
    heading: string;
    subheading: string;
    ctaText: string;
    posts: SocialPost[];
  };
  testimonials: {
    heading: string;
    subheading: string;
    disclaimerNote: string;
    items: TestimonialItem[];
  };
  faq: FaqItem[];
  contact: {
    heading: string;
    supportingText: string;
    primaryCtaText: string;
    secondaryCtaText: string;
    goalOptions: string[];
  };
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: 'SEHRISH WELLNESS',
  tagline: 'Postpartum Recovery · Strength · Wellbeing',
  instagramUsername: '@sehrish.mall',
  instagramUrl: 'https://www.instagram.com/sehrish.mall/',
  instagramDmUrl: 'https://ig.me/m/sehrish.mall',
  locationLabel: 'Digital Training & Resource Hub',
  accentColor: '#546B5A',
  hero: {
    headlineLine1: 'YOUR BODY.',
    headlineLine2: 'STRONGER, IN TIME.',
    supportingText:
      'A gentler, informed approach to rebuilding strength, reconnecting with your body and finding confidence after childbirth — at your pace.',
    primaryCtaText: 'START YOUR JOURNEY',
    secondaryCtaText: 'EXPLORE WORKOUTS',
    credibilityText: 'POSTPARTUM WELLNESS · MOVEMENT · STRENGTH',
    heroImage: SITE_IMAGES.hero,
    profileImage: SITE_IMAGES.portrait,
    useProfilePlaceholderBadge: false,
  },
  about: {
    heading: 'A LITTLE ABOUT SEHRISH',
    subheadline: 'A supportive space for mothers who are ready to reconnect with movement, rebuild confidence and feel at home in their changing bodies.',
    aboutImage: SITE_IMAGES.portrait,
    usePlaceholderBadge: false,
    whoSheIs:
      'Sehrish creates a welcoming training space for women navigating the changes that come with motherhood. Her focus is encouragement, thoughtful movement and helping each woman feel seen rather than judged.',
    approachToFitness:
      'Postpartum recovery is individual. Sessions should begin only when a woman is medically ready, with exercise choices and progression shaped by her birth experience, symptoms and guidance from her healthcare team.',
    whatMotivatesHer:
      'Helping mothers make room for their own wellbeing, without pressure to rush recovery or meet someone else’s timeline.',
    whatPeopleCanLearn:
      'Explore gentle movement, breathing and body awareness, gradual strength foundations, practical recovery habits and when to seek support from a pelvic-health or medical professional.',
    consistencyPhilosophy:
      'There is no deadline for feeling like yourself again. Rest, recovery, feeding your baby, medical care and everyday life all count. Progress should feel supportive, never punishing.',
    ctaText: 'LEARN MORE',
  },
  philosophy: [
    {
      id: 'phil-1',
      number: '01',
      title: 'CONSISTENCY',
      description:
        'Sustainable routines always outperform temporary intensity. Showing up regularly with focus creates lasting physical and mental momentum.',
      iconName: 'Flame',
    },
    {
      id: 'phil-2',
      number: '02',
      title: 'STRENGTH',
      description:
        'Progressive resistance training designed to build capable muscle, resilient joints, and everyday physical confidence.',
      iconName: 'Dumbbell',
    },
    {
      id: 'phil-3',
      number: '03',
      title: 'DISCIPLINE',
      description:
        'Structured programming and intentional execution that keep you moving forward even after initial motivation fades.',
      iconName: 'Target',
    },
    {
      id: 'phil-4',
      number: '04',
      title: 'BALANCE',
      description:
        'Harmonizing challenging gym sessions with restorative mobility, quality rest, and a realistic lifestyle you genuinely enjoy.',
      iconName: 'Scale',
    },
  ],
  workouts: [],
  resources: [],
  featuredVideo: {
    heading: 'MOVE WITH CARE',
    subheading: 'Gentle movement ideas and educational sessions to explore when you are ready and cleared to exercise.',
    ctaText: 'VIEW ALL VIDEOS',
    primaryVideo: {
      id: 'vid-main',
      title: 'Postpartum movement education — coming soon',
      duration: '14:20',
      category: 'Training Session',
      description:
        'Educational videos will be added after review by an appropriately qualified postpartum exercise professional. Please seek individual medical guidance before returning to exercise.',
      embedUrl: '',
      thumbnail: SITE_IMAGES.hero,
      keyPoints: [
        'Individual recovery and readiness matter',
        'Seek medical and pelvic-health guidance when needed',
        'No universal postpartum exercise timeline',
      ],
    },
    additionalVideos: [
      {
        id: 'vid-2',
        title: 'Understanding your return to movement',
        duration: '11:45',
        category: 'Form & Technique',
        description: 'General education on returning to movement gradually, with appropriate support and clinical guidance.',
        embedUrl: '',
        thumbnail: SITE_IMAGES.hero,
        keyPoints: [
          'Setting scapular position before pulling',
          'Choosing optimal elbow angles on rows and presses',
        ],
      },
      {
        id: 'vid-3',
        title: 'Gentle movement and body awareness',
        duration: '15:10',
        category: 'Mobility Flow',
        description: 'A future educational resource, not an exercise prescription. Individual guidance is important after childbirth.',
        embedUrl: '',
        thumbnail: SITE_IMAGES.mobility,
        keyPoints: [
          'Thoracic spine openers & 360 breathing',
          'Active hip 90/90 transitions',
        ],
      },
    ],
  },
  socialGallery: {
    heading: 'A LITTLE INSPIRATION FOR THE JOURNEY',
    subheading: 'A calm, encouraging space for women to reconnect with movement and wellbeing after childbirth.',
    ctaText: 'FOLLOW ON INSTAGRAM',
    posts: [
      {
        id: 'ig-1',
        caption: 'Your recovery is personal. Give yourself time, patience and support.',
        category: 'Strength Session',
        image: SITE_IMAGES.portrait,
        permalink: 'https://www.instagram.com/sehrish.mall/',
        aspectRatio: 'portrait',
      },
      {
        id: 'ig-2',
        caption: 'Small, gentle steps can be meaningful. There is no need to rush.',
        category: 'Studio Life',
        image: SITE_IMAGES.hero,
        permalink: 'https://www.instagram.com/sehrish.mall/',
        aspectRatio: 'square',
      },
      {
        id: 'ig-3',
        caption: 'Strength is built with patience, support and a pace that respects your body.',
        category: 'Training Discipline',
        image: SITE_IMAGES.strength,
        permalink: 'https://www.instagram.com/sehrish.mall/',
        aspectRatio: 'square',
      },
      {
        id: 'ig-4',
        caption: 'Rest is part of recovery. Listen to your body and seek guidance when something does not feel right.',
        category: 'Motherhood & Wellbeing',
        image: SITE_IMAGES.motherhood,
        permalink: 'https://www.instagram.com/sehrish.mall/',
        aspectRatio: 'portrait',
      },
    ],
  },
  testimonials: {
    heading: 'EVERY RECOVERY IS PERSONAL.',
    subheading:
      'We will share real, permission-based experiences here as the community grows. No before-and-after pressure, no one-size-fits-all timelines.',
    disclaimerNote:
      'No testimonials are published yet. This section will only feature genuine stories shared with explicit permission.',
    items: [],
  },
  faq: [
    {
      id: 'faq-1',
      question: 'How can I start training?',
      answer:
        'Please check with your maternity care provider before beginning or resuming exercise. Once you are cleared and any symptoms have been assessed, contact Sehrish to discuss an appropriately gentle starting point.',
    },
    {
      id: 'faq-2',
      question: 'What type of workouts do you offer?',
      answer:
        'The site shares general movement education and gentle exercise ideas. Postpartum training must be individualised; it is not a substitute for pelvic-health physiotherapy or medical care.',
    },
    {
      id: 'faq-3',
      question: 'Are the workouts suitable for beginners?',
      answer:
        'Beginner-friendly does not automatically mean postpartum-safe. Timing and exercise selection depend on recovery, symptoms, delivery experience and advice from your healthcare professional.',
    },
    {
      id: 'faq-4',
      question: 'Can I train at home?',
      answer:
        'Some gentle movement can be done at home when you are ready and cleared. Avoid exercises that cause pain, pressure, leaking, heaviness, dizziness or increased bleeding, and seek clinical advice if these occur.',
    },
    {
      id: 'faq-5',
      question: 'How can I contact Sehrish?',
      answer:
        'Instagram (@sehrish.mall) is the official contact channel. Fill out the consultation form below and click submit to automatically format your details and send your message directly to her Instagram.',
    },
    {
      id: 'faq-6',
      question: 'Do you offer personalized coaching?',
      answer:
        'Availability for personalized training guidance and consultation inquiries can be requested through the contact form below. Submit your current routine and goals to receive current details.',
    },
    {
      id: 'faq-7',
      question: 'How often should I train?',
      answer:
        'There is no universal postpartum schedule. Start only when medically appropriate, progress gradually and prioritise recovery. A pelvic-health physiotherapist can help guide your return to exercise.',
    },
  ],
  contact: {
    heading: 'YOUR NEXT CHAPTER, AT YOUR PACE',
    supportingText:
      'Tell us about your postpartum stage, your goals and the support you need. We can discuss whether an appropriate training option is available.',
    primaryCtaText: 'GET STARTED',
    secondaryCtaText: 'CONTACT SEHRISH',
    goalOptions: [
      'Gentle return to movement (after medical clearance)',
      'Pelvic floor / core rehabilitation referral enquiry',
      'Post-C-section return-to-activity discussion',
      'Gradual strength-building (when ready)',
      'General postpartum wellbeing enquiry',
    ],
  },
};
