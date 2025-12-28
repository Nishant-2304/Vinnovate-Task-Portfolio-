import { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-left">Joey Logano</div>
      <div className="nav-right">
        <a href="#about">About</a>
        <a href="#team">Cars</a>
        <a href="#drivers">Teamates</a>
        <a href="#gallery">Gallery</a>
      </div>
    </nav>
  );
}
