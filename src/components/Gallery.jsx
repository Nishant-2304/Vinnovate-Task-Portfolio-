import { useEffect, useRef } from "react";
import images from "../data/gallery";
import "./Gallery.css";

export default function Gallery() {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;

      const progress = Math.min(
        Math.max((viewport - rect.top) / (rect.height + viewport), 0),
        1
      );

      rowRefs.current.forEach((row, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        const translateX = progress * (220 + index * 140) * direction;

        const scale = 1 - Math.abs(0.5 - progress) * 0.08;
        const opacity = 0.6 + progress * 0.4;

        row.style.transform = `
          translateX(${translateX}px)
          scale(${scale})
        `;
        row.style.opacity = opacity;
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="gallery-section" ref={sectionRef} id="gallery">
      <div className="gallery-header">
        <h2>Gallery</h2>
        <p>Race Day Moments.</p>
      </div>

      <div className="gallery-rows">
        {[0, 1, 2].map((rowIndex) => (
          <div
            className="gallery-row"
            key={rowIndex}
            ref={(el) => (rowRefs.current[rowIndex] = el)}
            style={{ transform: `rotate(${rowIndex % 2 === 0 ? -1 : 1}deg)` }}
          >
            {images.map((src, index) => (
              <div className="gallery-item" key={index}>
                <img src={src} alt="Gallery visual" />
                <div className="gallery-overlay">
                  <span>View</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* EDGE FADE */}
      <div className="gallery-fade left" />
      <div className="gallery-fade right" />
    </section>
  );
}
