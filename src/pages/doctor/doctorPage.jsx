import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import GenericBanner from "../../components/common/GenericBanner/GenericBanner";

import { useSearchSpecialitiesQuery } from "../../features/speciality/specialityApi";
import { useGetDepartmentsSummaryQuery } from "../../features/department/departmentApi";
import { useSearchDoctorsQuery } from "../../features/doctor/doctorApi";

import Pagination from "../../components/common/Pagination/Pagination";
import DoctorCard from "../../components/doctor/DoctorCard/DoctorCard";
import SearchableSelect from "../../components/ui/SearchableSelect/SearchableSelect";
import SearchBar from "../../components/ui/SearchBar/SearchBar";
import DoctorInfoModal from "../../components/doctor/doctormodel/DoctorInfoModal";

import doctorsImage from "../../assets/images/doctors-department.webp";

import "./doctorPage.css";

function DoctorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [specialityId, setSpecialityId] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // =========================
  // SELECTED DOCTOR
  // =========================

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // =========================
  // DEPARTMENT ID
  // =========================

  const departmentId = id;

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
  // DOCTORS
  // =========================

  const {
    data: doctorsresponse,
    isLoading: isDoctorsLoading,
    isError: isDoctorsError
  } = useSearchDoctorsQuery(
    {
      department: departmentId,
      speciality: specialityId || undefined,
      username: search || undefined,
      active: true,
      page: currentPage - 1,
      size: 4
    },
    {
      skip: !departmentId
    }
  );

  const doctors = doctorsresponse?.content ?? [];
  const totalPages = doctorsresponse?.totalPages ?? 0;

  // =========================
  // HANDLERS
  // =========================

  const handleDepartmentChange = (newDepartmentId) => {
    navigate(`/doctors/departments/${newDepartmentId}`);

    setSpecialityId("");
    setCurrentPage(1);
  };

  const handleSpecialityChange = (newSpecialityId) => {
    setSpecialityId(newSpecialityId);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleMoreInformation = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCloseDoctorModal = () => {
    setSelectedDoctor(null);
  };

  const handleBookAppointment = () => {
    console.log("Book appointment", selectedDoctor);
  };

  return (
    <div className="doctorpage">
      {/* =========================
          BANNER
      ========================= */}

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
        {/* =========================
            FILTERS
        ========================= */}

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
            onChange={handleSpecialityChange}
          />

          <div className="doctor-searchbar">
            <SearchBar
              placeholder="Insert doctor's name"
              buttonText="Search"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* =========================
            DOCTORS
        ========================= */}

        <div className="doctors-list">
          {isDoctorsLoading && <p>Loading doctors...</p>}

          {isDoctorsError && <p>Unable to load doctors. Please try again.</p>}

          {!isDoctorsLoading && !isDoctorsError && doctors.length === 0 && (
            <p>No doctors found.</p>
          )}

          {!isDoctorsLoading &&
            !isDoctorsError &&
            doctors.map((doctor) => (
              <DoctorCard
                key={doctor.doctorId}
                doctor={doctor}
                onMoreInformation={handleMoreInformation}
              />
            ))}
        </div>

        {/* =========================
            PAGINATION
        ========================= */}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* =========================
          DOCTOR MODAL
      ========================= */}

      <DoctorInfoModal
        doctor={selectedDoctor}
        isOpen={!!selectedDoctor}
        onClose={handleCloseDoctorModal}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
}

export default DoctorPage;
