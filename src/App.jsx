import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Inspection from "./pages/Inspection";
import Plans from "./pages/Plans";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Profile from "./pages/Profile";
import Inspections from "./pages/Inspections";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/inspection" element={<Inspection />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/inspections" element={<Inspections />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

    </Routes>
  );
}
