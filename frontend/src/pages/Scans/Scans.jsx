import { useEffect, useState } from "react";

import { getScans } from "../../services/scan.service";

const Scans = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadScans = async () => {
      try {
        const response = await getScans();

        setScans(response.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load scans"
        );
      } finally {
        setLoading(false);
      }
    };

    loadScans();
  }, []);

  if (loading) {
    return <p>Loading scans...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Our Scans</h1>

      {scans.map((scan) => (
        <article key={scan._id}>
          <h2>{scan.name}</h2>

          <p>{scan.description}</p>

          <p>
            ₹{scan.price}
          </p>
        </article>
      ))}
    </main>
  );
};

export default Scans;