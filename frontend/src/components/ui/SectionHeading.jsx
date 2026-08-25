const SectionHeading = ({
  eyebrow,
  title,
  description,
}) => {
  return (
    <div className="section-heading">
      {eyebrow && (
        <span className="section-heading__eyebrow">
          {eyebrow}
        </span>
      )}

      <h2>{title}</h2>

      {description && <p>{description}</p>}
    </div>
  );
};

export default SectionHeading;