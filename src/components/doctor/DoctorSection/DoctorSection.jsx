import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetDepartmentsSummaryQuery } from "../../../features/department/departmentApi";
import { useSearchDoctorsQuery } from "../../../features/doctor/doctorApi";
import DoctorCard from "../DoctorCard/DoctorCard";
import HorizontalScroll from "../../common/Scroll/HorizontalScroll";
import "./DoctorSection.css";

function DoctorSection() {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  // =========================
  // Departments
  // =========================

  const {
    data,
    isLoading: isDepartmentsLoading,
    isError: isDepartmentsError
  } = useGetDepartmentsSummaryQuery();

  const departments = data?.content ?? [];

  // Premier département par défaut
  const departmentId =
    selectedDepartmentId ?? departments[0]?.departmentId ?? null;

  const selectedDepartment = departments.find(
    (department) => department.departmentId === departmentId
  );

  // =========================
  // Doctors
  // =========================

  const {
    data: doctorsresponse,
    isLoading: isDoctorsLoading,
    isError: isDoctorsError
  } = useSearchDoctorsQuery(
    {
      department: departmentId,
      page: 0,
      size: 4
    },
    {
      skip: !departmentId
    }
  );

  const doctors = doctorsresponse?.content ?? [];
  console.log("doctors", doctors);
  // =========================
  // Loading departments
  // =========================

  if (isDepartmentsLoading) {
    return (
      <section className="doctor-section">
        <p className="doctor-section-message">Loading departments...</p>
      </section>
    );
  }

  // =========================
  // Error departments
  // =========================

  if (isDepartmentsError) {
    return (
      <section className="doctor-section">
        <p className="doctor-section-error">Unable to load departments.</p>
      </section>
    );
  }

  return (
    <section className="doctor-section">
      {/* =========================
          Department filters
      ========================= */}

      <div className="doctor-section-departments">
        <div className="departments-header">
          <div>
            <p className="departments-label">OUR DOCTORS</p>

            <h2>Meet our trusted healthcare professionals</h2>
          </div>
        </div>
        <HorizontalScroll className="department-buttons">
          {departments.slice(0, 5).map((department) => (
            <button
              key={department.departmentId}
              type="button"
              className={`department-button ${
                departmentId === department.departmentId ? "active" : ""
              }`}
              onClick={() => setSelectedDepartmentId(department.departmentId)}
            >
              <span className="department-button-icon">
                {department.imageBase64 ? (
                  <img
                    src={`data:${department.imageType};base64,${department.imageBase64}`}
                    alt={department.name}
                  />
                ) : (
                  department.name?.charAt(0)
                )}
              </span>

              <span>{department.name}</span>
            </button>
          ))}
          {/* View All departments */}

          <button type="button" className="department-view-all">
            <span className="department-view-all-icon">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>

            <span>View All</span>
          </button>
        </HorizontalScroll>
      </div>

      {/* =========================
          Doctors
      ========================= */}

      {/* =========================
    Doctors
========================= */}

      <div className="doctor-section-content">
        {isDoctorsLoading && (
          <p className="doctor-section-message">Loading doctors...</p>
        )}

        {isDoctorsError && (
          <p className="doctor-section-error">Unable to load doctors.</p>
        )}

        {!isDoctorsLoading && !isDoctorsError && (
          <div className="doctor-section-grid">
            {/* Doctors */}

            {doctors.slice(0, 4).map((doctor) => (
              <DoctorCard key={doctor.doctorId} doctor={doctor} />
            ))}

            {/* View All Doctors */}

            <button type="button" className="see-all-doctors-card">
              <span className="see-all-doctors-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>

              <strong>
                See all doctors in
                <br />
                {selectedDepartment?.name}
              </strong>

              <span className="see-all-doctors-link">
                <Link to={`/doctors/departments/${departmentId}`}>
                  View All
                </Link>
                <span>→</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default DoctorSection;
