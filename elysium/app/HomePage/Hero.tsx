import React from 'react';

export default function Hero() {
  return (
    <section className="hero-container">
      
      {/* <div className="hero-badge">
        <span className="badge-icon">✨</span>
        <span>MindSpace · Team Nibras</span>
      </div> */}

      
      <h1 className="hero-title">
        Explore Your <br />
        <span className="gradient-text">Emotional Universe</span>
      </h1>

      
      <p className="hero-description">
        A space-themed mental wellness journey.
      </p>

      
      <div className="hero-buttons">
        <button className="btn-primary">
          Start AI Emotional Assessment
          <span className="btn-icon">🤖</span>
        </button>

        <button className="btn-secondary">
          Directly Explore Galaxy
          <span className="btn-icon">🪐</span>
        </button>
      </div>
    </section>
  );
}