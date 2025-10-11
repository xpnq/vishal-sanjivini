/* eslint-disable */
import { useEffect } from "react";

function animateCounters() {
  const counters = document.querySelectorAll("#counts .count-number");
  if (!counters.length) return;

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
}

export default function Home() {

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
    const countsSection = document.querySelector("#counts");
    if (!countsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animateCounters();
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(countsSection);

    if (countsSection.getBoundingClientRect().top < window.innerHeight) {
      animateCounters();
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section id="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1>Welcome to Vishal Sanjivini Home Owners Association</h1>
              <h2>
                A homeowners’ initiative for our gated villa community in
                Tukkuguda, Hyderabad.
              </h2>
              <p style={{ fontSize: "0.95rem", marginTop: "10px", color: "#555" }}>
                <strong>Disclaimer:</strong> This is an independent website
                created and managed by the homeowners of the{" "}
                <b>Vishal Sanjivini</b> community. It is <b>not affiliated with,
                endorsed by, or managed by Vishal Projects Pvt. Ltd.</b> or any
                of its representatives.
              </p>
              <div>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#about" onClick={(e) => handleScroll(e, "#about")} className="btn btn-primary mt-3">
                  Know More
                </a>
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
              <h2>About Vishal Sanjivini HOA</h2>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <p>
                  <strong>Vishal Sanjivini</strong> is an upscale gated villa
                  community located in the vibrant locality of Tukkuguda,
                  Hyderabad, spread across 34 acres of lush green landscape.
                  Developed by{" "}
                  <a
                    href="https://www.vishalprojects.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Vishal Projects Private Limited
                  </a>
                  , this prestigious project offers a blend of luxury, comfort,
                  and modern living, making it an ideal place for families
                  seeking an exceptional residential experience in South
                  Hyderabad.
                </p>

                <h3>Project Overview</h3>
                <ul>
                  <li>
                    <b>Location:</b> &nbsp; Tukkuguda, Hyderabad, adjacent to
                    Electronic City and Fab City, near ORR Exit No. 14.
                  </li>
                  <li>
                    <b>Project Area:</b> &nbsp; 34 Acres of secure, landscaped
                    community.
                  </li>
                  <li>
                    <b>Total Villas:</b> &nbsp; 338 luxury villas, primarily 4
                    BHK + Home Theater units, ranging from 3,200 to 4,990+ sq.
                    ft.
                  </li>
                  <li>
                    <b>RERA Reg. Number:</b> &nbsp; P02400000533
                  </li>
                </ul>
              </div>

              <div className="col-lg-6">
                <h3>About the Home Owners Association</h3>
                <p>
                  The homeowners of Vishal Sanjivini are in the process of
                  forming the <b>Vishal Sanjivini Home Owners Association
                  (HOA)</b>. This association is an{" "}
                  <b>independent, resident-driven body</b> established to foster
                  a safe, vibrant, and cooperative community for all residents.
                  It operates separately from the builder and its website, and
                  its activities reflect the collective interests of villa
                  owners—not the developer.
                </p>

                <h4>HOA Initiatives</h4>
                <ul>
                  <li>Regular updates and maintenance of shared facilities</li>
                  <li>Coordinating community events and cultural gatherings</li>
                  <li>Addressing resident issues transparently</li>
                  <li>
                    Promoting compliance with community guidelines for a
                    peaceful environment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* COUNTS SECTION (unchanged) */}
        {/* ... your rest of the sections ... */}

        {/* CONTACT SECTION */}
        <section id="contact">
          <div className="container">
            <div className="section-title">
              <h2>Contact Us</h2>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="contact-about">
                  The Vishal Sanjivini Home Owners Association (HOA) is
                  currently being formed by residents. Once the legal formation
                  is completed, official contact details and registration
                  information will be published here.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER DISCLAIMER */}
        <footer
          style={{
            backgroundColor: "#f8f9fa",
            textAlign: "center",
            padding: "15px 10px",
            fontSize: "0.85rem",
            color: "#555",
            borderTop: "1px solid #ddd",
            marginTop: "30px",
          }}
        >
          <p>
            © {new Date().getFullYear()} Vishal Sanjivini Home Owners
            Association. This is a community-run initiative.{" "}
            <b>
              Not affiliated with Vishal Projects Pvt. Ltd. or
              vishalprojects.com.
            </b>
          </p>
        </footer>
      </main>
    </>
  );
}
