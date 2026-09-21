import "./DepartmentHero.css";
import Breadcrumb from "../../ui/DepartmentBreadcrumb/Breadcrumb";
import doctorPassient from "../../../assets/images/doctor-passient.webp";
const DepartmentHero = ({ department }) => {
  if (!department) {
    return null;
  }

  const imageUrl = department.imageBase64
    ? `data:${department.imageType};base64,${department.imageBase64}`
    : null;

  return (
    <section className="department-hero">
      {/* Breadcrumb intégré au Hero */}

      <div className="department-hero__main">
        {/* Partie gauche */}
        <div className="department-hero__content">
          <div className="department-hero__breadcrumb">
            <Breadcrumb
              items={[
                {
                  label: "Departments",
                  path: "/departments"
                },
                {
                  label: department.name
                }
              ]}
            />
          </div>
          <span className="department-hero__badge">Department</span>

          <h1 className="department-hero__title">{department.name}</h1>

          <h2 className="department-hero__subtitle">
            Expert care for your health
          </h2>

          <p className="department-hero__description">
            {department.description}
          </p>
        </div>

        {/* Texte décoratif */}
        <div className="department-hero__quote">
          <span>Healthy</span>
          <span>Body</span>
          <span>Happier</span>
          <span>Lives</span>

          <span className="department-hero__heart">♡</span>
        </div>

        {/* Image */}

        <div className="department-hero__image-wrapper">
          <img
            src={doctorPassient}
            alt={department.name}
            className="department-hero__image"
          />
        </div>
      </div>
    </section>
  );
};

export default DepartmentHero;
