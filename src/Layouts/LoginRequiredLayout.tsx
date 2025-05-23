import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoginRequiredLayout: React.FC = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default LoginRequiredLayout;
