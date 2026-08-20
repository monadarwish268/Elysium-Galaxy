import { useNavigate } from 'react-router-dom';

export const FeatureSection = () => {
  const navigate = useNavigate();

  return (
    <section>
      {/* 3 Information Cards (No Routing) */}
      <div>
        <div>
          <h3>AI Check-in</h3>
          <p>
            A 3-step conversational assessment that scores your mood and routes you onward.
          </p>
        </div>

        <div>
          <h3>5 Emotion Planets</h3>
          <p>
            Stress, Anxiety, Happiness, Sadness and Calm — each with its own wellness hub.
          </p>
        </div>

        <div>
          <h3>Real Support</h3>
          <p>
            Licensed psychologist videos plus partnered calm spaces near you.
          </p>
        </div>
      </div>

      {/* Bottom Card with Route */}
      <div>
        <div>
          <h3>Not sure where to begin?</h3>
          <p>The check-in takes under a minute and picks your planet for you.</p>
        </div>
        <button onClick={() => navigate('/check-in')}>
          Begin check-in
        </button>
      </div>
    </section>
  );
};