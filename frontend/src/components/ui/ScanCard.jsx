import { ArrowUpRight } from "lucide-react";

const ScanCard = ({ scan }) => {
  return (
    <article className="scan-card">
      <div className="scan-card__content">
        <span className="scan-card__number">
          {String(scan.displayOrder).padStart(2, "0")}
        </span>

        <h3>{scan.name}</h3>

        <p>{scan.description}</p>

        <div className="scan-card__footer">
          <strong>
            {scan.currency === "INR" ? "₹" : scan.currency}{" "}
            {scan.price}
          </strong>

          <a href={`/scans/${scan.slug}`}>
            Explore
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </article>
  );
};

export default ScanCard;