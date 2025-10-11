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
  useEffect(() => {
    // Animate counters when they enter view
    const countsSection = document.querySelector("#counts");
    if (!countsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(countsSection);

    // Trigger immediately if already visible on load
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
                    <div className="col-lg-12">
                      <h1>
                        Welcome to Vishal Sanjivini Home Owners Group
                      </h1>
                      <h2>
                        Upscale gated villa community in Tukkuguda, Hyderabad.
                      </h2>
                      <div>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#about">Know More</a>
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

                        <h3>About the Home Owners Group</h3>
                        <p>
                          The Vishal Sanjivini Home Owners Group (HOA) holds the mission of fostering a safe,
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

                {/* ======= GALLERY SECTION ======= 
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
                </section> *}

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
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3811.514503679088!2d78.48861699999999!3d17.193812299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba500147f46ad%3A0xdf0f101c1018020d!2sVishal%20Sanjivini%20Home%20owners%20Group!5e0!3m2!1sen!2sin!4v1759897283163!5m2!1sen!2sin"
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
                          <h3>Group Office</h3>
                          <p>
                            <b>Vishal Sanjivini Home Owners Group</b><br />
                            Community Hall, Vishal Sanjivini, Tukkuguda, Hyderabad - 501359
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
                              <b>Contact & Support:</b> For homeowner support, property management queries, maintenance requests, or to get involved with HOA activities, please reach out to the Group office or contact us via the online portal.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>


                {/* You can continue similarly for amenities, gallery, contact, footer, etc. */}
              </main>
    </>
  );
}
