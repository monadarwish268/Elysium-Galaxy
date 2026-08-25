import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-container">
        <h1 className="hero-title">
        Explore Your <br />
        <span className="gradient-text">Emotional Universe</span>
      </h1>

      
      <p className="hero-description">
        A space-themed mental wellness journey.
      </p>

      
      <div className="hero-buttons">
            <Link href="/check-in" className="btn-primary">
            Start AI Emotional Assessment
            <span className="btn-icon">🤖</span>
        </Link>

        <Link href="/galaxy1" className="btn-secondary">
            Directly Explore Galaxy
            <span className="btn-icon">🪐</span>
        </Link>
      </div>
    </section>
  );
}