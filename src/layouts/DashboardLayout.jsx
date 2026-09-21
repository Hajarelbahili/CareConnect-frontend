import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar/Navbar";
function DashboardLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <aside></aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
