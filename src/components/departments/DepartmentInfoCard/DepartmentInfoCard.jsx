import "./DepartmentInfoCard.css";

const DepartmentInfoCard = ({ title, value, description, icon }) => {
  return (
    <article className="department-info-card">
      <div className="department-info-card__icon">{icon}</div>

      <div className="department-info-card__content">
        <span className="department-info-card__title">{title}</span>

        <strong className="department-info-card__value">{value}</strong>

        {description && (
          <p className="department-info-card__description">{description}</p>
        )}
      </div>
    </article>
  );
};

export default DepartmentInfoCard;
