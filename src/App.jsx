import React from "react";
import { Routes, Route } from "react-router-dom";

import { Checkout } from "./pages/Checkout";


import GardenMaintenance from "./pages/GardenMaintenance";
import MobileLogin from "./pages/MobileLogin";
import { GardenDetails } from "./pages/GardenDetails";
import { ChooseDate } from "./pages/ChooseDate";
import { Payment } from "./pages/Payment";
import { OrderSuccess } from "./pages/OrderSuccess";
import Home from "./pages/Home";
import Visit from "./pages/Visit";
import Plans from "./pages/Plans";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

<Route path="/mobile-login" element={<MobileLogin />} />

<Route path="/checkout" element={<Checkout />} />
<Route path="/garden-details" element={<GardenDetails />} />
<Route path="/choose-date" element={<ChooseDate />} />
<Route path="/payment" element={<Payment />} />
<Route path="/order-success" element={<OrderSuccess />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

	<Route
  path="/garden-maintenance-bhopal"
  element={<GardenMaintenance />}
/>
        <Route path="/visit" element={<Visit />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
}
