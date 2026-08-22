export interface Activity {
  id: string;
  title: string;
  desc: string;
  duration: string;
}

export interface Video {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  category: string;
}

export interface Place {
  name: string;
  type: string;
  distance: string;
  desc: string;
}

export interface PlanetInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  color: string;
  activities: Activity[];
  videos: Video[];
  places: Place[];
}

export const PLANETS_DATA: Record<string, PlanetInfo> = {
  'self-love': {
    id: 'self-love',
    name: 'Self-Love Planet',
    tagline: 'HONOR YOUR JOURNEY',
    description: "Take a moment to appreciate how far you've come. You deserve gentleness.",
    color: '#ec4899',
    activities: [
      { id: '1', title: 'Self-Compassion Letter', desc: 'Write 3 kind truths about yourself.', duration: '05:00' },
      { id: '2', title: 'Boundary Check', desc: 'Identify one area where you need to say no gently.', duration: '04:00' }
    ],
    videos: [
      { id: 'v1', title: 'Overcoming Self-Criticism', instructor: 'Dr. Rania Sleiman', duration: '09:15', category: 'Self Care' }
    ],
    places: [
      { name: 'Sursock Museum Gardens', type: 'Garden & Art', distance: '1.2 km', desc: 'Achrafieh, Beirut · Peaceful outdoor reading spot' },
      { name: 'Aley EquiClub', type: 'Nature Retreat', distance: '18 km', desc: 'Aley · Tranquil mountain views' }
    ]
  },
  anxiety: {
    id: 'anxiety',
    name: 'Anxiety Planet',
    tagline: 'SLOW THE SPIRAL',
    description: "Your mind is racing ahead. Let's bring it gently back to this moment.",
    color: '#a855f7',
    activities: [
      { id: '1', title: 'Box Breathing', desc: 'Four counts in, hold, out, hold. Repeat six rounds.', duration: '04:00' },
      { id: '2', title: 'Worry Download', desc: 'Write every worry down, then circle what you can act on.', duration: '06:00' },
      { id: '3', title: 'Cold Water Reset', desc: 'Splash your face and feel your body settle.', duration: '02:00' }
    ],
    videos: [
      { id: 'v1', title: 'Calming an Anxious Mind', instructor: 'Dr. Rania Sleiman', duration: '10:02', category: 'Anxiety Tools' },
      { id: 'v2', title: "When Thoughts Won't Stop", instructor: 'Dr. Karim Nasr', duration: '14:35', category: 'CBT Basics' }
    ],
    places: [
      { name: 'Orbit Books & Cafe', type: 'Bookstore', distance: '0.7 km', desc: 'Hamra, Beirut · Soft music, quiet reading nooks' },
      { name: 'Lumen Meditation Hall', type: 'Meditation Space', distance: '1.3 km', desc: 'Badaro · Guided grounding sessions' },
      { name: 'Corniche Beirut Walk', type: 'Riverside Walk', distance: '2.0 km', desc: 'Raouche · Open sea breeze, slow pace' }
    ]
  },
  calm: {
    id: 'calm',
    name: 'Calm Planet',
    tagline: 'STAY IN THE STILL',
    description: "You're centered. Let's protect this quiet space you've found.",
    color: '#06b6d4',
    activities: [
      { id: '1', title: 'Mindful Silence', desc: 'Rest gently without agenda or distraction.', duration: '10:00' }
    ],
    videos: [
      { id: 'v1', title: 'Maintaining Inner Stillness', instructor: 'Dr. Lina Haddad', duration: '09:00', category: 'Mindfulness' }
    ],
    places: [
      { name: 'Chouf Cedar Nature Reserve', type: 'Nature Reserve', distance: '35 km', desc: 'Chouf · Ancient forest stillness' },
      { name: 'Horsh Beirut Park', type: 'Park', distance: '2.5 km', desc: 'Pine park shade' }
    ]
  },
  happy: {
    id: 'happy',
    name: 'Happiness Planet',
    tagline: 'AMPLIFY THE LIGHT',
    description: "You're glowing today — let's make this feeling last longer.",
    color: '#eab308',
    activities: [
      { id: '1', title: 'Gratitude Journaling', desc: 'List three things bringing you joy right now.', duration: '05:00' }
    ],
    videos: [
      { id: 'v1', title: 'Sustaining Joyful States', instructor: 'Dr. Maya Roy', duration: '06:45', category: 'Positivity' }
    ],
    places: [
      { name: 'Byblos Old Port', type: 'Historic Coastal', distance: '38 km', desc: 'Jbeil · Sunset seaside cafes' },
      { name: 'Kalei Coffee Co.', type: 'Cafe', distance: '1.1 km', desc: 'Mar Mikhael · Vibrant open garden' }
    ]
  },
  sad: {
    id: 'sad',
    name: 'Sad Planet',
    tagline: 'REST AND BE HELD',
    description: "It's okay to feel heavy. You don't have to carry it alone.",
    color: '#3b82f6',
    activities: [
      { id: '1', title: 'Gentle Heart Hug', desc: 'Rest hand on chest and breathe softly.', duration: '05:00' }
    ],
    videos: [
      { id: 'v1', title: 'Navigating Deep Sadness', instructor: 'Dr. Omar Fakih', duration: '14:20', category: 'Emotional Healing' }
    ],
    places: [
      { name: 'Qadisha Valley Sanctuary', type: 'Nature Trail', distance: '85 km', desc: 'Bcharre · Peaceful mountain valley' },
      { name: 'Batroun Coastal Path', type: 'Seaside Path', distance: '50 km', desc: 'Batroun · Calming ocean sounds' }
    ]
  }
};