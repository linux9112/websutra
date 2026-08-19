import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useData } from "../../context/DataContext";

function Footer() {
  const { socialLinks } = useData();

  return (
    <footer className="footer">
      <div className="footer-top-container">
        {/* BRAND & TAGLINE */}
        <div className="footer-brand">
          <div className="footer-logo">
            <h2><span>Web</span>Sutra</h2>
          </div>
          <p className="footer-tagline">
            Weaving Ideas Into Digital Experiences.
          </p>
          <div className="social-icons">
            {socialLinks.github && (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" title="GitHub">
                <FaGithub />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" title="Instagram">
                <FaInstagram />
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
                <FaLinkedin />
              </a>
            )}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Web Development</a></li>
            <li><a href="#services">Web Applications</a></li>
            <li><a href="#services">Mobile Apps</a></li>
            <li><a href="#services">E-Commerce</a></li>
            <li><a href="#services">AI & Automation</a></li>
            <li><a href="#services">SEO</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-container">
        <p>© 2026 WebSutra. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;