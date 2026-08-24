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
    tagline: "AMPLIFY THE LIGHT",
    description: "You're glowing today — let's make this feeling last longer.",
    color: "#FACC15",
    activities: [
      {
        id: "hap_1",
        title: "Gratitude Journaling",
        description: "Capture three good things and why they mattered.",
        duration: "04:55"
      },
      {
        id: "hap_2",
        title: "Send Someone Joy",
        description: "Message one person exactly why you appreciate them.",
        duration: "03:00"
      },
      {
      id: "hap_3",
      title: "Nature & Ambient Sounds",
      description: "Relax or move gently to the soothing sounds of rain, ocean waves, or birds.",
      duration: "04:00"
    }
    ],
    videos: [
      {
        id: "vid_hap_1",
        title: "Making Good Days Repeatable",
        author: "Dr. Lina Haddad",
        tag: "Positive Psychology",
        duration: "9:15",
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
        name: "Sunbeam Cafe",
        type: "Cafe",
        distance: "0.5 km",
        desc: "Rooftop terrace, warm crowd"
      },
      {
        name: "Aurora Park",
        type: "Park",
        distance: "0.9 km",
        desc: "Golden-hour benches"
      },
      {
        name: "Paper Comet",
        type: "Bookstore",
        distance: "1.5 km",
        desc: "Poetry and journals"
      }
    ]
  },

  calm: {
    name: "Calm Planet",
    tagline: "STAY IN THE STILL",
    description: "You're centered. Let's protect this quiet space you've found.",
    color: "#38BDF8",
    activities: [
      {
        id: "calm_1",
        title: "Body Scan",
        description: "Travel from toes to crown, softening as you go.",
        duration: "08:00"
      },
      {
        id: "calm_2",
        title: "Silent Tea Ritual",
        description: "One drink, no screens, full attention.",
        duration: "06:00"
      },
     {
      id: "calm_3",
      title: "Nature & Ambient Sounds",
      description: "Relax or move gently to the soothing sounds of rain, ocean waves, or birds.",
      duration: "04:00"
    }
    ],
 videos: [
  {
    id: 'v1',
    title: 'Protecting Your Calm',
    author: 'Dr. Maya Aoun',
    tag: 'MINDFULNESS',
    duration: '12:05',
    embedUrl: 'https://www.youtube.com/embed/inpok4MKVLM'
  },
  {
    id: 'v2',
    title: 'Evening Wind-Down Routine',
    author: 'Dr. Omar Fakih',
    tag: 'SLEEP HEALTH',
    duration: '09:58',
    embedUrl: 'https://www.youtube.com/embed/aEqlQvczMJQ'
  }
],
    places: [
      {
        name: "Zen Orbit Studio",
        type: "Meditation Space",
        distance: "0.8 km",
        desc: "Sound bath Wednesdays"
      },
      {
        name: "The Slow Page",
        type: "Bookstore",
        distance: "1.0 km",
        desc: "Silent reading room"
      },
      {
        name: "Lakeside Trail",
        type: "Park",
        distance: "1.7 km",
        desc: "Flat, breezy, calm"
      }
    ]
  }
};