import { useState } from "react";
import { Search } from "lucide-react";

import { useSearchSpecialitiesQuery } from "../../features/speciality/specialityApi";

import "./SpecialityStep.css";

function SpecialityStep({
  selectedDepartment,
  selectedSpeciality,
  setSelectedSpeciality,
  onNext,
  onBack
}) {
  const [search, setSearch] = useState("");

  const departmentId = selectedDepartment?.departmentId;
  console.log("spesiality step departmentId", departmentId);
  const {
    data: specialities = [],
    isLoading,
    isError
  } = useSearchSpecialitiesQuery(
    {
      departmentId,
      active: true
    },
    {
      skip: !departmentId
    }
  );
  console.log("spesiality step", specialities);
  const filteredSpecialities = specialities.filter((speciality) =>
    speciality.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (speciality) => {
    setSelectedSpeciality(speciality);
  };

  return (
    <section className="speciality-step">
      <div className="speciality-step__header">
        <span className="speciality-step__step">Step 2</span>

        <h1>Choose a Speciality</h1>

        <p>
          Select a speciality in <strong>{selectedDepartment?.name}</strong>.
        </p>
      </div>

      <div className="speciality-step__search">
        <Search size={17} />

        <input
          type="text"
          placeholder="Search speciality..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {isLoading && (
        <p className="speciality-step__message">Loading specialities...</p>
      )}

      {isError && (
        <p className="speciality-step__message speciality-step__message--error">
          Unable to load specialities.
        </p>
      )}

      {!isLoading && !isError && (
        <div className="speciality-step__list">
          {filteredSpecialities.length > 0 ? (
            filteredSpecialities.map((speciality) => {
              const isSelected =
                selectedSpeciality?.specialityId === speciality.specialityId;

              return (
                <button
                  type="button"
                  key={speciality.specialityId}
                  className={`speciality-option ${
                    isSelected ? "speciality-option--selected" : ""
                  }`}
                  onClick={() => handleSelect(speciality)}
                >
                  <div className="speciality-option__icon">♡</div>

                  <div className="speciality-option__content">
                    <span className="speciality-option__name">
                      {speciality.name}
                    </span>

                    {speciality.description && (
                      <span className="speciality-option__description">
                        {speciality.description}
                      </span>
                    )}
                  </div>

                  <span
                    className="speciality-option__radio"
                    aria-hidden="true"
                  />
                </button>
              );
            })
          ) : (
            <p className="speciality-step__message">No speciality found.</p>
          )}
        </div>
      )}

      <div className="speciality-step__actions">
        <button
          type="button"
          className="speciality-step__back"
          onClick={onBack}
        >
          Back
        </button>

        <button
          type="button"
          className="speciality-step__next"
          disabled={!selectedSpeciality}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default SpecialityStep;
