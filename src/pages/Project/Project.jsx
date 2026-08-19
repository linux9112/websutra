import "./Project.css";
import { useData } from "../../context/DataContext";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Project() {
  const { projects } = useData();

  return (
    <section className="project reveal" id="projects">
      <div className="title">
        <h2>SELECTED WORK</h2>
      </div>

      <p className="section-intro">
        A few digital products and experiences we've built.
      </p>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div className="project-card" key={project.id || index}>
            <div className="project-img-wrap">
              <img src={project.img} alt={project.title} />
              {project.category && (
                <span className="project-category-tag">{project.category}</span>
              )}
            </div>

            <h3>{project.title}</h3>

            <p>{project.desc}</p>

            <div className="skills">
              {Array.isArray(project.skills) &&
                project.skills.map((skill, i) => (
                  <span className="skill-pill" key={i}>{skill}</span>
                ))}
            </div>

            <div className="btns">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  <FaGithub /> GitHub
                </a>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-demo"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}