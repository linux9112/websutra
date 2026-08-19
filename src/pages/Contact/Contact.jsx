import React, { useState } from "react";
import "./Contact.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { useData } from "../../context/DataContext";

function Contact() {
  const { socialLinks, addEnquiry } = useData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Website",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnquiry(formData);
    setSubmitted(true);
  };


  return (
    <section className="contact" id="contact">
      <div className="title">
        <h2>HAVE AN IDEA?</h2>
      </div>

      <div className="contact-cta-subtitle">
        <h3>LET'S BUILD IT.</h3>
        <p>Tell us what you're trying to build. We'll help turn the idea into a clear digital solution.</p>
      </div>

      <div className="contact-container">
        {/* LEFT INFO */}
        <div className="contact-info">
          <h3>START A CONVERSATION</h3>

          <p>
            Ready to bring your project to life? Share your vision with us and let's craft something remarkable.
          </p>

          <div className="info-item">
            <FaEnvelope className="contact-icon" />
            <span>{socialLinks.email || "contact@websutra.in"}</span>
          </div>

          <div className="info-item">
            <FaPhone className="contact-icon" />
            <span>{socialLinks.phone || "+91 98765 43210"}</span>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>{socialLinks.location || "INDIA · WORKING GLOBALLY"}</span>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="form-success-box">
              <FaCheckCircle className="success-icon" />
              <h3>Thanks for reaching out.</h3>
              <p>We'll get back to you soon.</p>
              <button
                type="button"
                className="btn-send-another"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    service: "Website",
                    message: ""
                  });
                }}
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />

                <input
                  type="email"
                  placeholder="Your Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-row">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />

                <input
                  type="text"
                  placeholder="Company / Business"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="select-label">What do you need?</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="service-select"
                >
                  <option value="Website">Website</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Business Software">Business Software</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="SEO">SEO</option>
                  <option value="AI / Automation">AI / Automation</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <textarea
                placeholder="Project Description *"
                rows="5"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>

              <button type="submit">
                SEND PROJECT REQUEST
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;