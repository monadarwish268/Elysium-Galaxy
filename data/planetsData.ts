export interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  audioUrl?: string;
}

export interface Video {
  id: string;
  title: string;
  doctor: string;
  duration: string;
  tag: string;
  embedUrl: string;
}

export interface Place {
  name: string;
  type: string;
  distance: string;
  desc: string;
}

export interface PlanetDetails {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  activities: Activity[];
  videos: Video[];
  places: Place[];
}

export const PLANETS_DATA: Record<string, PlanetDetails> = {
  calm: {
    id: 'calm',
    name: 'Calm Planet',
    tagline: 'PEACE AND STILLNESS',
    description: 'Breathe deeply and sink into quiet, undisturbed balance.',
    color: '#06b6d4',
    activities: [
      { id: 'c1', title: 'Box Breathing', description: 'Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s.', duration: '05:00' },
      { id: 'c2', title: 'Mindful Tea Moment', description: 'Sip warm tea with full presence and quiet focus.', duration: '10:00' },
      { id: 'c3', title: 'Silent Body Scan', description: 'Bring gentle awareness to physical sensations from head to toe.', duration: '07:00' }
    ],
    videos: [
      { id: 'cv1', title: 'Sustaining Inner Peace', doctor: 'Dr. Maya Khoury', duration: '11:15', tag: 'Mindfulness', embedUrl: 'https://www.youtube.com/embed/inpok4MKVLM' },
      { id: 'cv2', title: 'Nervous System Reset', doctor: 'Dr. Ziad Haddad', duration: '06:45', tag: 'Relief', embedUrl: 'https://www.youtube.com/embed/QP3IulSXYjw' }
    ],
    places: [
      { name: 'Chouf Cedar Nature Reserve', type: 'Forest Reserve', distance: '35 km', desc: 'Chouf · Ancient forest stillness and crisp mountain air.' },
      { name: 'Horsh Beirut Park', type: 'Pine Park', distance: '2.5 km', desc: 'Beirut · Quiet shaded pine forest.' }
    ]
  },
  happy: {
    id: 'happy',
    name: 'Happiness Planet',
    tagline: 'AMPLIFY THE LIGHT',
    description: 'Celebrate joy, gratitude, and positive energy with uplifting practices.',
    color: '#eab308',
    activities: [
      { id: 'h1', title: 'Gratitude Journaling', description: 'Write down 3 specific moments that brought a smile to your face today.', duration: '03:00' },
      { id: 'h2', title: 'Joyful Movement', description: 'Stretch and move freely to your favorite uplifting rhythm.', duration: '05:00' },
      { id: 'h3', title: 'Kindness Outreach', description: 'Send a quick appreciation text to someone you care about.', duration: '04:00' }
    ],
    videos: [
      { id: 'hv1', title: 'Cultivating Everyday Joy', doctor: 'Dr. Sarah Chen', duration: '06:15', tag: 'Positivity', embedUrl: 'https://www.youtube.com/embed/inpok4MKVLM' },
      { id: 'hv2', title: 'The Science of Gratitude', doctor: 'Dr. Karim Nader', duration: '08:20', tag: 'Psychology', embedUrl: 'https://www.youtube.com/embed/ZToicYuvmbU' }
    ],
    places: [
      { name: 'Kalei Coffee Co.', type: 'Garden Café', distance: '1.1 km', desc: 'Mar Mikhael, Beirut · Vibrant open-air green garden.' },
      { name: 'Byblos Old Port', type: 'Coastal Harbor', distance: '38 km', desc: 'Jbeil · Scenic sunset harbor walks.' }
    ]
  },
  sad: {
    id: 'sad',
    name: 'Sadness Planet',
    tagline: 'REST AND PROCESS',
    description: 'A safe, gentle space to feel, reflect, and release emotional heaviness.',
    color: '#3b82f6',
    activities: [
      { id: 'sd1', title: 'Gentle Heart Hug', description: 'Rest your hand on your chest and take deep, comforting breaths.', duration: '05:00' },
      { id: 'sd2', title: 'Emotional Journal Release', description: 'Express raw feelings without judgment or expectation.', duration: '07:00' },
      { id: 'sd3', title: 'Soothing Somatic Stretch', description: 'Release physical tension stored in your neck and shoulders.', duration: '06:00' }
    ],
    videos: [
      { id: 'sdv1', title: 'Navigating Heavy Emotions', doctor: 'Dr. Omar Fakih', duration: '10:30', tag: 'Healing', embedUrl: 'https://www.youtube.com/embed/QP3IulSXYjw' },
      { id: 'sdv2', title: 'Self-Compassion in Dark Times', doctor: 'Dr. Lina Haddad', duration: '07:45', tag: 'Self-Care', embedUrl: 'https://www.youtube.com/embed/VUjiXcfKBn8' }
    ],
    places: [
      { name: 'Qadisha Valley Sanctuary', type: 'Nature Trail', distance: '45 km', desc: 'Bcharre · Peaceful mountain valley trail.' },
      { name: 'Batroun Coastal Path', type: 'Seaside Walk', distance: '28 km', desc: 'Batroun · Calming ocean sounds.' }
    ]
  },
  stress: {
    id: 'stress',
    name: 'Stress Planet',
    tagline: 'RELEASE THE PRESSURE',
    description: 'Decompress from burnout and realign your mind with calm, restorative exercises.',
    color: '#ff7a3c',
    activities: [
      { id: 's1', title: '4-7-8 Decompression Wave', description: 'Inhale for 4s, hold for 7s, exhale for 8s to reset your autonomic system.', duration: '03:00' },
      { id: 's2', title: 'Sensory Grounding Walk', description: 'Step outdoors, tune out noise, and name 5 natural elements around you.', duration: '05:00' },
      { id: 's3', title: 'Progressive Muscle Release', description: 'Contract and release muscle groups from your toes to your jaw.', duration: '06:30' }
    ],
    videos: [
      { id: 'sv1', title: '5-Minute Guided De-Stress Session', doctor: 'Dr. KJ Foster', duration: '05:00', tag: 'Stress Relief', embedUrl: 'https://www.youtube.com/embed/E2C2G3-CXqM' },
      { id: 'sv2', title: 'Mindfulness for Somatic Tension', doctor: 'Dr. Ziad Haddad', duration: '08:30', tag: 'Wellness', embedUrl: 'https://www.youtube.com/embed/QP3IulSXYjw' }
    ],
    places: [
      { name: 'Mina Seaside Corniche', type: 'Nature Walk', distance: '2.0 km', desc: 'Tripoli · Relaxing wave acoustics and sea air.' },
      { name: 'Ahwek Café', type: 'Quiet Café', distance: '1.2 km', desc: 'Mina, Tripoli · Peaceful seaside spot.' }
    ]
  },
  'self-love': {
    id: 'self-love',
    name: 'Self-Love',
    tagline: 'HONOR YOUR JOURNEY',
    description: 'Nurture self-compassion, eliminate self-doubt, and embrace your worth.',
    color: '#ec4899',
    activities: [
      { id: 'sl1', title: 'Affirmation Meditation', description: 'Repeat grounding self-compassion mantras silently.', duration: '04:00' },
      { id: 'sl2', title: 'Kindness Journaling', description: 'Acknowledge one personal strength you appreciate today.', duration: '05:00' },
      { id: 'sl3', title: 'Mirror Connection', description: 'Look at yourself with gratitude and offer one kind word.', duration: '03:00' }
    ],
    videos: [
      { id: 'slv1', title: 'Building Unshakeable Self-Worth', doctor: 'Dr. Elena Rostova', duration: '08:45', tag: 'Self-Care', embedUrl: 'https://www.youtube.com/embed/ZToicYuvmbU' },
      { id: 'slv2', title: 'Overcoming the Inner Critic', doctor: 'Dr. Sarah Chen', duration: '09:15', tag: 'Growth', embedUrl: 'https://www.youtube.com/embed/inpok4MKVLM' }
    ],
    places: [
      { name: 'Culturama Bookstore', type: 'Bookstore', distance: '3.1 km', desc: 'Tripoli · Cozy reading nook.' },
      { name: 'Sursock Museum Gardens', type: 'Art & Garden', distance: '1.2 km', desc: 'Achrafieh, Beirut · Quiet outdoor garden.' }
    ]
  }
};