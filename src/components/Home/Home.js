import React, { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { useInView } from "react-intersection-observer";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import "../../App.css"; // Global styles for the app
import "../Home/Home.css"; // Home section-specific styles
import ParticleBackground from "../ParticleBackground/ParticlesBackground";

// Import images for both dark and light themes
import profileDark from "../../assets/profile.jpg";
import profileLight from "../../assets/profile1.jpg";

// Import ThemeContext
import { ThemeContext } from "../ParticleBackground/ThemeContext";

function Home() {
  const navigate = useNavigate();
  const { isDarkTheme } = useContext(ThemeContext); // Access theme context
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [profilePic, setProfilePic] = useState(profileDark); // Default profile picture for dark theme
  const textArray = useMemo(
    () => ["Data Analyst", "Python Developer", "Rider"],
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const { ref: homeRef, inView: homeInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Effect to handle the initial loading animation
  useEffect(() => {
    document.body.classList.add("loading");
    setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
      document.body.classList.remove("loading");
    }, 3000); // Adjust this based on your loading animation duration
  }, []);

  // Effect to handle theme changes and update profile picture
  useEffect(() => {
    setProfilePic(isDarkTheme ? profileDark : profileLight);
  }, [isDarkTheme]);

  // Typing effect for the text array
  useEffect(() => {
    if (charIndex < textArray[currentIndex].length) {
      const typingTimer = setTimeout(() => {
        setText((prevText) => prevText + textArray[currentIndex][charIndex]);
        setCharIndex((prevCharIndex) => prevCharIndex + 1);
      }, 100);

      return () => clearTimeout(typingTimer);
    } else {
      const delayTimer = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }, 2000);

      return () => clearTimeout(delayTimer);
    }
  }, [charIndex, currentIndex, textArray]);

  // Determine the theme color based on the current theme
  const themeColor = isDarkTheme ? "#ffffff" : "#000000";

  return (
    <section
      id="home"
      className={`home-section ${homeInView ? "animate-in" : ""}`}
      ref={homeRef}
      aria-labelledby="home-title"
    >
      {/* Particle Background */}
      <ParticleBackground themeColor={themeColor} />

      <div className="home-container">
        {/* Loading Animation */}
        {isLoading && (
          <div className={`loader-ball ${isLoaded ? "expand" : ""}`}></div>
        )}

        {/* Left Column - Text Content */}
        <div
          className={`home-text ${
            isLoaded ? "content-visible" : "hidden-content"
          }`}
        >
          <p>Hello, I'm</p>
          <h1 id="home-title">Rohan Goyal</h1>
          <h2>
            And I'm a <span>{text}</span>
          </h2>
          <p className="last-paragraph">
            Hey, I’m Rohan Goyal — a Data Analyst uncovering stories in numbers,
            a Python Developer creating impactful solutions, and a Photographer
            capturing life’s essence. I blend data, code, and creativity to
            solve complex problems and create lasting memories.
          </p>
          <div className="social-icons" aria-label="Social media links">
            <a
              href="https://www.facebook.com/Rohangoyal2616"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon facebook"
              aria-label="Facebook profile"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href="https://x.com/aggarwalrohan37"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon x-icon"
              aria-label="X profile"
            >
              <FaXTwitter size={30} /> {/* X Twitter logo */}
            </a>
            <a
              href="https://instagram.com/rohan_agarwal_37"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
              aria-label="Instagram profile"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/goyal-rohan"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon linkedin"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin size={30} />
            </a>
          </div>

          <button
            className="home-text"
            onClick={() => navigate("/about")}
            aria-label="Navigate to About section"
          >
            Wan'na Connect
          </button>
        </div>

        {/* Right Column - Profile Picture */}
        <div className="profile-container">
          <img
            src={profilePic} // Dynamic profile picture based on theme
            alt="Rohan Goyal"
            className="profile-pic"
            aria-label="Profile picture of Rohan Goyal"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
