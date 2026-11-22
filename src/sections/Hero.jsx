// Core Contribution by Yehen Silva (Project Manager and Developer) — Hero Showcase, Video Player & Institutional Validation
import { Calendar } from 'lucide-react';
import Button from '../components/Button.jsx';
import PhoneMockup from '../components/PhoneMockup.jsx';
import CarIllustration from '../components/CarIllustration.jsx';
import '../styles/Hero.css';

export default function Hero({ onOpenWalkthrough }) {
  return (
    <section className="hero" id="hero">
      <div className="container hero__grid">
        <div className="hero__text">
          <span className="hero__label">⚡ REAL-WORLD EV RANGE &amp; JOURNEY INTELLIGENCE · SRI LANKA</span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
            Can I complete my journey with the <span className="hl">battery I have?</span>
          </h1>
          <p className="lead" style={{ marginTop: 20 }}>
            NexoEV is a mobile-first EV decision-support companion engineered specifically for Sri Lankan driving conditions. Featuring intelligent elevation-aware range prediction, central highland landslide &amp; weather advisories, journey expense tracking, and 100% offline-ready route packs.
          </p>
          <div className="hero__buttons">
            <Button href="#waitlist">Join Beta Waitlist &rarr;</Button>
            <Button
              href="#book-walkthrough"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                if (onOpenWalkthrough) onOpenWalkthrough();
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <Calendar size={16} />
              Book a Walkthrough
            </Button>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__glow" />
          <CarIllustration className="hero__car" />
          <PhoneMockup screen="ring" floating />
          <div className="hero__chip hero__chip--a">
            <b>● Likely Feasible</b>
            <span>Safe Arrival Battery Buffer</span>
          </div>
          <div className="hero__chip hero__chip--b">
            <b>97.7% Accuracy</b>
            <span>Real-World Tested Precision</span>
          </div>
        </div>
      </div>
    </section>
  );
}
