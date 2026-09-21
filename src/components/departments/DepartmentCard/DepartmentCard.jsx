import { Link } from "react-router-dom";
import "./DepartmentCard.css";

function DepartmentCard({ department }) {
  return (
    <article className="department-card">
      <div className="department-image">
        {department.imageBase64 ? (
          <img
            src={`data:${department.imageType};base64,${department.imageBase64}`}
            alt={department.name}
          />
        ) : (
          <div className="department-letter">
            {department.name?.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <h3 className="department-name">{department.name}</h3>

      <p className="department-specialists">
        {department.specialtyCount} Specialists
      </p>

      <Link
        to={`/departments/${department.departmentId}`}
        className="department-link"
      >
        View Department
        <span>→</span>
      </Link>
    </article>
  );
}

export default DepartmentCard;
