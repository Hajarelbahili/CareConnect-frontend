import { ArrowRight, Stethoscope } from "lucide-react";
import "./SpecialityCard.css";

const SpecialityCard = ({ name, description, doctorCount, onViewDoctors }) => {
  return (
    <article className="speciality-card">
      <div className="speciality-card__icon">
        <Stethoscope size={22} />
      </div>

      <div className="speciality-card__content">
        <h3 className="speciality-card__title">{name}</h3>

        <p className="speciality-card__description">{description}</p>
      </div>

      <div className="speciality-card__footer">
        <span className="speciality-card__doctors">
          {doctorCount} {doctorCount === 1 ? "Doctor" : "Doctors"}
        </span>

        <button
          type="button"
          className="speciality-card__link"
          onClick={onViewDoctors}
        >
          <span>View Doctors</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
};

export default SpecialityCard;
