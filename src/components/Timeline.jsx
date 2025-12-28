import { useEffect, useRef } from "react";
import timelineData from "../data/timeline";
import "./Timeline.css";

export default function Timeline() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressFillRef = useRef(null);
  const barRef = useRef(null);
  const itemsRef = useRef([]);

  const startScrollRef = useRef(null); // 🔑 THIS IS THE FIX

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    const progressFill = progressFillRef.current;

    const onScroll = () => {
      const barRect = bar.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const viewport = window.innerHeight;

      // Step 1: Wait until bar is FULLY visible
      const barFullyVisible =
        barRect.top >= 0 && barRect.bottom <= viewport;

      // Step 2: Lock the scroll start point ONCE
      if (barFullyVisible && startScrollRef.current === null) {
        startScrollRef.current = window.scrollY;
      }

      // Step 3: If start not locked yet → do nothing
      if (startScrollRef.current === null) {
        progressFill.style.width = "0%";
        track.style.transform = "translateX(0px)";
        return;
      }

      // Step 4: Compute progress RELATIVE to locked start
      const scrollSinceStart =
        window.scrollY - startScrollRef.current;

      const totalScrollable =
        sectionRect.height - viewport * 1.1;

      let progress = scrollSinceStart / totalScrollable;
      progress = Math.min(Math.max(progress, 0), 1);

      // Step 5: Apply transforms
      const maxTranslate =
        track.scrollWidth - window.innerWidth;

      track.style.transform = `translateX(${
        -progress * maxTranslate
      }px)`;

      progressFill.style.width = `${progress * 100}%`;

      // Step 6: Active item highlight
      const activeIndex = Math.round(
        progress * (timelineData.length - 1)
      );

      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle("active", i === activeIndex);
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="timeline-section"
      ref={sectionRef}
      id="timeline"
    >
      <div className="timeline-header">
        <h2>Career Timeline</h2>
        <p>Momentum over time.</p>
      </div>

      {/* PROGRESS BAR */}
      <div className="timeline-progress" ref={barRef}>
        <div
          className="timeline-progress-fill"
          ref={progressFillRef}
        />
      </div>

      {/* TIMELINE */}
      <div className="timeline-viewport">
        <div className="timeline-track" ref={trackRef}>
          {timelineData.map((item, index) => (
            <div
              className="timeline-item"
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <span className="timeline-year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
