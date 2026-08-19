import React, { createContext, useContext, useState, useEffect } from "react";

import img1 from "../assets/images/Cleveroad.jpg";
import img2 from "../assets/images/img2.jpg";
import img3 from "../assets/images/Weather Forecast Dashboard.jpg";
import img4 from "../assets/images/WordPress dashboard design concept.jpg";

export const initialProjects = [
  {
    id: "proj-1",
    title: "SUCCESSWALA",
    category: "Library Platform",
    desc: "A modern digital platform designed to manage and improve the library experience, including memberships, seats, attendance and communication.",
    skills: ["Library Platform", "Memberships", "Attendance", "Dashboard"],
    githubUrl: "https://github.com",
    demoUrl: "https://websutra.in",
    img: img1
  },
  {
    id: "proj-2",
    title: "AQUAXA",
    category: "Booking & Business Platform",
    desc: "A digital experience for a waterpark with online booking, ticket management and business operations.",
    skills: ["Booking System", "Ticket Management", "Payments", "Operations"],
    githubUrl: "https://github.com",
    demoUrl: "https://websutra.in",
    img: img2
  },
  {
    id: "proj-3",
    title: "WEDDING WEBSITES",
    category: "Digital Experiences",
    desc: "Interactive and personalized digital wedding experiences designed for modern celebrations.",
    skills: ["Digital Experiences", "Invitations", "RSVP", "Galleries"],
    githubUrl: "https://github.com",
    demoUrl: "https://websutra.in",
    img: img3
  },
  {
    id: "proj-4",
    title: "CUSTOM WEB APPLICATIONS",
    category: "Web Applications",
    desc: "Custom-built digital platforms designed around specific business and user requirements.",
    skills: ["Web Applications", "Custom Software", "APIs", "Cloud Backend"],
    githubUrl: "https://github.com",
    demoUrl: "https://websutra.in",
    img: img4
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
    const saved = localStorage.getItem("websutra_projects");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing stored projects", e);
      }
    }
    return initialProjects;
  });

  const [socialLinks, setSocialLinks] = useState(() => {
    const saved = localStorage.getItem("websutra_social");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing stored social links", e);
      }
    }
    return initialSocialLinks;
  });

  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem("websutra_enquiries");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing stored enquiries", e);
      }
    }
    return [
      {
        id: "enq-demo-1",
        name: "Aarav Sharma",
        email: "aarav@example.com",
        phone: "+91 98765 12345",
        company: "Apex Innovations",
        service: "Web Application",
        message: "We need a custom dashboard and booking system built for our business.",
        date: "Today at 01:15 PM"
      }
    ];
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem("websutra_admin_auth") === "true";
  });

  useEffect(() => {
    localStorage.setItem("websutra_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("websutra_social", JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    localStorage.setItem("websutra_enquiries", JSON.stringify(enquiries));
  }, [enquiries]);

  const addProject = (newProj) => {
    setProjects((prev) => [
      ...prev,
      { ...newProj, id: "proj-" + Date.now() }
    ]);
  };

  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
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
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
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
