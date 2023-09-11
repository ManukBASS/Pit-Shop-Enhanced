import { Route, Routes } from "react-router-dom";
import Navbar from "../components/layout/navbar/Navbar";
import { routes } from "./routes";
import Login from "../components/pages/login/Login";
import Register from "../components/pages/register/Register";
import ForgotPassword from "../components/pages/forgotPassword/ForgotPassword";
import Dashboard from "../components/pages/dashboard/Dashboard";
import ProtectedAdmin from "./ProtectedAdmin";
import ProtectedUsers from "./ProtectedUsers";

const AppRouter = () => {
  return (
    <Routes>
      {/* LOGGED USERS ONLY */}
      <Route element={<ProtectedUsers />}>
        <Route element={<Navbar />}>
          {routes.map(({ id, path, Element }) => (
            <Route key={id} path={path} element={<Element />} />
          ))}
        </Route>
      </Route>

      {/* ADMIN USERS ONLY */}
      <Route element={<ProtectedAdmin />}>
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Register  */}
      <Route path="/register" element={<Register />} />

      {/* Forgot Password  */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};

export default AppRouter;
