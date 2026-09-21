import SpecialityCard from "../SpecialityCard/SpecialityCard";
import "./SpecialitiesSection.css";

const SpecialitiesSection = ({
  departmentName,
  specialities = [],
  specialitiesLoading,
  specialitiesError
}) => {
  if (specialitiesLoading) {
    return <div>Loading...</div>;
  }

  if (specialitiesError) {
    return <div>Unable to load specialities.</div>;
  }
  return (
    <section className="specialities-section">
      <div className="specialities-section__header">
        <span className="specialities-section__eyebrow">Our Specialities</span>

        <h2 className="specialities-section__title">
          Specialities in {departmentName}
        </h2>

        <p className="specialities-section__description">
          Explore the different specialities available in our {departmentName}{" "}
          department.
        </p>
      </div>

      <div className="specialities-section__grid">
        {specialities.length > 0 ? (
          specialities.map((speciality) => (
            <SpecialityCard
              key={speciality.specialityId}
              name={speciality.name}
              description={speciality.description}
              doctorCount={speciality.doctorCount}
            />
          ))
        ) : (
          <p className="specialities-section__empty">
            No specialities available.
          </p>
        )}
      </div>
    </section>
  );
};

export default SpecialitiesSection;
