import React, { useState, useEffect, useRef } from "react";
import "./AdminModal.css";
import { useData } from "../context/DataContext";
import { 
  FaTimes, 
  FaTrash, 
  FaEdit, 
  FaSave, 
  FaUndo, 
  FaLink, 
  FaGithub, 
  FaInstagram, 
  FaLinkedin, 
  FaLock, 
  FaUnlockAlt, 
  FaKey, 
  FaEye, 
  FaEyeSlash,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaCalendarAlt,
  FaInbox,
  FaTag,
  FaImage,
  FaUpload
} from "react-icons/fa";

const ADMIN_PASSWORD = "#Rajarani1";

export default function AdminModal() {
  const {
    projects,
    socialLinks,
    enquiries = [],
    isAdminOpen,
    setIsAdminOpen,
    addProject,
    updateProject,
    deleteProject,
    updateSocialLinks,
    deleteEnquiry,
    clearEnquiries,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    adminLogout,
    resetToDefaults
  } = useData();

  const fileInputRef = useRef(null);

  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState("projects");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "",
    desc: "",
    skills: "",
    githubUrl: "",
    demoUrl: "",
    img: ""
  });

  const [socialForm, setSocialForm] = useState({ ...socialLinks });
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (isAdminOpen) {
      setPasswordError("");
      setPasswordInput("");
    }
  }, [isAdminOpen]);

  if (!isAdminOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("websutra_admin_auth", "true");
      setPasswordError("");
      setPasswordInput("");
      showToast("Access Granted. Welcome to Admin Control!");
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    adminLogout();
    setPasswordInput("");
    setPasswordError("");
    showToast("Admin session locked.");
  };


  const handleEditClick = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title || "",
      category: proj.category || "",
      desc: proj.desc || "",
      skills: Array.isArray(proj.skills) ? proj.skills.join(", ") : proj.skills || "",
      githubUrl: proj.githubUrl || "",
      demoUrl: proj.demoUrl || "",
      img: proj.img || ""
    });
    // Scroll smoothly to form
    const formEl = document.querySelector(".admin-card-box");
    if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: "",
      category: "",
      desc: "",
      skills: "",
      githubUrl: "",
      demoUrl: "",
      img: ""
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Image Upload handler (converts local file to Base64)
  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please choose an image file (PNG, JPG, WebP)");
      return;
    }

    // Limit to 2MB to keep localStorage lightweight
    if (file.size > 2 * 1024 * 1024) {
      showToast("Image size is large. Using compression...");
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target.result;
      setProjectForm((prev) => ({
        ...prev,
        img: base64Url
      }));
      showToast("Image uploaded and preview updated!");
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProject = (e) => {
    e.preventDefault();
    const skillsArray = projectForm.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const projectData = {
      title: projectForm.title,
      category: projectForm.category,
      desc: projectForm.desc,
      skills: skillsArray,
      githubUrl: projectForm.githubUrl,
      demoUrl: projectForm.demoUrl,
      img: projectForm.img || projects[0]?.img || ""
    };

    if (editingProjectId) {
      updateProject(editingProjectId, projectData);
      showToast("Project updated successfully!");
    } else {
      addProject(projectData);
      showToast("New project added successfully!");
    }

    handleCancelEdit();
  };

  const handleDeleteProject = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
      showToast("Project deleted.");
      if (editingProjectId === id) {
        handleCancelEdit();
      }
    }
  };

  const handleDeleteEnquiry = (id, clientName) => {
    if (window.confirm(`Delete enquiry from "${clientName}"?`)) {
      deleteEnquiry(id);
      showToast("Enquiry deleted.");
    }
  };

  const handleClearAllEnquiries = () => {
    if (window.confirm("Are you sure you want to delete all enquiries?")) {
      clearEnquiries();
      showToast("All enquiries cleared.");
    }
  };

  const handleSaveSocial = (e) => {
    e.preventDefault();
    updateSocialLinks(socialForm);
    showToast("Social links & contact info updated!");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all content back to WebSutra defaults?")) {
      resetToDefaults();
      setSocialForm({
        github: "https://github.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        email: "contact@websutra.in",
        phone: "+91 98765 43210",
        location: "INDIA · WORKING GLOBALLY"
      });
      handleCancelEdit();
      showToast("Reset to default WebSutra content.");
    }
  };

  return (
    <div className="admin-overlay" onClick={() => setIsAdminOpen(false)}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="admin-header">
          <div className="admin-title">
            <h2><span>WebSutra</span> Admin Control</h2>
            <p>{isAdminAuthenticated ? "Manage inquiries, work demos, project images, and social credentials" : "Authentication Required"}</p>
          </div>
          <div className="admin-header-actions">
            {isAdminAuthenticated && (
              <button className="admin-lock-btn" onClick={handleLogout} title="Lock Admin Session">
                <FaLock /> Lock
              </button>
            )}
            <button className="admin-close-btn" onClick={() => setIsAdminOpen(false)} title="Close">
              <FaTimes />
            </button>
          </div>
        </div>

        {toastMessage && <div className="admin-toast">{toastMessage}</div>}

        {/* PASSWORD LOCK SCREEN */}
        {!isAdminAuthenticated ? (

          <div className="admin-login-wrapper">
            <div className="admin-login-box">
              <div className="admin-login-icon">
                <FaKey />
              </div>
              <h3>Enter Admin Password</h3>
              <p>Please provide the authorized password to access the WebSutra control panel.</p>

              <form onSubmit={handleLogin} className="admin-login-form">
                <div className="admin-pass-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Enter password..."
                  />
                  <button
                    type="button"
                    className="pass-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {passwordError && <div className="admin-error-text">{passwordError}</div>}

                <div className="admin-login-buttons">
                  <button type="submit" className="admin-btn-primary">
                    <FaUnlockAlt /> Unlock Dashboard
                  </button>
                  <button type="button" className="admin-btn-secondary" onClick={() => setIsAdminOpen(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="admin-tabs">
              <button
                className={`admin-tab-btn ${activeTab === "projects" ? "active" : ""}`}
                onClick={() => setActiveTab("projects")}
              >
                <FaEdit /> Selected Work ({projects.length})
              </button>
              <button
                className={`admin-tab-btn ${activeTab === "enquiries" ? "active" : ""}`}
                onClick={() => setActiveTab("enquiries")}
              >
                <FaInbox /> Enquiries {enquiries.length > 0 && <span className="tab-badge">{enquiries.length}</span>}
              </button>
              <button
                className={`admin-tab-btn ${activeTab === "social" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("social");
                  setSocialForm({ ...socialLinks });
                }}
              >
                <FaLink /> Social & Contact Links
              </button>
            </div>

            {/* Content */}
            <div className="admin-body">
              {/* PROJECTS TAB */}
              {activeTab === "projects" && (
                <div className="admin-projects-section">
                  {/* Form to Add or Edit */}
                  <div className="admin-card-box">
                    <div className="admin-form-header">
                      <h3>{editingProjectId ? "✏️ Edit Project & Cover Image" : "➕ Add New Project"}</h3>
                      {editingProjectId && (
                        <span className="editing-indicator">Editing Project ID: {editingProjectId}</span>
                      )}
                    </div>

                    <form onSubmit={handleSaveProject} className="admin-form">
                      <div className="admin-form-row">
                        <div className="admin-field">
                          <label>Project Title *</label>
                          <input
                            type="text"
                            required
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            placeholder="e.g. SUCCESSWALA"
                          />
                        </div>
                        <div className="admin-field">
                          <label>Category / Type *</label>
                          <input
                            type="text"
                            required
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            placeholder="e.g. Library Platform"
                          />
                        </div>
                      </div>

                      <div className="admin-field">
                        <label>Description *</label>
                        <textarea
                          required
                          rows="3"
                          value={projectForm.desc}
                          onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                          placeholder="Brief overview of the project..."
                        ></textarea>
                      </div>

                      <div className="admin-form-row">
                        <div className="admin-field">
                          <label>Live Demo URL</label>
                          <input
                            type="url"
                            value={projectForm.demoUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, demoUrl: e.target.value })}
                            placeholder="https://example.com"
                          />
                        </div>
                        <div className="admin-field">
                          <label>GitHub Repository URL</label>
                          <input
                            type="url"
                            value={projectForm.githubUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>

                      <div className="admin-form-row">
                        <div className="admin-field">
                          <label>Tags / Skills (comma separated)</label>
                          <input
                            type="text"
                            value={projectForm.skills}
                            onChange={(e) => setProjectForm({ ...projectForm, skills: e.target.value })}
                            placeholder="React, Next.js, Node.js, Cloud"
                          />
                        </div>

                        {/* IMAGE UPLOAD & URL EDIT SECTION */}
                        <div className="admin-field">
                          <label><FaImage /> Project Cover Image</label>
                          <div className="admin-image-input-container">
                            <div className="admin-image-preview-wrapper">
                              {projectForm.img ? (
                                <img
                                  src={projectForm.img}
                                  alt="Preview"
                                  className="admin-image-preview-thumb"
                                />
                              ) : (
                                <div className="admin-image-preview-placeholder">
                                  <FaImage />
                                  <span>No Image</span>
                                </div>
                              )}
                            </div>

                            <div className="admin-image-controls">
                              <input
                                type="text"
                                value={projectForm.img}
                                onChange={(e) => setProjectForm({ ...projectForm, img: e.target.value })}
                                placeholder="Paste image URL (https://...)"
                                className="admin-image-url-input"
                              />

                              <div className="admin-upload-actions">
                                <label className="admin-file-upload-label">
                                  <FaUpload /> Upload from Device
                                  <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleImageFileUpload}
                                    style={{ display: "none" }}
                                  />
                                </label>
                                {projectForm.img && (
                                  <button
                                    type="button"
                                    className="admin-clear-img-btn"
                                    onClick={() => {
                                      setProjectForm({ ...projectForm, img: "" });
                                      if (fileInputRef.current) fileInputRef.current.value = "";
                                    }}
                                  >
                                    Remove Image
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="admin-actions">
                        <button type="submit" className="admin-btn-primary">
                          <FaSave /> {editingProjectId ? "Update Project" : "Add Project"}
                        </button>
                        {editingProjectId && (
                          <button type="button" className="admin-btn-secondary" onClick={handleCancelEdit}>
                            Cancel Edit
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Current Projects List */}
                  <div className="admin-list-container">
                    <h3>Current Projects in "Selected Work"</h3>
                    <div className="admin-projects-grid">
                      {projects.map((proj) => (
                        <div className="admin-project-item" key={proj.id}>
                          <div className="admin-item-top">
                            <img src={proj.img} alt={proj.title} className="admin-item-thumb" />
                            <div>
                              <h4>{proj.title}</h4>
                              <span className="admin-badge">{proj.category}</span>
                            </div>
                          </div>
                          <p className="admin-item-desc">{proj.desc}</p>
                          <div className="admin-item-links">
                            {proj.demoUrl && <span title={proj.demoUrl}>🌐 Demo: {proj.demoUrl}</span>}
                            {proj.githubUrl && <span title={proj.githubUrl}>💻 Repo: {proj.githubUrl}</span>}
                          </div>
                          <div className="admin-item-actions">
                            <button
                              className="admin-edit-btn"
                              onClick={() => handleEditClick(proj)}
                            >
                              <FaEdit /> Edit Project & Image
                            </button>
                            <button
                              className="admin-del-btn"
                              onClick={() => handleDeleteProject(proj.id, proj.title)}
                            >
                              <FaTrash /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ENQUIRIES TAB */}
              {activeTab === "enquiries" && (
                <div className="admin-enquiries-section">
                  <div className="admin-section-header">
                    <div>
                      <h3>📩 Received Project Enquiries</h3>
                      <p className="admin-subtext">Leads and requests submitted by visitors through the contact form</p>
                    </div>
                    {enquiries.length > 0 && (
                      <button className="admin-clear-btn" onClick={handleClearAllEnquiries}>
                        <FaTrash /> Clear All Enquiries
                      </button>
                    )}
                  </div>

                  {enquiries.length === 0 ? (
                    <div className="admin-empty-state">
                      <FaInbox className="empty-icon" />
                      <h4>No Enquiries Received Yet</h4>
                      <p>When potential clients submit project requests via the website form, they will appear here instantly.</p>
                    </div>
                  ) : (
                    <div className="enquiries-list">
                      {enquiries.map((enq) => (
                        <div className="enquiry-card" key={enq.id}>
                          <div className="enquiry-top">
                            <div className="enquiry-client-info">
                              <h4>{enq.name}</h4>
                              <span className="enquiry-service-badge"><FaTag /> {enq.service || "General"}</span>
                            </div>
                            <div className="enquiry-meta">
                              <span className="enquiry-date"><FaCalendarAlt /> {enq.date}</span>
                              <button
                                className="enquiry-del-btn"
                                onClick={() => handleDeleteEnquiry(enq.id, enq.name)}
                                title="Delete enquiry"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>

                          <div className="enquiry-contact-details">
                            {enq.email && (
                              <a href={`mailto:${enq.email}`} className="enquiry-contact-link" title="Send email">
                                <FaEnvelope /> {enq.email}
                              </a>
                            )}
                            {enq.phone && (
                              <a href={`tel:${enq.phone}`} className="enquiry-contact-link" title="Call phone">
                                <FaPhone /> {enq.phone}
                              </a>
                            )}
                            {enq.company && (
                              <span className="enquiry-contact-link">
                                <FaBuilding /> {enq.company}
                              </span>
                            )}
                          </div>

                          <div className="enquiry-message-box">
                            <label>Project Description / Message:</label>
                            <p>{enq.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SOCIAL TAB */}
              {activeTab === "social" && (
                <div className="admin-card-box">
                  <h3>🌐 Social & Contact Configuration</h3>
                  <form onSubmit={handleSaveSocial} className="admin-form">
                    <div className="admin-field">
                      <label><FaGithub /> GitHub Profile / Org URL</label>
                      <input
                        type="url"
                        value={socialForm.github}
                        onChange={(e) => setSocialForm({ ...socialForm, github: e.target.value })}
                        placeholder="https://github.com/websutra"
                      />
                    </div>

                    <div className="admin-field">
                      <label><FaInstagram /> Instagram Profile URL</label>
                      <input
                        type="url"
                        value={socialForm.instagram}
                        onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                        placeholder="https://instagram.com/websutra"
                      />
                    </div>

                    <div className="admin-field">
                      <label><FaLinkedin /> LinkedIn Profile URL</label>
                      <input
                        type="url"
                        value={socialForm.linkedin}
                        onChange={(e) => setSocialForm({ ...socialForm, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/company/websutra"
                      />
                    </div>

                    <div className="admin-form-row">
                      <div className="admin-field">
                        <label>Contact Email</label>
                        <input
                          type="email"
                          value={socialForm.email}
                          onChange={(e) => setSocialForm({ ...socialForm, email: e.target.value })}
                          placeholder="contact@websutra.in"
                        />
                      </div>
                      <div className="admin-field">
                        <label>Contact Phone</label>
                        <input
                          type="text"
                          value={socialForm.phone}
                          onChange={(e) => setSocialForm({ ...socialForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="admin-field">
                      <label>Location Badge</label>
                      <input
                        type="text"
                        value={socialForm.location}
                        onChange={(e) => setSocialForm({ ...socialForm, location: e.target.value })}
                        placeholder="INDIA · WORKING GLOBALLY"
                      />
                    </div>

                    <div className="admin-actions">
                      <button type="submit" className="admin-btn-primary">
                        <FaSave /> Save Social & Contact Links
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Footer info */}
            <div className="admin-footer">
              <button className="admin-reset-btn" onClick={handleReset}>
                <FaUndo /> Reset to WebSutra Defaults
              </button>
              <button className="admin-btn-secondary" onClick={() => setIsAdminOpen(false)}>
                Close Admin
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
