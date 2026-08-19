import React from "react";
import "./Process.css";

const steps = [
  {
    num: "01",
    title: "DISCOVER",
    desc: "Understand your idea, business and goals."
  },
  {
    num: "02",
    title: "PLAN",
    desc: "Define the features, technology and project structure."
  },
  {
    num: "03",
    title: "DESIGN",
    desc: "Create the interface and user experience."
  },
  {
    num: "04",
    title: "BUILD",
    desc: "Develop the website, application or digital system."
  },
  {
    num: "05",
    title: "TEST",
    desc: "Check functionality, responsiveness, performance and security."
  },
  {
    num: "06",
    title: "LAUNCH",
    desc: "Deploy the final product and make it ready for users."
  },
  {
    num: "07",
    title: "GROW",
    desc: "Continue improving, maintaining and expanding the product."
  }
];

export default function Process() {
  return (
    <section className="process-section" id="process">
      <div className="title">
        <h2>HOW WE BUILD</h2>
      </div>

      <div className="process-grid">
        {steps.map((step, idx) => (
          <div className="process-card" key={idx}>
            <div className="process-num">{step.num}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
