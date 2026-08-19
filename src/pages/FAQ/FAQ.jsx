import React, { useState } from "react";
import "./FAQ.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    q: "WHAT KIND OF WEBSITES DO YOU BUILD?",
    a: "We build everything from simple business websites and landing pages to advanced web applications and custom digital platforms."
  },
  {
    q: "CAN YOU BUILD CUSTOM SOFTWARE?",
    a: "Yes. We can design and develop custom software around specific business requirements."
  },
  {
    q: "CAN YOU WORK ON AN EXISTING WEBSITE?",
    a: "Yes. We can redesign, improve, optimize, fix and extend existing websites."
  },
  {
    q: "DO YOU PROVIDE SEO?",
    a: "Yes. We provide technical SEO, on-page optimization, performance optimization and SEO support."
  },
  {
    q: "CAN YOU BUILD BOOKING SYSTEMS?",
    a: "Yes. Custom booking, appointment, ticketing and reservation systems can be developed."
  },
  {
    q: "DO YOU BUILD ADMIN PANELS?",
    a: "Yes. We build custom dashboards and admin panels for managing users, content, bookings, orders, data and business operations."
  },
  {
    q: "DO YOU PROVIDE MAINTENANCE?",
    a: "Yes. Ongoing maintenance, updates, bug fixing and technical support are available."
  },
  {
    q: "DO YOU WORK WITH CLIENTS OUTSIDE INDIA?",
    a: "Yes. WebSutra can work remotely with clients in India and around the world."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="title">
        <h2>FREQUENTLY ASKED QUESTIONS</h2>
      </div>

      <div className="faq-container">
        {faqs.map((item, idx) => (
          <div
            className={`faq-item ${openIndex === idx ? "open" : ""}`}
            key={idx}
            onClick={() => toggleFAQ(idx)}
          >
            <div className="faq-question">
              <h4>{item.q}</h4>
              <span className="faq-icon">
                {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {openIndex === idx && (
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
