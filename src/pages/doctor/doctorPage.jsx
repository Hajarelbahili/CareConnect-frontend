import { useState } from "react";
import { useParams } from "react-router-dom";

import GenericBanner from "../../components/common/GenericBanner/GenericBanner";

import { useSearchSpecialitiesQuery } from "../../features/speciality/specialityApi";
import { useGetDepartmentsSummaryQuery } from "../../features/department/departmentApi";

import SearchableSelect from "../../components/ui/SearchableSelect/SearchableSelect";
import SearchBar from "../../components/ui/SearchBar/SearchBar";

import doctorsImage from "../../assets/images/doctors-department.webp";

import "./doctorPage.css";

function DoctorPage() {
  const { id } = useParams();

  const [departmentId, setDepartmentId] = useState(id);
  const [specialityId, setSpecialityId] = useState("");
  const [search, setSearch] = useState("");

  // =========================
  // DEPARTMENTS
  // =========================

  const {
    data: departmentsData,
    isLoading: departmentsLoading,
    isError: departmentsError
  } = useGetDepartmentsSummaryQuery({
    page: 0,
    size: 1000
  });

  const departments = departmentsData?.content ?? [];

  // =========================
  // SPECIALITIES
  // =========================

  const {
    data: specialities,
    isLoading: specialitiesLoading,
    isError: specialitiesError
  } = useSearchSpecialitiesQuery({
    departmentId,
    active: true
  });

  // =========================
  // OPTIONS
  // =========================

  const departmentOptions = departments.map((department) => ({
    value: department.departmentId,
    label: department.name,
    description: `${department.specialtyCount} specialities`
  }));

  const specialityOptions = (specialities ?? []).map((speciality) => ({
    value: speciality.specialityId,
    label: speciality.name,
    description: speciality.description
  }));

  // =========================
  // HANDLERS
  // =========================

  const handleDepartmentChange = (newDepartmentId) => {
    setDepartmentId(newDepartmentId);
    setSpecialityId("");
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  return (
    <div className="doctorpage">
      <GenericBanner
        badge="Department"
        title="Explore Our"
        highlightedTitle="Our Doctors"
        description="Meet our experienced and compassionate doctors, dedicated to providing expert care and personalized treatment to help every patient achieve better health."
        image={doctorsImage}
        cards={[
          { label: "pediatrician", position: "left" },
          { label: "GP", position: "top-right" },
          { label: "cardiologist", position: "bottom-right" }
        ]}
        label="Doctors"
        path="/doctors/departments/*"
      />
      <div className="doctorsection">
        <div className="searchsection">
          <SearchableSelect
            label="Select Department"
            placeholder="Choose a department"
            searchPlaceholder="Search department..."
            options={departmentOptions}
            value={departmentId}
            onChange={handleDepartmentChange}
          />

          <SearchableSelect
            label="Select Speciality"
            placeholder="Choose a speciality"
            searchPlaceholder="Search speciality..."
            options={specialityOptions}
            value={specialityId}
            onChange={setSpecialityId}
          />

          <SearchBar
            placeholder="Insert doctor's name"
            buttonText="Search"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
}

export default DoctorPage;
