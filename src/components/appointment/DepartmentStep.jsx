import { useState } from "react";
import { Search } from "lucide-react";

import { useGetDepartmentsSummaryQuery } from "../../features/department/departmentApi";

import Pagination from "../../components/common/Pagination/Pagination";
import HorizontalScroll from "../../components/common/Scroll/HorizontalScroll";

import "./DepartmentStep.css";

function DepartmentStep({ selectedDepartment, setSelectedDepartment, onNext }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetDepartmentsSummaryQuery({
    page: currentPage - 1,
    size: 6
  });

  const departments = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const filteredDepartments = departments.filter((department) =>
    department.name?.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredDepartments);
  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="department-step">
      <div className="department-step__header">
        <span className="department-step__step">Step 1</span>

        <h1>Choose a Department</h1>

        <p>Select the department that matches your health needs.</p>
      </div>

      <div className="department-step__search">
        <Search size={17} />

        <input
          type="text"
          placeholder="Search department..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {isLoading && (
        <p className="department-step__message">Loading departments...</p>
      )}

      {isError && (
        <p className="department-step__message department-step__message--error">
          Unable to load departments.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {filteredDepartments.length > 0 ? (
            <HorizontalScroll className="department-step__list">
              {filteredDepartments.map((department) => {
                const isSelected =
                  selectedDepartment?.departmentId === department.departmentId;

                return (
                  <button
                    type="button"
                    key={department.departmentId}
                    className={`department-card ${
                      isSelected ? "department-card--selected" : ""
                    }`}
                    onClick={() => handleSelectDepartment(department)}
                  >
                    <div className="department-card__icon">
                      {department.imageBase64 ? (
                        <img
                          className="department-card__image"
                          src={`data:${department.imageType};base64,${department.imageBase64}`}
                          alt={department.name}
                        />
                      ) : (
                        <span className="department-card__letter">
                          {department.name?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <span className="department-card__name">
                      {department.name}
                    </span>

                    <span className="department-card__count">
                      {department.specialtyCount ?? 0} specialties
                    </span>
                  </button>
                );
              })}
            </HorizontalScroll>
          ) : (
            <p className="department-step__message">No department found.</p>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <div className="department-step__actions">
        <button
          type="button"
          className="department-step__next"
          disabled={!selectedDepartment}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default DepartmentStep;
