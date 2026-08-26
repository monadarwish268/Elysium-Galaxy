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
  youtubeEmbedUrl: string;
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

// Alias for pages expecting 'Planet' type import
export type Planet = PlanetInfo;

export const PLANETS_DATA: Record<string, PlanetInfo> = {
  happiness: {
    name: "Lumina",
    tagline: "AMPLIFY THE LIGHT",
    description: "You're glowing today — let's make this feeling last longer.",
    color: "#eab308",
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
        embedUrl: "https://www.youtube.com/embed/WPPPFqsECz0",
        youtubeEmbedUrl: "https://www.youtube.com/embed/WPPPFqsECz0"
      },
      {
        id: "vid_hap_2",
        title: "The Science of Savoring",
        author: "Dr. Maya Aoun",
        tag: "Wellbeing",
        duration: "11:48",
        embedUrl: "https://www.youtube.com/embed/fLJsdqxnZb0",
        youtubeEmbedUrl: "https://www.youtube.com/embed/fLJsdqxnZb0"
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
    name: "Serenita",
    tagline: "STAY IN THE STILL",
    description: "You're centered. Let's protect this quiet space you've found.",
    color: "#0284c7",
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
        id: "v1",
        title: "Protecting Your Calm",
        author: "Dr. Maya Aoun",
        tag: "MINDFULNESS",
        duration: "12:05",
        embedUrl: "https://www.youtube.com/embed/inpok4MKVLM",
        youtubeEmbedUrl: "https://www.youtube.com/embed/inpok4MKVLM"
      },
      {
        id: "v2",
        title: "Evening Wind-Down Routine",
        author: "Dr. Omar Fakih",
        tag: "SLEEP HEALTH",
        duration: "09:58",
        embedUrl: "https://www.youtube.com/embed/aEqlQvczMJQ",
        youtubeEmbedUrl: "https://www.youtube.com/embed/aEqlQvczMJQ"
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
  },

  sadness: {
    name: "Glacia",
    tagline: "HONOR WHAT YOU FEEL",
    description: "It's okay to slow down. Give yourself the space to feel, heal, and breathe.",
    color: "#2563eb",
    activities: [
      {
        id: "sad_1",
        title: "Gentle Journaling",
        description: "Write down what you're feeling without judging or trying to fix it.",
        duration: "05:00"
      },
      {
        id: "sad_2",
        title: "Comfort Yourself",
        description: "Make a warm drink, wrap yourself in a blanket, and take a quiet moment.",
        duration: "04:00"
      },
      {
        id: "sad_3",
        title: "Slow Breathing",
        description: "Take slow, deep breaths and allow your body to relax.",
        duration: "04:00"
      }
    ],
    videos: [
      {
        id: "vid_sad_1",
        title: "How to Deal With Sadness",
        author: "Psych2Go",
        tag: "Mental Wellbeing",
        duration: "8:35",
        embedUrl: "https://www.youtube.com/embed/TEwoWxLwCfA",
        youtubeEmbedUrl: "https://www.youtube.com/embed/TEwoWxLwCfA"
      },
      {
        id: "vid_sad_2",
        title: "How to Cope With Sadness",
        author: "Therapy in a Nutshell",
        tag: "Emotional Health",
        duration: "10:00",
        embedUrl: "https://www.youtube.com/embed/3QIfkeA6HBY",
        youtubeEmbedUrl: "https://www.youtube.com/embed/3QIfkeA6HBY"
      }
    ],
    places: [
      {
        name: "Quiet Corner Cafe",
        type: "Cafe",
        distance: "0.6 km",
        desc: "A peaceful space to slow down"
      },
      {
        name: "Willow Garden",
        type: "Park",
        distance: "1.0 km",
        desc: "Quiet paths and calming nature"
      },
      {
        name: "Moonlight Books",
        type: "Bookstore",
        distance: "1.4 km",
        desc: "Comforting stories and poetry"
      }
    ]
  },

  self: {
    name: "Vortex",
    tagline: "CHOOSE YOURSELF TOO",
    description: "You deserve the same kindness, patience, and love that you give to others.",
    color: "#7c3aed",
    activities: [
      {
        id: "love_1",
        title: "Positive Affirmations",
        description: "Say three kind things about yourself and allow yourself to believe them.",
        duration: "04:00"
      },
      {
        id: "love_2",
        title: "Celebrate Yourself",
        description: "Write down three things you've accomplished or qualities you're proud of.",
        duration: "05:00"
      },
      {
        id: "love_3",
        title: "Do Something You Love",
        description: "Spend a few minutes doing something that makes you genuinely happy.",
        duration: "04:00"
      }
    ],
    videos: [
      {
        id: "vid_love_1",
        title: "How to Practice Self Love",
        author: "Psych2Go",
        tag: "Self Growth",
        duration: "7:00",
        embedUrl: "https://www.youtube.com/embed/MLX2PfA1vVU",
        youtubeEmbedUrl: "https://www.youtube.com/embed/MLX2PfA1vVU"
      },
      {
        id: "vid_love_2",
        title: "The Power of Self Compassion",
        author: "TEDx Talks",
        tag: "Self Compassion",
        duration: "12:00",
        embedUrl: "https://www.youtube.com/embed/IvtZBUSplr4",
        youtubeEmbedUrl: "https://www.youtube.com/embed/IvtZBUSplr4"
      }
    ],
    places: [
      {
        name: "Bloom Cafe",
        type: "Cafe",
        distance: "0.4 km",
        desc: "Cozy atmosphere and peaceful moments"
      },
      {
        name: "Harmony Studio",
        type: "Wellness",
        distance: "0.8 km",
        desc: "A space for movement and mindfulness"
      },
      {
        name: "The Little Bookshop",
        type: "Bookstore",
        distance: "1.3 km",
        desc: "Books for growth and inspiration"
      }
    ]
  },

  stress: {
    name: "Ignis",
    tagline: "PAUSE. BREATHE. RESET.",
    description: "Things feel overwhelming right now — take a moment to slow down and find your balance.",
    color: "#dc2626",
    activities: [
      {
        id: "stress_1",
        title: "Box Breathing",
        description: "Breathe in, hold, breathe out, and pause slowly to calm your body.",
        duration: "04:00"
      },
      {
        id: "stress_2",
        title: "Brain Dump",
        description: "Write down everything on your mind and focus only on what you can control.",
        duration: "05:00"
      },
      {
        id: "stress_3",
        title: "Gentle Stretching",
        description: "Release tension with slow movements and gentle stretches.",
        duration: "04:00"
      }
    ],
    videos: [
      {
        id: "vid_stress_1",
        title: "How to Reduce Stress",
        author: "TED-Ed",
        tag: "Stress Management",
        duration: "6:00",
        embedUrl: "https://www.youtube.com/embed/hnpQrMqDoqE",
        youtubeEmbedUrl: "https://www.youtube.com/embed/hnpQrMqDoqE"
      },
      {
        id: "vid_stress_2",
        title: "A Simple Way to Calm Stress",
        author: "Headspace",
        tag: "Mindfulness",
        duration: "10:00",
        embedUrl: "https://www.youtube.com/embed/ZToicYcHIOU",
        youtubeEmbedUrl: "https://www.youtube.com/embed/ZToicYcHIOU"
      }
    ],
    places: [
      {
        name: "Calm Cup Cafe",
        type: "Cafe",
        distance: "0.5 km",
        desc: "Quiet seating and relaxing atmosphere"
      },
      {
        name: "Breeze Park",
        type: "Park",
        distance: "0.8 km",
        desc: "Open space for walking and breathing"
      },
      {
        name: "Stillness Studio",
        type: "Wellness",
        distance: "1.2 km",
        desc: "Meditation and relaxation sessions"
      }
    ]
  }
};