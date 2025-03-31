import { Navigate } from "react-router-dom";
import useAuthStore from "../store/Auth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) return <div className="h-screen flex justify-center items-center">Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
