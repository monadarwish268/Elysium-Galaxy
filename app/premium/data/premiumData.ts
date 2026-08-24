export interface Psychologist {
  id: string;
  name: string;
  title: string;
  exp: string;
  rating: number;
  bio: string;
  specialty: string;
  availability: string;
  price: number;
  avatar: string;
}

export const PSYCHOLOGISTS: Psychologist[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'Clinical Psychologist',
    exp: '8Y Exp',
    rating: 4.9,
    bio: 'Specializes in stress, anxiety, and cosmic burnout navigation. Guided meditation master.',
    specialty: 'Stress & burnout',
    availability: 'Today · 18:30',
    price: 45,
    avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78907?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '2',
    name: 'Dr. Karim Nasr',
    title: 'Behavioral Therapist',
    exp: '6Y Exp',
    rating: 4.8,
    bio: 'CBT expert dedicated to helping you reframe intrusive thoughts and restore balance.',
    specialty: 'Anxiety & CBT',
    availability: 'Tomorrow · 10:00',
    price: 50,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
  },
  {
    id: '3',
    name: 'Dr. Maya Aoun',
    title: 'Mindfulness Specialist',
    exp: '10Y Exp',
    rating: 5.0,
    bio: 'Deep focus on sleep hygiene, somatic release, and peaceful mental grounding.',
    specialty: 'Mindfulness & sleep',
    availability: 'Thu · 16:15',
    price: 40,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
  },
];

export const DATES = [
  { day: 'MON', date: '14' },
  { day: 'TUE', date: '15' },
  { day: 'WED', date: '16' },
  { day: 'THU', date: '17' },
  { day: 'FRI', date: '18' },
];

export const SLOTS = ['10:30 AM', '5:00 PM'];