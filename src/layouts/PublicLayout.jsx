import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer/Footer";
import Navbar from "../components/layout/Navbar/Navbar";
import "./PublicLauout.css";
function PublicLayout() {
  return (
    <div className="public-layout">
      <div className="public-content">
        <Navbar />

        <main className="public-main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default PublicLayout;
