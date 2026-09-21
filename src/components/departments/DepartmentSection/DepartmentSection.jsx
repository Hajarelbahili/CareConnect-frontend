import DepartmentCard from "../DepartmentCard/DepartmentCard";
import { useGetDepartmentsSummaryQuery } from "../../../features/department/departmentApi";
import "./DepartmentSection.css";

function DepartmentSection() {
  const { data, isLoading, isError } = useGetDepartmentsSummaryQuery();
  console.log("departments:", data);
  console.log("error:", isError);
  const departments = data?.content ?? [];
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Failed to load departments.</p>;
  }

  return (
    <section className="departments-section">
      <div className="departments-container">
        <div className="departments-header">
          <div>
            <p className="departments-label">OUR DEPARTMENTS</p>

            <h2>Find the right care for you</h2>
          </div>

          <a href="/departments" className="departments-view-all">
            View All
            <span>→</span>
          </a>
        </div>

        <div className="departments-grid">
          {departments.map((department) => (
            <DepartmentCard
              key={department.departmentId}
              department={department}
            />
          ))}

          {/* More Departments */}

          <a href="/departments" className="more-departments-card">
            <div className="more-departments-icon">+</div>

            <h3>More Departments</h3>

            <p>Explore all specialties</p>

            <span>View All →</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default DepartmentSection;
