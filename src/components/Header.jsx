import "./Header.css"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useData } from "../context/DataContext"

function Header() {
    const { socialLinks, setIsAdminOpen } = useData()
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Secret 8-click trigger on WebSutra logo
    const [clickCount, setClickCount] = useState(0)
    const [lastClickTime, setLastClickTime] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogoClick = (e) => {
        const now = Date.now()
        // Allow up to 3.5s between clicks
        let newCount = 1
        if (now - lastClickTime < 3500) {
            newCount = clickCount + 1
        }
        setLastClickTime(now)

        if (newCount >= 8) {
            e.preventDefault()
            setIsAdminOpen(true)
            setClickCount(0)
            setMobileMenuOpen(false)
        } else {
            setClickCount(newCount)
        }
    }

    const handleLinkClick = () => {
        setMobileMenuOpen(false)
    }

    return (
        <header className={scrolled ? "header scroll" : "header"}>
            {/* WEBSUTRA LOGO - CLICK 8 TIMES TO UNLOCK ADMIN PANEL */}
            <div className="logo" onClick={handleLogoClick} title="WebSutra" style={{ cursor: "pointer", userSelect: "none" }}>
                <a href="#hero" style={{ textDecoration: "none" }} onClick={handleLinkClick}>
                    <h1><span>Web</span>Sutra</h1>
                </a>
            </div>

            {/* NAV LINKS */}
            <ul className={`links ${mobileMenuOpen ? "mobile-open" : ""}`}>
                <li><a href="#hero" onClick={handleLinkClick}>Home</a></li>
                <li><a href="#about" onClick={handleLinkClick}>About</a></li>
                <li><a href="#services" onClick={handleLinkClick}>Services</a></li>
                <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
                <li><a href="#process" onClick={handleLinkClick}>Process</a></li>
                <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
            </ul>

            {/* HEADER ACTIONS */}
            <div className="header-actions">
                <ul className="icons">
                    <li>
                        <a href={socialLinks.github || "#"} target="_blank" rel="noreferrer" title="GitHub">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </li>
                    <li>
                        <a href={socialLinks.instagram || "#"} target="_blank" rel="noreferrer" title="Instagram">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </li>
                    <li>
                        <a href={socialLinks.linkedin || "#"} target="_blank" rel="noreferrer" title="LinkedIn">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </li>
                </ul>

                {/* HAMBURGER TOGGLE FOR MOBILE */}
                <button
                    className="mobile-toggle-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
                </button>
            </div>
        </header>
    )
}

export default Header