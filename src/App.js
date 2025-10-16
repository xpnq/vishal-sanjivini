/* eslint-disable */
import { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/main.css";
import Consent from "./consent";
import Documents from "./documents";
import Home from "./home";
import Footer from "./footer";

function animateCounters() {
    const counters = document.querySelectorAll("#counts .count-number");
    if (!counters.length) return;

    const animateCountersInner = () => {
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
        const duration = 1200;
        const startTs = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - startTs) / duration, 1);
          const value = Math.floor(progress * target);
          counter.textContent = value.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };

        requestAnimationFrame(tick);
      });
    };
    animateCountersInner();
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      const yOffset = -80; // adjust to fixed header height
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  useEffect(() => {

    animateCounters();

    // --- GALLERY SLIDER ---
    const slider = document.querySelector("#gallery .gallery-slider");
    if (!slider) return;

    const slidesContainer = slider.querySelector(".gallery-slides");
    const slides = Array.from(slidesContainer.children);
    const prevBtn = slider.querySelector(".gallery-prev");
    const nextBtn = slider.querySelector(".gallery-next");
    const dotsContainer = slider.querySelector(".gallery-dots");

    let currentIndex = 0;
    const intervalMs = 4000;
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const autoplay = !reduceMotion;
    let timerId = null;

    const update = () => {
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      const dots = dotsContainer.querySelectorAll("button");
      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.setAttribute("aria-current", "true");
          dot.setAttribute("aria-selected", "true");
        } else {
          dot.removeAttribute("aria-current");
          dot.setAttribute("aria-selected", "false");
        }
      });
    };

    const goTo = (index) => {
      const total = slides.length;
      currentIndex = (index + total) % total;
      update();
    };

    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `Go to slide ${i + 1}`);
      b.addEventListener("click", () => {
        stop();
        goTo(i);
        start();
      });
      dotsContainer.appendChild(b);
    });
    update();

    const next = () => goTo(currentIndex + 1);
    const prev = () => goTo(currentIndex - 1);

    prevBtn.addEventListener("click", () => {
      stop();
      prev();
      start();
    });
    nextBtn.addEventListener("click", () => {
      stop();
      next();
      start();
    });

    const start = () => {
      if (!autoplay) return;
      stop();
      timerId = setInterval(next, intervalMs);
    };
    const stop = () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
    };

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);

    // Swipe support
    let startX = 0,
      deltaX = 0,
      touching = false;
    slider.addEventListener(
      "touchstart",
      (e) => {
        touching = true;
        startX = e.touches[0].clientX;
        deltaX = 0;
        stop();
      },
      { passive: true }
    );
    slider.addEventListener(
      "touchmove",
      (e) => {
        if (!touching) return;
        deltaX = e.touches[0].clientX - startX;
      },
      { passive: true }
    );
    slider.addEventListener("touchend", () => {
      if (!touching) return;
      if (Math.abs(deltaX) > 40) deltaX < 0 ? next() : prev();
      touching = false;
      start();
    });

    slider.setAttribute("tabindex", "0");
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        stop();
        next();
        start();
      } else if (e.key === "ArrowLeft") {
        stop();
        prev();
        start();
      }
    });

    start();
    animateCounters();
    const timeout = setTimeout(animateCounters, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <header id="header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img
                src="https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/img/logo-green-gold.png"
                alt="Vishal Sanjivini Logo"
              />
            </Link>
          </div>

          {/* --- Hamburger Button --- */}
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          {/* --- Navigation --- */}
          <nav id="navbar" className={menuOpen ? "open" : ""}>
            <ul>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/documents" onClick={() => setMenuOpen(false)}>Documents</Link></li>
              <li><Link to="/consent" onClick={() => setMenuOpen(false)}>Consent</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/consent" element={<Consent />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
      {/* --- FOOTER --- */}
      <Footer />
    </Router>
  );
}
