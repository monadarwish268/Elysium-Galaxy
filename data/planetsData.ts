export interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export interface Video {
  id: string;
  title: string;
  author: string;
  tag: string;
  duration: string;
  embedUrl: string;
}

export interface Place {
  name: string;
  type: string;
  distance: string;
  desc: string;
}

export interface PlanetInfo {
  name: string;
  tagline: string;
  description: string;
  color: string;
  activities: Activity[];
  videos: Video[];
  places: Place[];
}

export const PLANETS_DATA: Record<string, PlanetInfo> = {
  happiness: {
    name: "Happiness Planet",
    tagline: "Amplify The Light",
    description: "You're glowing today — let's make this feeling last longer.",
    color: "#EAB308",
    activities: [
      {
        id: "hap_1",
        title: "Gratitude Journaling",
        description: "Capture three good things and why they mattered.",
        duration: "05:00"
      },
      {
        id: "hap_2",
        title: "Send Someone Joy",
        description: "Message one person exactly why you appreciate them.",
        duration: "03:00"
      },
      {
        id: "hap_3",
        title: "Movement Burst",
        description: "One favourite song, full body, no rules.",
        duration: "04:00"
      }
    ],
    videos: [
      {
        id: "vid_hap_1",
        title: "Making Good Days Repeatable",
        author: "Dr. Lina Haddad",
        tag: "Positive Psychology",
        duration: "09:15",
        embedUrl: "https://www.youtube.com/embed/WPPPFqsECz0"
      },
      {
        id: "vid_hap_2",
        title: "The Science of Savoring",
        author: "Dr. Maya Aoun",
        tag: "Wellbeing",
        duration: "11:48",
        embedUrl: "https://www.youtube.com/embed/fLJsdqxnZb0"
      }
    ],
    places: [
      {
        name: "Ahwak Cafe Tripoli",
        type: "Café",
        distance: "1.2 km",
        desc: "Dam & Farhat area · Bright atmosphere & open coffee space"
      },
      {
        name: "Mina Corniche Walkway",
        type: "Park & Seaside",
        distance: "2.5 km",
        desc: "El Mina · Fresh sea breeze & vibrant sunset strolls"
      },
      {
        name: "Culture House / Bayt Al Art",
        type: "Bookstore & Cultural Space",
        distance: "1.8 km",
        desc: "Mina Tripoli · Social gatherings, art & books"
      }
    ]
  },

  calm: {
    name: "Calm Planet",
    tagline: "Restore Your Inner Peace",
    description: "Slow down, breathe gently, and anchor yourself in quiet tranquility.",
    color: "#06B6D4",
    activities: [
      {
        id: "calm_1",
        title: "Box Breathing",
        description: "Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s.",
        duration: "04:00"
      },
      {
        id: "calm_2",
        title: "5-4-3-2-1 Grounding",
        description: "Acknowledge 5 things around you to stay present.",
        duration: "03:00"
      },
      {
        id: "calm_3",
        title: "Gentle Stretching",
        description: "Unwind tension in your shoulders and neck.",
        duration: "06:00"
      }
    ],
    videos: [
      {
        id: "vid_calm_1",
        title: "10-Minute Mindful Breathing",
        author: "Dr. Samer Nader",
        tag: "Mindfulness",
        duration: "10:00",
        embedUrl: "https://www.youtube.com/embed/inpok4MKVLM"
      },
      {
        id: "vid_calm_2",
        title: "Calming An Overactive Mind",
        author: "Dr. Maya Aoun",
        tag: "Stress Relief",
        duration: "08:30",
        embedUrl: "https://www.youtube.com/embed/ZToicYuvIOs"
      }
    ],
    places:  [
      {
        name: "Al Mina Quiet Garden",
        type: "Park",
        distance: "2.1 km",
        desc: "Near El Mina · Peaceful greenery away from street noise"
      },
      {
        name: "Rachid Karami International Fair Grounds",
        type: "Open Quiet Space",
        distance: "0.8 km",
        desc: "Tripoli · Open architectural space ideal for peaceful walks"
      },
      {
        name: "Café MNT Quiet Lounge",
        type: "Meditation Friendly Café",
        distance: "1.5 km",
        desc: "Dam & Farhat · Cozy corner with quiet seating"
      }
    ]
  }
};