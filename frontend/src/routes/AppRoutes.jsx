import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Scans from "../pages/Scans/Scans";
import ScanDetails from "../pages/Scans/ScanDetails";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Dashboard from "../pages/Dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />

      <Route path="/scans" element={<Scans />} />

      <Route
        path="/scans/:slug"
        element={<ScanDetails />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Route>

      <Route
        path="*"
        element={<h1>404 - Page Not Found</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;