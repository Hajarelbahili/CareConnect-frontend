import { ArrowRight } from "lucide-react";
import "./DepartmentCTA.css";

const DepartmentCTA = ({ title, description, buttonLabel, onClick }) => {
  return (
    <section className="department-cta-section">
      <div className="department-cta">
        <div className="department-cta__content">
          <h2 className="department-cta__title">{title}</h2>

          <p className="department-cta__description">{description}</p>
        </div>

        <button
          type="button"
          className="department-cta__button"
          onClick={onClick}
        >
          <span>{buttonLabel}</span>

          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default DepartmentCTA;
