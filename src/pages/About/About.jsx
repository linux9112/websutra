import { useState, useEffect, useRef } from "react";
import "./About.css";
import Skills from "./Skills";
import dindayalImg from "../../assets/images/dindayal.jpg";
import manmohanImg from "../../assets/images/manmohan.jpg";
import { FaSyncAlt } from "react-icons/fa";

function About() {
  // Start with a randomized front on each page load (sometimes Dindayal, sometimes Manmohan)
  const [flip, setFlip] = useState(() => Math.random() < 0.5);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Auto-flip every 4.5 seconds so both founders alternate in front
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setFlip((prev) => !prev);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <section className="about" id="about">
      <div className="title">
        <h2>MORE THAN JUST WEBSITES.</h2>
      </div>

      <div className="content">
        <div className="founders-wrapper">
          <div
            className="photo-card"
            onClick={() => setFlip((prev) => !prev)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            title="Click or tap to flip founder profile"
          >
            <div className={flip ? "photo-inner flip" : "photo-inner"}>
              {/* FRONT: DINDAYAL */}
              <div className="photo-front">
                <img src={dindayalImg} alt="Dindayal - Co-Founder & Technical Lead" />
                <div className="founder-overlay">
                  <h4>DINDAYAL</h4>
                  <span>Co-Founder & Technical Lead</span>
                </div>
              </div>

              {/* BACK: MANMOHAN */}
              <div className="photo-back">
                <img src={manmohanImg} alt="Manmohan - Co-Founder & Product Lead" />
                <div className="founder-overlay">
                  <h4>MANMOHAN</h4>
                  <span>Co-Founder & Product Lead</span>
                </div>
              </div>
            </div>
          </div>

          {/* FOUNDER TOGGLE PILLS & AUTO-FLIP INDICATOR */}
          <div className="founder-toggle-bar">
            <button
              type="button"
              className={`founder-pill ${!flip ? "active" : ""}`}
              onClick={() => setFlip(false)}
            >
              Dindayal
            </button>
            <button
              type="button"
              className="founder-switch-btn"
              onClick={() => setFlip((prev) => !prev)}
              title="Switch Founder"
            >
              <FaSyncAlt className="switch-icon" />
            </button>
            <button
              type="button"
              className={`founder-pill ${flip ? "active" : ""}`}
              onClick={() => setFlip(true)}
            >
              Manmohan
            </button>
          </div>

          <p className="flip-hint">
            🔄 Auto-alternating · Click card or pill to switch
          </p>
        </div>

        <div className="text-about">
          <div className="about-highlight">
            DESIGN · DEVELOPMENT · TECHNOLOGY · AUTOMATION
          </div>
          <p>
            WebSutra is a digital technology studio focused on transforming ideas into useful, scalable and beautiful digital products.
          </p>
          <p>
            From websites and web applications to business software, automation and AI-powered solutions, we build digital experiences around real-world problems.
          </p>

          <div className="founders-info-list">
            <div className={`founder-info-item ${!flip ? "highlighted-founder" : ""}`}>
              <strong>DINDAYAL</strong> <span className="founder-role">— Co-Founder & Technical Lead</span>
              <p className="founder-desc">Focused on building high-performance architectures, web applications, SaaS systems, and digital engineering.</p>
            </div>
            <div className={`founder-info-item ${flip ? "highlighted-founder" : ""}`}>
              <strong>MANMOHAN</strong> <span className="founder-role">— Co-Founder & Product Lead</span>
              <p className="founder-desc">Focused on product strategy, UI/UX experiences, digital growth, and innovative technology solutions.</p>
            </div>
          </div>
        </div>
      </div>

      <Skills />
    </section>
  );
}

export default About;