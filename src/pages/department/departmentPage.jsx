import { useState } from "react";

import {
  useGetDepartmentsSummaryQuery,
  useSearchDepartmentsQuery
} from "../../features/department/departmentApi";

import GenericBanner from "../../components/common/GenericBanner/GenericBanner";
import SearchBar from "../../components/ui/SearchBar/SearchBar";
import Pagination from "../../components/common/Pagination/Pagination";

import DepartmentCard from "../../components/departments/DepartmentCard/DepartmentCard";

import doctorsImage from "../../assets/images/doctors-department.webp";

import "./Department.css";

const DepartmentPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;

  // =========================
  // PAGINATION
  // =========================

  const {
    data: pageData,
    isLoading: isPageLoading,
    isError: isPageError
  } = useGetDepartmentsSummaryQuery({
    page: currentPage - 1,
    size: pageSize
  });

  // =========================
  // SEARCH
  // =========================

  const {
    data: searchResults = [],
    isLoading: isSearchLoading,
    isError: isSearchError
  } = useSearchDepartmentsQuery(
    {
      name: search
    },
    {
      skip: search.trim() === ""
    }
  );

  // =========================
  // DATA TO DISPLAY
  // =========================

  const isSearching = search.trim() !== "";

  const departments = isSearching ? searchResults : (pageData?.content ?? []);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = pageData?.totalPages ?? 0;

  // =========================
  // LOADING / ERROR
  // =========================

  const isLoading = isSearching ? isSearchLoading : isPageLoading;

  const isError = isSearching ? isSearchError : isPageError;

  // =========================
  // SEARCH CHANGE
  // =========================

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <main className="department-page">
      {/* =========================
          BANNER
      ========================== */}

      <GenericBanner
        badge="Department"
        title="Explore Our"
        highlightedTitle="Medical Departments"
        description="Provide comprehensive and compassionate care, utilizing the latest advancements in medical technology to ensure the best outcomes for our patients."
        image={doctorsImage}
        cards={[
          {
            label: "Pediatrics",
            position: "left"
          },
          {
            label: "General Medicine",
            position: "top-right"
          },
          {
            label: "Cardiology",
            position: "bottom-right"
          }
        ]}
        label="Departments"
        path="/departments"
      />
      {/* =========================
          DEPARTMENTS
      ========================== */}

      <section className="department-section">
        <div className="department-section__header">
          <h2>Medical Departments</h2>

          <SearchBar
            placeholder="Find your department"
            buttonText="Search"
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        {/* =========================
            LOADING
        ========================== */}

        {isLoading && (
          <div className="department-empty">
            <p>
              {isSearching
                ? "Searching departments..."
                : "Loading departments..."}
            </p>
          </div>
        )}

        {/* =========================
            ERROR
        ========================== */}

        {isError && (
          <div className="department-empty">
            <p>Unable to load departments.</p>
          </div>
        )}

        {/* =========================
            CARDS
        ========================== */}

        {!isLoading && !isError && departments.length > 0 && (
          <div className="department-grid">
            {departments.map((department) => (
              <DepartmentCard
                key={department.departmentId}
                department={department}
              />
            ))}
          </div>
        )}

        {/* =========================
            EMPTY
        ========================== */}

        {!isLoading && !isError && departments.length === 0 && (
          <div className="department-empty">
            <p>
              {isSearching
                ? "No department found."
                : "No departments available."}
            </p>
          </div>
        )}

        {/* =========================
            PAGINATION
        ========================== */}

        {!isSearching && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </main>
  );
};

export default DepartmentPage;
