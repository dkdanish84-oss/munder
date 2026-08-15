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
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* AUTH PAGES */}

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/mobile-login"
          element={<MobileLogin />}
        />

        {/* COMMON LAYOUT */}

        <Route element={<Layout />}>

          {/* GUEST WEBSITE */}

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

          {/* DASHBOARD */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/profile"
            element={<Profile />}
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

          {/* SERVICE FLOW */}

          <Route
            path="/garden-details"
            element={<GardenDetails />}
          />

          <Route
            path="/choose-date"
            element={<ChooseDate />}
          />

        </Route>
      </Routes>
    </>
  );
}


