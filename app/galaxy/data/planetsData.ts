export interface Activity {
  id: string;
  title: string;
  desc: string;
  duration: string;
  audioUrl?: string;
}

export interface Video {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  category: string;
  youtubeEmbedUrl: string;
}

export interface Place {
  name: string;
  type: string;
  distance: string;
  desc: string;
}

export interface Planet {
  name: string;
  tagline: string;
  description: string;
  color: string;
  bgGradient: string;
  mapEmbedUrl: string;
  activities: Activity[];
  videos: Video[];
  places: Place[];
}

export const PLANETS_DATA: Record<string, Planet> = {
  anxiety: {
    name: 'Anxiety Planet',
    tagline: 'SLOW THE SPIRAL',
    description: "Your mind is racing ahead. Let's bring it gently back to this moment.",
    color: '#a855f7',
    bgGradient: 'from-[#1e0a38] via-[#0d122b] to-[#040817]',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Horsh%20Beirut&t=&z=13&ie=UTF8&iwloc=&output=embed',
    activities: [
      {
        id: 'a1',
        title: 'Box Breathing Grounding',
        desc: 'Inhale 4s, hold 4s, exhale 4s, hold 4s to reset your nervous system.',
        duration: '04:00',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=meditation-piano-112201.mp3',
      },
      {
        id: 'a2',
        title: '5-4-3-2-1 Sensory Reset',
        desc: 'Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, and 1 you taste.',
        duration: '03:00',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=relaxing-mountains-rivers-14132.mp3',
      },
      {
        id: 'a3',
        title: 'Progressive Muscle Release',
        desc: 'Tense and release your shoulders and jaw to drop stored physical anxiety.',
        duration: '05:00',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=soft-rain-ambient-111154.mp3',
      },
    ],
    videos: [
      {
        id: 'v1',
        title: '10-Minute Anxiety Relief Breathing',
        instructor: 'Dr. Lina Haddad',
        duration: '10:00',
        category: 'Guided Breathing',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/VUjiXcfKBn8',
      },
      {
        id: 'v2',
        title: 'How to Stop Overthinking Immediately',
        instructor: 'Dr. Omar Fakih',
        duration: '08:15',
        category: 'Mindset',
        youtubeEmbedUrl: 'https://www.youtube.com/embed/VVJuUjsRLrY',
      },
    ],
    places: [
      {
        name: 'Horsh Beirut Park',
        type: 'Nature Park',
        distance: '2.5 km · Badaro',
        desc: 'Quiet pine forest paths perfect for slow grounding walks.',
      },
      {
        name: 'Aley Peaceful Nook Cafe',
        type: 'Quiet Cafe',
        distance: '12 km · Aley',
        desc: 'Calm garden seating with soft background acoustic music.',
      },
      {
        name: 'Byblos Old Port Seawall',
        type: 'Coastal Walk',
        distance: '35 km · Jbeil',
        desc: 'Listen to natural wave rhythms to slow down heart rate.',
      },
    ],
  },
  stress: { name: 'Stress Planet', tagline: '', description: '', color: '#ff7a3c', bgGradient: '', mapEmbedUrl: '', activities: [], videos: [], places: [] },
  happiness: { name: 'Happiness Planet', tagline: '', description: '', color: '#eab308', bgGradient: '', mapEmbedUrl: '', activities: [], videos: [], places: [] },
  sadness: {
    name: 'Sadness Planet', tagline: '', description: '', color: '#3b82f6', bgGradient: '', mapEmbedUrl: '', activities: [], places: [],
    videos: []
  },
  calm: { name: 'Calm Planet', tagline: '', description: '', color: '#10b981', bgGradient: '', mapEmbedUrl: '', activities: [], videos: [], places: [] },
};