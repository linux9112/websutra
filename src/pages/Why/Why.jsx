import React from "react";
import "./Why.css";
import { FaLightbulb, FaPaintBrush, FaCogs, FaChartLine, FaRocket, FaUserCheck } from "react-icons/fa";

const whyItems = [
  {
    icon: <FaLightbulb className="why-icon" />,
    title: "BUILT AROUND YOUR IDEA",
    desc: "We start by understanding the problem before deciding what technology to use."
  },
  {
    icon: <FaPaintBrush className="why-icon" />,
    title: "DESIGN THAT SERVES",
    desc: "Beautiful interfaces should also be simple and useful."
  },
  {
    icon: <FaCogs className="why-icon" />,
    title: "TECHNOLOGY THAT FITS",
    desc: "We choose technology according to the project's actual requirements."
  },
  {
    icon: <FaChartLine className="why-icon" />,
    title: "BUILT TO GROW",
    desc: "Our systems are designed with future improvements and scalability in mind."
  },
  {
    icon: <FaRocket className="why-icon" />,
    title: "FROM IDEA TO LAUNCH",
    desc: "Design, development, deployment and ongoing support in one place."
  },
  {
    icon: <FaUserCheck className="why-icon" />,
    title: "HUMAN SUPPORT",
    desc: "You work directly with the people building your product."
  }
];

export default function Why() {
  return (
    <section className="why-section" id="why">
      <div className="title">
        <h2>WHY WEBSUTRA?</h2>
      </div>

      <div className="why-grid">
        {whyItems.map((item, idx) => (
          <div className="why-card" key={idx}>
            <div className="why-icon-wrap">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
