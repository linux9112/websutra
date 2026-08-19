import React, { createContext, useContext, useState, useEffect } from "react";

import img1 from "../assets/images/Cleveroad.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/Weather Forecast Dashboard.jpg";
import img4 from "../assets/images/WordPress dashboard design concept.jpg";

export const initialProjects = [
  {
    id: "proj-1",
    title: "Successwala library",
    category: "Management",
    desc: "Successwala Library — A modern library management platform with digital seat booking, QR attendance, seat availability, membership/fee tracking, renewal reminders, and an admin dashboard.",
    skills: ["PHP", "HTML", "CSS", "JavaScript", "SQL"],
    githubUrl: "https://github.com",
    demoUrl: "https://websutra.in",
    img: img1
  },
  {
    id: "proj-2",
    title: "Successwala blogs",
    category: "WordPress",
    desc: "Successwala Blogs — A modern WordPress educational news portal featuring dynamic categories, latest/trending posts, exam notifications, results, jobs, study materials, SEO optimization, and responsive design.",
    skills: ["PHP", "HTML", "CSS", "JavaScript", "SQL", "WordPress"],
    githubUrl: "https://github.com",
    demoUrl: "https://websutra.in",
    img: img4
  },
  {
    id: "proj-3",
    title: "Tuition Fee Management",
    category: "Node.js SaaS",
    desc: "Education Manager is a modern multi-tenant SaaS platform designed for tuition centers, coaching institutes, and schools. It seamlessly streamlines student admissions, automated fee billing, dynamic UPI QR payments, digital receipt generation, and 1-click WhatsApp reminders. With dedicated Master Admin controls and real-time financial reporting, it empowers institutions to manage their entire academic and fee operations securely and effortlessly.",
    skills: ["JavaScript", "Node.js", "Express.js", "REST API", "npm", "MongoDB", "SQL", "JSON"],
    githubUrl: "https://github.com",
    demoUrl: "https://websutra.in",
    img: img2
  }
];

export const initialSocialLinks = {
  github: "https://github.com",
  instagram: "https://instagram.com",
  linkedin: "https://linkedin.com",
  email: "contact@websutra.in",
  phone: "+91 98765 43210",
  location: "INDIA · WORKING GLOBALLY"
};

const DataContext = createContext();

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem("websutra_projects");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error parsing stored projects", e);
    }
    return initialProjects;
  });

  const [socialLinks, setSocialLinks] = useState(() => {
    try {
      const saved = localStorage.getItem("websutra_social");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error parsing stored social links", e);
    }
    return initialSocialLinks;
  });

  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem("websutra_enquiries");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error parsing stored enquiries", e);
    }
    return [];
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem("websutra_admin_auth") === "true";
  });

  // Sync projects to localStorage reliably
  useEffect(() => {
    try {
      localStorage.setItem("websutra_projects", JSON.stringify(projects));
    } catch (e) {
      console.error("Failed to save projects to localStorage:", e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem("websutra_social", JSON.stringify(socialLinks));
    } catch (e) {
      console.error("Failed to save social links to localStorage:", e);
    }
  }, [socialLinks]);

  useEffect(() => {
    try {
      localStorage.setItem("websutra_enquiries", JSON.stringify(enquiries));
    } catch (e) {
      console.error("Failed to save enquiries to localStorage:", e);
    }
  }, [enquiries]);

  const addProject = (newProj) => {
    const projectWithId = {
      ...newProj,
      id: "proj-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5)
    };
    setProjects((prev) => [projectWithId, ...prev]);
  };

  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (String(p.id) === String(id)) {
          return {
            ...p,
            ...updatedFields,
            id: p.id
          };
        }
        return p;
      })
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  const updateSocialLinks = (newLinks) => {
    setSocialLinks((prev) => ({ ...prev, ...newLinks }));
  };

  const addEnquiry = (enquiryData) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }) + " at " + now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });

    const newEnq = {
      id: "enq-" + Date.now(),
      ...enquiryData,
      date: formattedDate
    };

    setEnquiries((prev) => [newEnq, ...prev]);
    return newEnq;
  };

  const deleteEnquiry = (id) => {
    setEnquiries((prev) => prev.filter((e) => String(e.id) !== String(id)));
  };

  const clearEnquiries = () => {
    setEnquiries([]);
    localStorage.removeItem("websutra_enquiries");
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("websutra_admin_auth");
  };

  const resetToDefaults = () => {
    setProjects(initialProjects);
    setSocialLinks(initialSocialLinks);
    localStorage.removeItem("websutra_projects");
    localStorage.removeItem("websutra_social");
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        socialLinks,
        enquiries,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        adminLogout,
        addProject,
        updateProject,
        deleteProject,
        updateSocialLinks,
        addEnquiry,
        deleteEnquiry,
        clearEnquiries,
        resetToDefaults
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
