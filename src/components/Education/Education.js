import React, { useRef, useEffect, useState } from "react";
import "./Education.css";
import Experience from "../Experience/Experience"; // Import the Experience component

const Education = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1185);
  const educationData = [
    {
      logo: "/path/to/institution1-logo.png",
      institution: "Poornima University",
      degree: "Bachelor of Computer Applications (Data Science)",
      duration: "2020 - 2023",
      description:
        "Completed a comprehensive program covering core computer science topics including algorithms, data structures, and software engineering.",
    },
    {
      institution: "Guru Ram Rai Public School",
      degree: "Senior Secondary Education | 11th & 12th Standard",
      duration: "2018 - 2020",
      description:
        "Focused on foundational programming skills and software development practices.",
    },
    {
      institution: "Tagore Public School",
      degree: "High School | 9th & 10th Standard",
      duration: "2016 - 2018",
      description:
        "Focused on foundational programming skills and software development practices.",
    },
    // Add more education entries as needed
  ];
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);
  const [cardOffsets, setCardOffsets] = useState([]);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1185);
      if (!isLoading) {
        calculateOffsets();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSmallScreen, isLoading]);

  // Calculate offsets when isLoading changes
  useEffect(() => {
    if (!isLoading) {
      calculateOffsets();
    }
  }, [isLoading]);

  // Function to calculate card offsets and timeline height
  const calculateOffsets = () => {
    let cumulativeHeight = 0;
    let offsets = [];
    cardsRef.current.forEach((card, index) => {
      if (card) {
        offsets.push(cumulativeHeight);
        cumulativeHeight += card.offsetHeight + 40;
        card.classList.add(index % 2 === 0 ? "odd" : "even");
      }
    });
    setCardOffsets(offsets);
    timelineRef.current.style.height = `${cumulativeHeight}px`;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="bouncing-ball" />
      </div>
    );
  }

  return (
    <section className="education-section" aria-labelledby="education-title">
      <h2 className="education-title" id="education-title">
        Education
      </h2>
      <div className="education-timeline" ref={timelineRef}>
        {educationData.map((edu, index) => (
          <div key={index} className="education-wrapper">
            {/* Checkpoint */}
            <div
              className="education-checkpoint"
              style={{ top: `${cardOffsets[index] + 45}px` }}
            >
              <div className="checkpoint-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
            </div>

            {/* Date (visible on large screens) */}
            {!isSmallScreen && (
              <div
                className={`education-date ${index % 2 === 0 ? "odd" : "even"}`}
                style={{
                  top: `${cardOffsets[index] + 45}px`,
                  left: index % 2 === 0 ? "auto" : "465px",
                  right: index % 2 === 0 ? "470px" : "auto",
                }}
              >
                {edu.duration}
              </div>
            )}

            {/* Education Card */}
            <div
              className="education-card"
              ref={(el) => (cardsRef.current[index] = el)}
              style={{
                left: isSmallScreen ? "0" : index % 2 === 0 ? "105px" : "auto",
                right: isSmallScreen ? "0" : index % 2 === 0 ? "auto" : "105px",
                top: isSmallScreen
                  ? `${cardOffsets[index]}px`
                  : `${cardOffsets[index] + 20}px`,
                transform: isSmallScreen
                  ? "none"
                  : index % 2 === 0
                  ? "translateX(25%)"
                  : "translateX(-25%)",
              }}
            >
              <h3 className="institution-name">{edu.institution}</h3>
              <h4 className="degree-name">{edu.degree}</h4>
              {isSmallScreen && <p className="duration">{edu.duration}</p>}
              <p className="description">{edu.description}</p>
              <div className="triangle" />
            </div>
          </div>
        ))}
      </div>
      <Experience /> {/* Add the Experience component here */}
    </section>
  );
};

export default Education;