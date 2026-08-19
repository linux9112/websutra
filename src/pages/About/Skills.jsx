import "./Skills.css";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaNodeJs,
  FaPython,
  FaWordpress
} from "react-icons/fa";

import {
  SiTypescript,
  SiNextdotjs,
  SiVite,
  SiPhp,
  SiWoocommerce,
  SiSupabase,
  SiFirebase,
  SiPostgresql,
  SiMysql,
  SiCloudflare,
  SiVercel
} from "react-icons/si";

function Skills() {
  const toolsList = [
    { icon: <FaHtml5 title="HTML" />, name: "HTML" },
    { icon: <FaCss3Alt title="CSS" />, name: "CSS" },
    { icon: <FaJs title="JavaScript" />, name: "JavaScript" },
    { icon: <SiTypescript title="TypeScript" />, name: "TypeScript" },
    { icon: <FaReact title="React" />, name: "React" },
    { icon: <SiNextdotjs title="Next.js" />, name: "Next.js" },
    { icon: <SiVite title="Vite" />, name: "Vite" },
    { icon: <FaNodeJs title="Node.js" />, name: "Node.js" },
    { icon: <FaPython title="Python" />, name: "Python" },
    { icon: <SiPhp title="PHP" />, name: "PHP" },
    { icon: <FaWordpress title="WordPress" />, name: "WordPress" },
    { icon: <SiWoocommerce title="WooCommerce" />, name: "WooCommerce" },
    { icon: <SiSupabase title="Supabase" />, name: "Supabase" },
    { icon: <SiFirebase title="Firebase" />, name: "Firebase" },
    { icon: <SiPostgresql title="PostgreSQL" />, name: "PostgreSQL" },
    { icon: <SiMysql title="MySQL" />, name: "MySQL" },
    { icon: <FaGitAlt title="Git" />, name: "Git" },
    { icon: <FaGithub title="GitHub" />, name: "GitHub" },
    { icon: <SiCloudflare title="Cloudflare" />, name: "Cloudflare" },
    { icon: <SiVercel title="Vercel" />, name: "Vercel" }
  ];

  return (
    <div className="skills">
      <h3>TOOLS WE BUILD WITH</h3>
      <div className="skills-slider">
        <div className="skills-track">
          {toolsList.concat(toolsList).map((tool, idx) => (
            <div className="skill-item" key={idx} title={tool.name}>
              {tool.icon}
              <span className="skill-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;