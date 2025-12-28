import { useEffect, useRef } from "react";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const onScroll = () => {
      hero.style.setProperty("--scroll", window.scrollY);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stats = statsRef.current;
    const numbers = stats.querySelectorAll("[data-target]");

    const animateNumber = (el) => {
      const target = +el.dataset.target;
      let current = 0;
      const increment = Math.ceil(target / 60);

      const update = () => {
        current += increment;
        if (current >= target) {
          el.innerText = target + "+";
          return;
        }
        el.innerText = current;
        requestAnimationFrame(update);
      };

      update();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            numbers.forEach(animateNumber);
            observer.disconnect(); // run once
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(stats);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg-layer layer-1" />
      <div className="hero-bg-layer layer-2" />

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-static">Joey</span>
          <span className="title-highlight">Logano.</span>
        </h1>

        <p className="hero-subtitle">
          Precision. Aggression. Championships.
        </p>
      </div>
      <div className="hero-image">
        <img src="/img/joey.jpg" alt="Joey Logano" />
      </div>


      {/* ROLLING STATS BAR */}
      <div className="hero-stats" ref={statsRef}>
        <div>
          <h2 data-target="36">0</h2>
          <span>Cup Series Wins</span>
        </div>
        <div>
          <h2 data-target="2">0</h2>
          <span>Championships</span>
        </div>
        <div>
          <h2 data-target="500">0</h2>
          <span>Starts</span>
        </div>
      </div>
    </section>
  );
}
