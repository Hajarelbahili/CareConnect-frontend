import { useState } from "react";
import { Search, UserRound } from "lucide-react";

import { useSearchDoctorsQuery } from "../../features/doctor/doctorApi";

import Pagination from "../../components/common/Pagination/Pagination";

import "./DoctorStep.css";

function DoctorStep({
  selectedDepartment,
  selectedSpeciality,
  selectedDoctor,
  setSelectedDoctor,
  onNext,
  onBack
}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const departmentId = selectedDepartment?.departmentId;
  const specialityId = selectedSpeciality?.specialityId;

  const { data, isLoading, isError } = useSearchDoctorsQuery({
    department: departmentId,
    speciality: specialityId,
    username: search.trim() || undefined,
    active: true,
    page: currentPage - 1,
    size: 6
  });

  const doctors = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <section className="doctor-step">
      <div className="doctor-step__header">
        <span className="doctor-step__step">Step 3</span>

        <h1>Choose a Doctor</h1>

        <p>
          Select a doctor for <strong>{selectedSpeciality?.name}</strong>.
        </p>
      </div>

      <div className="doctor-step__search">
        <Search size={17} />

        <input
          type="text"
          placeholder="Search doctor..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {isLoading && <p className="doctor-step__message">Loading doctors...</p>}

      {isError && (
        <p className="doctor-step__message doctor-step__message--error">
          Unable to load doctors.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {doctors.length > 0 ? (
            <div className="doctor-step__list">
              {doctors.map((doctor) => {
                const isSelected = selectedDoctor?.doctorId === doctor.doctorId;

                const image = doctor.imageBase64
                  ? `data:${doctor.imageType};base64,${doctor.imageBase64}`
                  : null;

                return (
                  <button
                    type="button"
                    key={doctor.doctorId}
                    className={`doctor-selection-card ${
                      isSelected ? "doctor-selection-card--selected" : ""
                    }`}
                    onClick={() => handleSelectDoctor(doctor)}
                  >
                    <div className="doctor-selection-card__image">
                      {image ? (
                        <img src={image} alt={doctor.username || "Doctor"} />
                      ) : (
                        <UserRound size={28} />
                      )}
                    </div>

                    <div className="doctor-selection-card__info">
                      <h3>
                        {doctor.firstName || doctor.firstname
                          ? `${doctor.firstName || doctor.firstname} ${
                              doctor.lastName || doctor.lastname || ""
                            }`
                          : doctor.username}
                      </h3>

                      <span>{selectedSpeciality?.name}</span>

                      {doctor.email && <small>{doctor.email}</small>}
                    </div>

                    <span
                      className="doctor-selection-card__radio"
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="doctor-step__message">
              No doctor found for this speciality.
            </p>
          )}

          {doctors.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      <div className="doctor-step__actions">
        <button type="button" className="doctor-step__back" onClick={onBack}>
          Back
        </button>

        <button
          type="button"
          className="doctor-step__next"
          disabled={!selectedDoctor}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default DoctorStep;
