/* eslint-disable */
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/main.css";
import Footer from "./footer";
import Nominations from "./nominations";
import Consent from "./consent";
import ElectionDocuments from "./elections";
import GeneralDocuments from "./documents";

export default function App() {
  useEffect(() => {
    // --- COUNTER ANIMATION ---
    const counters = document.querySelectorAll("#counts .count-number");
    if (!counters.length) return;

    const animateCounters = () => {
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

    // ✅ Wait a short time to ensure DOM is ready
   




     

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

          <nav id="navbar">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {/*
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#amenities">Amenities</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li> */}
              <li>
                <Link to="/documents">Documents</Link>
              </li>
              <li>
                <Link to="/elections">Elections</Link>
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
      {/* ======= ABOUT SECTION ======= */}
      <section id="about">
        <div className="container">
          <div className="section-title">
            <h2>About Vishal Sanjivini</h2>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <p>
                Vishal Sanjivini is an upscale, gated villa community located in the vibrant locality of
                Tukkuguda, Hyderabad, spread across 34 acres of lush green landscape. Developed by Vishal
                Projects Private Limited, this prestigious project offers a blend of luxury, comfort, and
                modern living, making it an ideal place for families seeking an exceptional residential
                experience in South Hyderabad.
              </p>

              <h3>Project Overview</h3>
              <ul>
                <li><b>Location:</b> Tukkuguda, Hyderabad, adjacent to Electronic City and Fab City, near ORR Exit No. 14.</li>
                <li><b>Project Area:</b> 34 Acres of secure, landscaped community.</li>
                <li><b>Total Villas:</b> 338 luxury villas, primarily 4 BHK + Home Theater units, ranging from 3,200 to 4,990+ sq. ft.</li>
                <li><b>RERA Reg. Number:</b> P02400000533</li>
                <li><b>Possession:</b> Starting November 2024.</li>
              </ul>
            </div>

            <div className="col-lg-6">
              <h3>Community Highlights</h3>
              <ul>
                <li>Serene, pollution-free environment with beautifully landscaped gardens and central park</li>
                <li>Proximity to major IT hubs (Gachibowli, Financial District), reputed schools, hospitals, and shopping centers</li>
                <li>Easy access to Rajiv Gandhi International Airport (about 11 km)</li>
                <li>High ratings by residents for connectivity, cleanliness, amenities, and neighborhood ambience.</li>
              </ul>

              <h3>About the Home Owners Association</h3>
              <p>
                The Vishal Sanjivini Home Owners Association (HOA) holds the mission of fostering a safe,
                vibrant, and welcoming community for all residents. The HOA collaborates with homeowners to
                maintain community standards, manage common amenities, organize events, and represent the
                collective interests of all property owners within Vishal Sanjivini.
              </p>

              <h4>HOA Initiatives</h4>
              <ul>
                <li>Regular updates and maintenance of shared facilities</li>
                <li>Coordinating community events, celebrations, and cultural gatherings</li>
                <li>Resolving resident grievances in a transparent and timely manner</li>
                <li>Ensuring compliance with community guidelines for everyone’s well-being.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======= COUNTS SECTION ======= */}
      <section id="counts">
        <div className="container">
          <div className="section-title">
            <h2>Community Snapshot</h2>
            <p>Numbers that tell our story</p>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="count-box">
                <div className="count-number" data-target="100">0</div>
                <p>Happy families already staying</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="count-box">
                <div className="count-number" data-target="220">0</div>
                <p>Villas registered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= AMENITIES SECTION ======= */}
      <section id="amenities">
        <div className="container">
          <div className="section-title">
            <h2>Amenities</h2>
          </div>

          <div className="inner container-fluid">
            <div className="amty-list">
              {[
                { src: "clubhouse.png", text: "Club House" },
                { src: "pool.png", text: "Swimming Pool" },
                { src: "dumbbell.png", text: "Gymnasium" },
                { src: "cplay.png", text: "Children's Play Area" },
                { src: "running.png", text: "Jogging Track" },
                { src: "basketball.png", text: "Multi-purpose Sports Court" },
                { src: "trees.png", text: "Landscaped Gardens" },
                { src: "247.png", text: "24x7 Security" },
                { src: "power.png", text: "Power Backup" },
                { src: "cctv.png", text: "CCTV Surveillance" },
                { src: "plumber.png", text: "Underground Cabling" },
                { src: "water.png", text: "Rainwater Harvesting" },
              ].map((item, i) => (
                <div className="amty" key={i}>
                  <div className="amty-img">
                    <img
                      src={`https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/img/ameinites/${item.src}`}
                      alt={item.text}
                    />
                  </div>
                  <p className="am-text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======= GALLERY SECTION ======= */}
      <section id="gallery">
        <div className="container">
          <div className="section-title">
            <h2>Gallery</h2>
            <p>Photo Gallery of events at Vishal Sanjivini</p>
          </div>
          <div className="gallery-slider" aria-label="Image gallery" role="region">
            <button className="gallery-control gallery-prev" aria-label="Previous slide">&#10094;</button>
            <div className="gallery-track">
              <div className="gallery-slides">
                {[
                  "east-elevation.jpg",
                  "west-elevation.jpg",
                  "east-elevation-1.jpg",
                  "west-elevation-1.jpg",
                  "samaja.webp"
                ].map((img, i) => (
                  <div className="gallery-slide" key={i}>
                    <img
                      src={`https://vishal-sanjivini.s3.ap-south-1.amazonaws.com/assets/img/${img}`}
                      alt={`Gallery ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button className="gallery-control gallery-next" aria-label="Next slide">&#10095;</button>
            <div className="gallery-dots" role="tablist" aria-label="Select slide"></div>
          </div>
        </div>
      </section>

      {/* ======= MAP VIEW SECTION ======= */}
      <section id="map-view">
        <div className="container">
          <div className="section-title">
            <h2>Location Map</h2>
            <p>Find Vishal Sanjivini in Tukkuguda, Hyderabad</p>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="map-responsive">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15257.653609804823!2d78.43572836245963!3d17.206456073177898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbb584852934ff%3A0x67341851e390c52a!2sTukkuguda%2C%20Hyderabad%2C%20Telangana%20500097!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vishal Sanjivini Map"
                />
              </div>
              <div className="map-address-info">
                <h3>Vishal Sanjivini, Tukkuguda, Hyderabad</h3>
                <p>
                  Discover our prime location with excellent connectivity to major city hubs and the international airport.
                </p>
                <a
                  href="https://www.google.com/maps/search/Vishal+Sanjivini,+Tukkuguda,+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= CONTACT SECTION ======= */}
      <section id="contact">
        <div className="container">
          <div className="section-title">
            <h2>Contact Us</h2>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="contact-about">
                <h3>Association Office</h3>
                <p>
                  <b>Vishal Sanjivini Home Owners Association</b><br />
                  Tukkuguda, Hyderabad - 501359
                </p>
                <p>
                  For general inquiries: <br />
                  <a href="mailto:info@vishalsanjivini.in">info@vishalsanjivini.in</a>
                </p>
                <p>
                  For maintenance related issues: <br />
                  <a href="mailto:maintenance@vishalsanjivini.in">maintenance@vishalsanjivini.in</a>
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="info">
                <div>
                  <p>Tukkuguda, Hyderabad - 501359</p>
                </div>
                <div>
                  <p>Hotline: <a href="tel:+919999999999">9999999999</a></p>
                </div>
                <div>
                  <p>
                    For administrative issues:{" "}
                    <a href="mailto:office@vishalsanjivini.in">office@vishalsanjivini.in</a>
                  </p>
                </div>
                <div>
                  <p>
                    <b>Contact & Support:</b> For homeowner support, property management queries, maintenance requests, or to get involved with HOA activities, please reach out to the Association office or contact us via the online portal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
                {/* You can continue similarly for amenities, gallery, contact, footer, etc. */}
              </main>
            </>
          }
        />
        <Route path="/nominations" element={<Nominations />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/documents" element={<GeneralDocuments />} />
        <Route path="/elections" element={<ElectionDocuments />} />
  
      </Routes>
    </Router>
  );
}
