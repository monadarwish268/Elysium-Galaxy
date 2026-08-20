import { useNavigate } from 'react-router-dom';

interface Planet {
  id: string;
  name: string;
  tagline: string;
  description: string;
  path: string;
}

const PLANETS: Planet[] = [
  {
    id: 'stress',
    name: 'Stress Planet',
    tagline: 'Release the pressure',
    description: "Feeling overwhelmed? Let's take a small step toward feeling better.",
    path: '/planet/stress',
  },
  {
    id: 'anxiety',
    name: 'Anxiety Planet',
    tagline: 'Slow the spiral',
    description: "Your mind is racing ahead. Let's bring it gently back to this moment.",
    path: '/planet/anxiety',
  },
  {
    id: 'happiness',
    name: 'Happiness Planet',
    tagline: 'Amplify the light',
    description: "You're glowing today — let's make this feeling last longer.",
    path: '/planet/happiness',
  },
  {
    id: 'sadness',
    name: 'Sadness Planet',
    tagline: 'Rest and be held',
    description: "It's okay to feel heavy. You don't have to carry it alone.",
    path: '/planet/sadness',
  },
  {
    id: 'calm',
    name: 'Calm Planet',
    tagline: 'Stay in the still',
    description: "You're centered. Let's protect this quiet space you've found.",
    path: '/planet/calm',
  },
];

export const Galaxy = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      {/* Header Section */}
      <header style={{ marginBottom: '2rem' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
          EMOTION GALAXY
        </p>
        <h1>Choose the planet that matches your mood</h1>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button>0 day streak</button>
          <button onClick={() => navigate('/check-in')}>
            AI check-in
          </button>
        </div>
      </header>

      {/* Space Canvas / Design Placeholder (For Friend's Code) */}
      <section
        style={{
          border: '2px dashed #ccc',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '2rem',
        }}
      >
        <p>[ Space Canvas / Interactive Background Design Placeholder ]</p>
      </section>

      {/* Planets Grid */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {PLANETS.map((planet) => (
          <div
            key={planet.id}
            onClick={() => navigate(planet.path)}
            style={{
              border: '1px solid #ccc',
              padding: '1.5rem',
              cursor: 'pointer',
              borderRadius: '8px',
            }}
          >
            <h2>{planet.name}</h2>
            <p>
              <em>{planet.tagline}</em>
            </p>
            <p>{planet.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};