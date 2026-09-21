import { Link } from "react-router-dom";
import "./DoctorCard.css";

function DoctorCard({ doctor }) {
  return (
    <article className="doctor-card">
      <div className="doctor-card-image">
        {doctor.imageBase64 ? (
          <img
            src={`data:${doctor.imageType};base64,${doctor.imageBase64}`}
            alt={doctor.username}
          />
        ) : (
          <div className="doctor-card-placeholder">
            {doctor.username?.charAt(0)}
          </div>
        )}
      </div>

      <div className="doctor-card-content">
        <div>
          <h3 className="doctor-card-name">Dr. {doctor.username}</h3>

          <p className="doctor-card-speciality">{doctor.departmentName}</p>
        </div>
        <Link to={`/doctors/${doctor.doctorId}`} className="doctor-card-link">
          View Profile
        </Link>
      </div>
    </article>
  );
}

export default DoctorCard;
