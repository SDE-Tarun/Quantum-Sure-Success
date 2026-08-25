import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useParams, Link } from "react-router-dom";

import { getScanBySlug } from "../../services/scan.service";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./scan-details.css";

const ScanDetails = () => {
  const { slug } = useParams();

  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadScan = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getScanBySlug(slug);

        setScan(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load scan."
        );
      } finally {
        setLoading(false);
      }
    };

    loadScan();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="scan-details__state">
          <p>Loading scan...</p>
        </main>

        <Footer />
      </>
    );
  }

  if (error || !scan) {
    return (
      <>
        <Navbar />

        <main className="scan-details__state">
          <h1>Scan Not Found</h1>

          <p>
            {error || "The requested scan does not exist."}
          </p>

          <Link
            to="/scans"
            className="button button--primary"
          >
            Back to Scans
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <div className="scan-details">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="scan-hero">
          <div className="scan-hero__container">
            <div className="scan-hero__content">
              <span className="scan-hero__eyebrow">
                Quantum Sure Success
              </span>

              <h1>{scan.name} Scan</h1>

              <p>{scan.description}</p>

              <div className="scan-hero__price">
                <span>Report Price</span>

                <strong>
                  {scan.currency === "INR"
                    ? "₹"
                    : scan.currency}{" "}
                  {scan.price}
                </strong>
              </div>

              <a
                href="#purchase"
                className="button button--primary"
              >
                Get This Scan
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section">
          <div className="section__container">
            <div className="scan-section-heading">
              <span>Benefits</span>

              <h2>
                What this scan explores
              </h2>

              <p>
                Explore the key areas included in this
                scan experience.
              </p>
            </div>

            <div className="benefits-grid">
              {scan.benefits?.map((benefit, index) => (
                <div
                  className="benefit-card"
                  key={`${benefit}-${index}`}
                >
                  <CheckCircle2 size={22} />

                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Domains */}
        <section className="section section--muted">
          <div className="section__container">
            <div className="scan-section-heading">
              <span>25 Domains</span>

              <h2>
                Areas covered in your report
              </h2>

              <p>
                This scan is structured around the
                following domains.
              </p>
            </div>

            <div className="domains-grid">
              {scan.domains?.map((domain) => (
                <article
                  className="domain-card"
                  key={domain._id}
                >
                  <span>
                    {String(domain.order).padStart(2, "0")}
                  </span>

                  <h3>{domain.name}</h3>

                  {domain.description && (
                    <p>{domain.description}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Purchase CTA */}
        <section
          id="purchase"
          className="purchase-section"
        >
          <div className="purchase-section__container">
            <div>
              <span>Ready to continue?</span>

              <h2>
                Get your {scan.name} Scan
              </h2>

              <p>
                Continue to the purchase process to
                provide your details and place your
                order.
              </p>
            </div>

            <div className="purchase-card">
              <span>{scan.name} Scan</span>

              <strong>
                {scan.currency === "INR"
                  ? "₹"
                  : scan.currency}{" "}
                {scan.price}
              </strong>

              <button
                type="button"
                className="button button--primary"
                onClick={() => {
                  alert(
                    "Checkout will be connected in a later step."
                  );
                }}
              >
                Continue to Checkout
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ScanDetails;