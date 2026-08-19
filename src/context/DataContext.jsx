import React, { createContext, useContext, useState, useEffect } from "react";

export const initialProjects = [
  {
    id: "proj-1",
    title: "Successwala library",
    category: "Management",
    desc: "Successwala Library — A modern library management platform with digital seat booking, QR attendance, seat availability, membership/fee tracking, renewal reminders, and an admin dashboard.",
    skills: ["PHP", "HTML", "CSS", "JavaScript", "SQL"],
    githubUrl: "https://github.com",
    demoUrl: "https://websutra.in",
    img: "https://images.unsplash.com/photo-1507842229451-7f01dd8620d8?w=800&q=80"
  },
  {
    id: "proj-2",
    title: "Successwala blogs",
    category: "WordPress",
    desc: "Successwala Blogs — A modern WordPress educational news portal featuring dynamic categories, latest/trending posts, exam notifications, results, jobs, study materials, SEO optimization, and responsive design.",
    skills: ["PHP", "HTML", "CSS", "JavaScript", "SQL", "WordPress"],
    githubUrl: "https://github.com",
    demoUrl: "https://websutra.in",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"
  },
  {
    id: "proj-3",
    title: "Tuition Fee Management",
    category: "Node.js SaaS",
    desc: "Education Manager is a modern multi-tenant SaaS platform designed for tuition centers, coaching institutes, and schools. It seamlessly streamlines student admissions, automated fee billing, dynamic UPI QR payments, digital receipt generation, and 1-click WhatsApp reminders. With dedicated Master Admin controls and real-time financial reporting, it empowers institutions to manage their entire academic and fee operations securely and effortlessly.",
    skills: ["JavaScript", "Node.js", "Express.js", "REST API", "npm", "MongoDB", "SQL", "JSON"],
    githubUrl: "https://github.com",
    demoUrl: "https://websutra.in",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
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
  const [projects, setProjects] = useState(initialProjects);

  const [socialLinks, setSocialLinks] = useState(() => {
    try {
      const saved = localStorage.getItem("websutra_social_v3");
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
      const saved = localStorage.getItem("websutra_enquiries_v3");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      const legacySaved = localStorage.getItem("websutra_enquiries");
      if (legacySaved) {
        const parsed = JSON.parse(legacySaved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error parsing stored enquiries", e);
    }
    return [
      {
        id: "enq-sample-1",
        name: "Manmohan & Dindayal (Founder Test)",
        email: "contact@websutra.in",
        phone: "+91 98765 43210",
        company: "WebSutra Studios",
        service: "Web Application",
        message: "Welcome to WebSutra Enquiries! New visitor submissions via the contact form will appear here in real time.",
        date: "Today at " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      }
    ];
  });


  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem("websutra_admin_auth") === "true";
  });

  // Dynamically load fresh projects from /projects.json on every page visit
  useEffect(() => {
    const fetchLiveProjects = async () => {
      try {
        const res = await fetch(`/projects.json?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            setProjects(liveData);
          }
        }
      } catch (err) {
        console.warn("Could not fetch remote projects.json, using codebase initial data:", err);
      }
    };
    fetchLiveProjects();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("websutra_social_v3", JSON.stringify(socialLinks));
    } catch (e) {
      console.error("Failed to save social links:", e);
    }
  }, [socialLinks]);

  useEffect(() => {
    try {
      localStorage.setItem("websutra_enquiries_v3", JSON.stringify(enquiries));
    } catch (e) {
      console.error("Failed to save enquiries:", e);
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
    localStorage.removeItem("websutra_enquiries_v3");
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("websutra_admin_auth");
  };

  const resetToDefaults = () => {
    setProjects(initialProjects);
    setSocialLinks(initialSocialLinks);
    localStorage.removeItem("websutra_projects_v3");
    localStorage.removeItem("websutra_social_v3");
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        setProjects,
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
