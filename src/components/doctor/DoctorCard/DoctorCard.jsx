import "./DoctorCard.css";

function DoctorCard({ doctor, onMoreInformation }) {
  return (
    <article className="doctor-card">
      {/* IMAGE */}
      <div className="doctor-card-image">
        {doctor.imageBase64 ? (
          <img
            src={`data:${doctor.imageType};base64,${doctor.imageBase64}`}
            alt={`Dr. ${doctor.username}`}
          />
        ) : (
          <div className="doctor-card-placeholder">
            {doctor.username?.charAt(0)}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="doctor-card-content">
        <div>
          <h3 className="doctor-card-name">Dr. {doctor.username}</h3>

          <p className="doctor-card-speciality">{doctor.departmentName}</p>
        </div>

        <button
          type="button"
          className="doctor-card-link"
          onClick={() => onMoreInformation(doctor)}
        >
          More information
        </button>
      </div>
    </article>
  );
}

export default DoctorCard;
