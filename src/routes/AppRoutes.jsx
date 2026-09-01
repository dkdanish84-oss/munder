import { Routes, Route } from "react-router-dom";

import WebsiteLayout from "../layouts/WebsiteLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import AdminLogin from "../pages/AdminLogin";

import AdminDashboard from "../pages/AdminDashboard";
import Leads from "../pages/Leads";
import Customers from "../pages/Customers";
import Projects from "../pages/Projects";
import Categories from "../pages/Categories";
import Inventory from "../pages/Inventory";
import Quotations from "../pages/Quotations";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />

      <Route
        path="/"
        element={<WebsiteLayout />}
      >
        <Route
          index
          element={<Home />}
        />
      </Route>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/admin"
        element={<DashboardLayout />}
      >
        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="leads"
          element={<Leads />}
        />

        <Route
          path="customers"
          element={<Customers />}
        />

        <Route
          path="inventory"
          element={<Inventory />}
        />

        <Route
          path="categories"
          element={<Categories />}
        />

        <Route
          path="projects"
          element={<Projects />}
        />

        <Route
          path="quotations"
          element={<Quotations />}
        />
      </Route>
    </Routes>
  );
}
