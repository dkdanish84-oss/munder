import React from "react";
import { Routes, Route } from "react-router-dom";

import { Checkout } from "./pages/Checkout";
import MobileLogin from "./pages/MobileLogin";

import { GardenDetails } from "./pages/GardenDetails";
import { ChooseDate } from "./pages/ChooseDate";
import { Payment } from "./pages/Payment";
import { OrderSuccess } from "./pages/OrderSuccess";

import Home from "./guest/pages/Home";

import Visit from "./pages/Visit";
import Plans from "./pages/Plans";
import Services from "./pages/Services";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import MyGarden from "./pages/MyGarden";
import MyVisits from "./pages/MyVisits";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import PaymentHistory from "./pages/PaymentHistory";
import MyPlan from "./pages/MyPlan";
import PlanPayment from "./pages/PlanPayment";
import PlanUpgradeSuccess from "./pages/PlanUpgradeSuccess";

import AdminDashboard from "./pages/AdminDashboard";

import Layout from "./components/Layout";
import CustomerLayout from "./layouts/CustomerLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* =====================================================
            PUBLIC AUTH
        ===================================================== */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/mobile-login"
          element={<MobileLogin />}
        />

        {/* =====================================================
            GUEST WEBSITE
        ===================================================== */}

        <Route element={<Layout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/garden-maintenance-bhopal"
            element={<Services />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          <Route
            path="/visit"
            element={<Visit />}
          />

          <Route
            path="/plans"
            element={<Plans />}
          />

          <Route
            path="/shop"
            element={<Shop />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/payment"
            element={<Payment />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/garden-details"
            element={<GardenDetails />}
          />

          <Route
            path="/choose-date"
            element={<ChooseDate />}
          />

        </Route>

        {/* =====================================================
            SEPARATE CRM / ADMIN PANEL
        ===================================================== */}

        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* =====================================================
            CUSTOMER DASHBOARD
            LOGIN REQUIRED
        ===================================================== */}

        <Route element={<ProtectedRoute />}>

          <Route element={<CustomerLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/my-plan"
              element={<MyPlan />}
            />

            <Route
              path="/plan-payment"
              element={<PlanPayment />}
            />
            <Route
              path="/plan-upgrade-success"
              element={<PlanUpgradeSuccess />}
            />

            <Route
              path="/my-garden"
              element={<MyGarden />}
            />

            <Route
              path="/my-visits"
              element={<MyVisits />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            <Route
              path="/wishlist"
              element={<Wishlist />}
            />

            <Route
              path="/notifications"
              element={<Notifications />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="/payments"
              element={<PaymentHistory />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

          </Route>

        </Route>

      </Routes>
    </>
  );
}

