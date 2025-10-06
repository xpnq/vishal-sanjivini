/* eslint-disable */
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import Nominations from "./nominations";
import Consent from "./consent";

export default function App() {
  useEffect(() => {
    // --- COUNTER ANIMATION ---
    const counters = document.querySelectorAll("#counts .count-number");
    if (counters.length) {
      const start = () => {
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
          const duration = 1200;
          const startTs = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - startTs) / duration, 1);
            const value = Math.floor(progress * target);
            counter.textContent = value.toLocaleString();
            if (progress < 1) requestAnimationFrame(tick);
            else counter.textContent = target.toLocaleString();
          };
          requestAnimationFrame(tick);
        });
      };

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              start();
              observer.disconnect();
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(document.querySelector("#counts"));
      } else start();
    }

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

          <nav id="navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              {/* <li>
                <a href="#amenities">Amenities</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li> */}
              <li>
                <a href="./downloads/index.html">Downloads</a>
              </li>
              <li>
                <a href="./elections/index.html">Elections</a>
              </li>
              <li>
                <Link to="/nominations">Nomination</Link>
              </li>
              <li>
                <Link to="/consent">Consent</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* HERO SECTION */}
              <section id="hero">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <h1>
                        Welcome to Vishal Sanjivini Home Owners Association
                      </h1>
                      <h2>
                        Upscale gated villa community in Tukkuguda, Hyderabad.
                      </h2>
                      <div>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#about">Know More</a>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="project-statellite">
                        <img
                          src="https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/img/vishal-projects-satellite.png"
                          alt="Vishal Sanjivini Villas satellite view"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* ABOUT SECTION */}
              <main id="main">
                <section id="about">
                  <div className="container">
                    <div className="section-title">
                      <h2>About Vishal Sanjivini</h2>
                    </div>
                    {/* Content omitted for brevity — copy from HTML as JSX */}
                  </div>
                </section>
                {/* You can continue similarly for amenities, gallery, contact, footer, etc. */}
              </main>
            </>
          }
        />
        <Route path="/nominations" element={<Nominations />} />
        <Route path="/consent" element={<Consent />} />
      </Routes>
    </Router>
  );
}
