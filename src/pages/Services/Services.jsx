import React from "react";
import "./Services.css";
import { 
  FaGlobe, 
  FaLaptopCode, 
  FaMobileAlt, 
  FaShoppingCart, 
  FaBriefcase, 
  FaRobot,
  FaPalette,
  FaWordpress,
  FaSearch,
  FaPlug,
  FaCloud,
  FaTools
} from "react-icons/fa";

const whatWeBuild = [
  {
    icon: <FaGlobe className="service-icon" />,
    title: "WEBSITES",
    desc: "Business websites, portfolios, landing pages, blogs, news platforms, educational websites, event websites and custom websites."
  },
  {
    icon: <FaLaptopCode className="service-icon" />,
    title: "WEB APPLICATIONS",
    desc: "Dashboards, booking systems, management systems, customer portals, membership systems, CRM systems and custom web applications."
  },
  {
    icon: <FaMobileAlt className="service-icon" />,
    title: "MOBILE APPS",
    desc: "Android, iOS and cross-platform applications for businesses, services, communities and digital products."
  },
  {
    icon: <FaShoppingCart className="service-icon" />,
    title: "E-COMMERCE",
    desc: "Online stores, product catalogs, checkout systems, payment integration, order management, coupons and inventory systems."
  },
  {
    icon: <FaBriefcase className="service-icon" />,
    title: "BUSINESS SOFTWARE",
    desc: "CRM, inventory, billing, attendance, employee management, customer management, reporting and custom business systems."
  },
  {
    icon: <FaRobot className="service-icon" />,
    title: "AI & AUTOMATION",
    desc: "AI integrations, chatbots, intelligent workflows, business automation, notifications and custom AI-powered tools."
  }
];

const serviceCategories = [
  {
    icon: <FaGlobe />,
    title: "Web Development",
    items: ["Business Websites", "Corporate Websites", "Portfolio Websites", "Landing Pages", "Blogs", "News & Magazine Websites", "Educational Websites", "Event Websites", "Custom Websites"]
  },
  {
    icon: <FaLaptopCode />,
    title: "Application Development",
    items: ["Web Applications", "Dashboards", "Admin Panels", "Booking Systems", "Appointment Systems", "Customer Portals", "Membership Systems", "Management Systems"]
  },
  {
    icon: <FaShoppingCart />,
    title: "E-Commerce",
    items: ["Online Stores", "WooCommerce", "Product Catalogs", "Payment Integration", "Order Management", "Coupon Systems", "Inventory Management"]
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Development",
    items: ["Android Apps", "iOS Apps", "Cross-Platform Apps", "Business Apps", "Utility Apps", "Customer Apps"]
  },
  {
    icon: <FaPalette />,
    title: "UI/UX Design",
    items: ["Website Design", "Mobile UI", "Dashboard UI", "Admin Panel Design", "Wireframes", "Prototypes", "Design Systems", "Responsive Design"]
  },
  {
    icon: <FaWordpress />,
    title: "WordPress",
    items: ["WordPress Development", "Theme Customization", "WooCommerce", "Performance Optimization", "Security", "Migration", "Maintenance", "Custom Features"]
  },
  {
    icon: <FaSearch />,
    title: "SEO & Growth",
    items: ["Technical SEO", "On-Page SEO", "Keyword Research", "Content Strategy", "Technical Audits", "Performance Optimization", "Local SEO", "Search Console Setup"]
  },
  {
    icon: <FaRobot />,
    title: "AI & Automation",
    items: ["AI Chatbots", "AI API Integration", "AI Search", "AI Content Systems", "Business Automation", "Workflow Automation", "Notifications", "Custom AI Tools"]
  },
  {
    icon: <FaPlug />,
    title: "API & Integrations",
    items: ["Payment Gateways", "Google Services", "Maps", "WhatsApp", "Email", "SMS", "Authentication", "Third-Party APIs"]
  },
  {
    icon: <FaCloud />,
    title: "Cloud & Backend",
    items: ["REST APIs", "Database Systems", "PostgreSQL", "MySQL", "Supabase", "Firebase", "Authentication", "Cloud Deployment"]
  },
  {
    icon: <FaTools />,
    title: "Maintenance & Support",
    items: ["Bug Fixing", "Security Updates", "Performance Optimization", "Backups", "Website Updates", "Feature Development", "Technical Support"]
  }
];

export default function Services() {
  return (
    <section className="services" id="services">
      {/* WHAT WE BUILD */}
      <div className="title">
        <h2>WHAT WE BUILD</h2>
      </div>
      <p className="section-intro">
        From a simple digital presence to a complete business platform, we turn ideas into working products.
      </p>

      <div className="services-grid">
        {whatWeBuild.map((item, idx) => (
          <div className="service-card" key={idx}>
            {item.icon}
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* OUR SERVICES */}
      <div className="title sub-section-title">
        <h2>OUR SERVICES</h2>
      </div>
      <p className="section-intro">
        Everything you need to design, build, launch and grow your digital presence.
      </p>

      <div className="categories-grid">
        {serviceCategories.map((cat, idx) => (
          <div className="category-card" key={idx}>
            <div className="cat-header">
              <span className="cat-icon">{cat.icon}</span>
              <h3>{cat.title}</h3>
            </div>
            <ul className="cat-items">
              {cat.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}