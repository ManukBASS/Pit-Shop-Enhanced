import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdmin = () => {
  const { user } = useContext(AuthContext);
  const roleAdmin = import.meta.env.VITE_ROLE_ADMIN

  return <>{user?.rol === roleAdmin ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedAdmin;
