import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
}

export default DashboardPage;
