import React, { useState } from "react";
import "./Contact.css";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCheckCircle, 
  FaSpinner, 
  FaWhatsapp, 
  FaTimes, 
  FaUserCheck, 
  FaArrowRight 
} from "react-icons/fa";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Save locally in DataContext for the Admin Panel
    addEnquiry(formData);

    // 2. Also send directly to the founder's email via FormSubmit API
    try {
      const targetEmail = socialLinks.email || "contact@websutra.in";
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New WebSutra Project Request from ${formData.name}`,
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone || "Not provided",
          Company: formData.company || "Not provided",
          Service_Needed: formData.service,
          Message: formData.message,
          _template: "table"
        })
      });
    } catch (err) {
      console.warn("Email dispatch notice:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const getCustomWhatsAppUrl = (founderName, phone) => {
    let customText = `Hello ${founderName}, I am interested in building a project with WebSutra. I would like to discuss my requirements.`;
    
    if (formData.name.trim() || formData.message.trim()) {
      const clientName = formData.name.trim() ? ` My name is ${formData.name.trim()}.` : "";
      const selectedService = formData.service ? ` I am looking for ${formData.service} solutions.` : "";
      const userMsg = formData.message.trim() ? ` Details: "${formData.message.trim()}"` : "";
      customText = `Hello ${founderName}!${clientName} I am interested in collaborating with WebSutra.${selectedService}${userMsg}`;
    }

    return `https://wa.me/91${phone}?text=${encodeURIComponent(customText)}`;
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

          <div 
            className="info-item clickable-phone" 
            onClick={() => setShowWhatsAppModal(true)}
            title="Click to chat or call founders"
          >
            <FaPhone className="contact-icon" />
            <span>+91 91427 22049 / +91 76312 40967</span>
          </div>

          <div className="info-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>{socialLinks.location || "INDIA · WORKING GLOBALLY"}</span>
          </div>

          {/* DEDICATED WHATSAPP BUTTON */}
          <div className="whatsapp-cta-block">
            <button 
              type="button" 
              className="btn-whatsapp-direct"
              onClick={() => setShowWhatsAppModal(true)}
            >
              <FaWhatsapp className="wa-btn-icon" />
              <span>Chat Directly on WhatsApp</span>
            </button>
            <span className="wa-cta-hint">Instant reply from our founders</span>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="form-success-box">
              <FaCheckCircle className="success-icon" />
              <h3>Thanks for reaching out!</h3>
              <p>Your project enquiry has been submitted. Our team will get back to you shortly.</p>
              <div className="success-action-buttons">
                <button
                  type="button"
                  className="btn-whatsapp-followup"
                  onClick={() => setShowWhatsAppModal(true)}
                >
                  <FaWhatsapp /> Fast Track on WhatsApp
                </button>
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

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <FaSpinner className="spinning" style={{ marginRight: "8px" }} /> Sending...
                  </>
                ) : (
                  "SEND PROJECT REQUEST"
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* WHATSAPP FOUNDER SELECTION MODAL */}
      {showWhatsAppModal && (
        <div className="wa-modal-overlay" onClick={() => setShowWhatsAppModal(false)}>
          <div className="wa-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="wa-modal-header">
              <div className="wa-header-title">
                <FaWhatsapp className="wa-title-icon" />
                <h3>Connect on WhatsApp</h3>
              </div>
              <button 
                type="button" 
                className="wa-close-btn" 
                onClick={() => setShowWhatsAppModal(false)}
                title="Close"
              >
                <FaTimes />
              </button>
            </div>

            <p className="wa-modal-subtext">
              Select a founder to start an instant WhatsApp conversation regarding your project:
            </p>

            <div className="wa-founder-options">
              {/* OPTION 1: DINDAYAL */}
              <a
                href={getCustomWhatsAppUrl("Dindayal", "9142722049")}
                target="_blank"
                rel="noreferrer"
                className="wa-founder-btn"
                onClick={() => setShowWhatsAppModal(false)}
              >
                <div className="wa-founder-avatar">
                  <FaUserCheck />
                </div>
                <div className="wa-founder-info">
                  <h4>Dindayal</h4>
                  <span className="wa-founder-role">Co-Founder & Technical Lead</span>
                  <span className="wa-founder-phone">+91 91427 22049</span>
                </div>
                <div className="wa-go-arrow">
                  <FaArrowRight />
                </div>
              </a>

              {/* OPTION 2: MANMOHAN */}
              <a
                href={getCustomWhatsAppUrl("Manmohan", "7631240967")}
                target="_blank"
                rel="noreferrer"
                className="wa-founder-btn"
                onClick={() => setShowWhatsAppModal(false)}
              >
                <div className="wa-founder-avatar">
                  <FaUserCheck />
                </div>
                <div className="wa-founder-info">
                  <h4>Manmohan</h4>
                  <span className="wa-founder-role">Co-Founder & Product Lead</span>
                  <span className="wa-founder-phone">+91 76312 40967</span>
                </div>
                <div className="wa-go-arrow">
                  <FaArrowRight />
                </div>
              </a>
            </div>

            <div className="wa-modal-footer">
              <p>💬 An automated customized message will be pre-filled for you on WhatsApp.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;