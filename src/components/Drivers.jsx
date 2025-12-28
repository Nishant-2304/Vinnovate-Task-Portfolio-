import { useEffect, useRef } from "react";
import driversData from "../data/teamates";
import "./Drivers.css";

export default function Drivers() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollTop = -rect.top;
      const viewport = window.innerHeight;

      cardsRef.current.forEach((card, index) => {
        const start = index * viewport;
        const end = start + viewport;

        let translateX = index * 60; // peeking offset (right side)

        if (scrollTop > start && scrollTop < end) {
          translateX = index * 60 - (scrollTop - start);
        }

        if (scrollTop >= end) {
          translateX = -viewport;
        }

        card.style.transform = `translateX(${translateX}px)`;
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="drivers-section" ref={sectionRef} id="drivers">
      <div className="drivers-header">
        <h2>Team & Crew</h2>
        <p>Key support staff.</p>
      </div>

      <div className="drivers-stack">
        {driversData.map((driver, index) => (
          <div
            className="driver-card"
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            style={{ zIndex: driversData.length - index }}
          >
            <img src={driver.image} alt={driver.name} />
            <div className="driver-info">
              <h3>{driver.name}</h3>
              <span>{driver.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
