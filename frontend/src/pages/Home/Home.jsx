import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { getScans } from "../../services/scan.service";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ScanCard from "../../components/ui/ScanCard";
import SectionHeading from "../../components/ui/SectionHeading";

import "./home.css";

const Home = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScans = async () => {
      try {
        const response = await getScans();

        setScans(response.data || []);
      } catch (error) {
        console.error("Failed to load scans:", error);
      } finally {
        setLoading(false);
      }
    };

    loadScans();
  }, []);

  return (
    <div className="home">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero__container">
            <div className="hero__content">
              <span className="hero__eyebrow">
                <Sparkles size={16} />
                Quantum Sure Success
              </span>

              <h1>
                Discover deeper insights into
                your journey.
              </h1>

              <p>
                Explore personalized scan experiences
                designed to help you understand different
                areas of your life.
              </p>

              <div className="hero__actions">
                <a
                  href="/scans"
                  className="button button--primary"
                >
                  Explore Scans
                  <ArrowRight size={18} />
                </a>

                <a
                  href="#how-it-works"
                  className="button button--secondary"
                >
                  How It Works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Scans */}
        <section className="section">
          <div className="section__container">
            <SectionHeading
              eyebrow="Our Products"
              title="Explore the seven scans"
              description="Choose a scan to explore its available insights, benefits and report experience."
            />

            {loading ? (
              <p className="section__loading">
                Loading scans...
              </p>
            ) : (
              <div className="scan-grid">
                {scans.map((scan) => (
                  <ScanCard
                    key={scan._id}
                    scan={scan}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why */}
        <section
          id="about"
          className="section section--muted"
        >
          <div className="section__container">
            <SectionHeading
              eyebrow="Why Choose Us"
              title="A structured experience from scan to report"
              description="The platform is designed around a simple journey: select your scan, complete your details, and receive your personalized report."
            />

            <div className="feature-grid">
              <div className="feature">
                <CheckCircle2 size={24} />

                <h3>Personalized</h3>

                <p>
                  Your report is generated based on
                  the information provided during your
                  scan journey.
                </p>
              </div>

              <div className="feature">
                <CheckCircle2 size={24} />

                <h3>Structured</h3>

                <p>
                  Each scan follows a defined set of
                  domains for a consistent experience.
                </p>
              </div>

              <div className="feature">
                <CheckCircle2 size={24} />

                <h3>Accessible</h3>

                <p>
                  The experience is designed to work
                  smoothly across desktop, tablet and
                  mobile devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="section"
        >
          <div className="section__container">
            <SectionHeading
              eyebrow="How It Works"
              title="Simple from start to finish"
            />

            <div className="steps">
              <div className="step">
                <span>01</span>
                <h3>Choose a scan</h3>
                <p>
                  Explore the available scan options
                  and select the one you want.
                </p>
              </div>

              <div className="step">
                <span>02</span>
                <h3>Complete your details</h3>
                <p>
                  Provide the information required to
                  generate your report.
                </p>
              </div>

              <div className="step">
                <span>03</span>
                <h3>Receive your report</h3>
                <p>
                  Your completed report is prepared
                  and delivered through the platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="cta__container">
            <h2>
              Ready to explore your scan?
            </h2>

            <p>
              Browse the available scans and choose
              the experience that interests you.
            </p>

            <a
              href="/scans"
              className="button button--light"
            >
              Explore Scans
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;