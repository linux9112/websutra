import { useState } from "react";
import "./About.css";
import Skills from "./Skills";
import dindayalImg from "../../assets/images/dindayal.jpg";
import manmohanImg from "../../assets/images/manmohan.jpg";

function About() {
  const [flip, setFlip] = useState(false);

  return (
    <section className="about" id="about">
      <div className="title">
        <h2>MORE THAN JUST WEBSITES.</h2>
      </div>

      <div className="content">
        <div className="founders-wrapper">
          <div
            className="photo-card"
            onClick={() => setFlip(!flip)}
            title="Click to flip founder profile"
          >
            <div className={flip ? "photo-inner flip" : "photo-inner"}>
              {/* FRONT: DINDAYAL */}
              <div className="photo-front">
                <img src={dindayalImg} alt="Dindayal - Co-Founder" />
                <div className="founder-overlay">
                  <h4>DINDAYAL</h4>
                  <span>Co-Founder</span>
                </div>
              </div>

              {/* BACK: MANMOHAN */}
              <div className="photo-back">
                <img src={manmohanImg} alt="Manmohan - Co-Founder" />
                <div className="founder-overlay">
                  <h4>MANMOHAN</h4>
                  <span>Co-Founder</span>
                </div>
              </div>
            </div>
          </div>
          <p className="flip-hint">👆 Click card to flip (Dindayal / Manmohan)</p>
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
            <div className="founder-info-item">
              <strong>DINDAYAL</strong> <span className="founder-role">— Co-Founder</span>
              <p className="founder-desc">Focused on building digital products, web experiences and technology solutions.</p>
            </div>
            <div className="founder-info-item">
              <strong>MANMOHAN</strong> <span className="founder-role">— Co-Founder</span>
              <p className="founder-desc">Focused on building digital products, creative solutions and technology experiences.</p>
            </div>
          </div>
        </div>
      </div>

      <Skills />
    </section>
  );
}

export default About;