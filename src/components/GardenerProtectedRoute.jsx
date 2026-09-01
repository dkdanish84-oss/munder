import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth, onAuthStateChanged, signOut } from "../config/firebase";
import { useAuthStore } from "../store/authStore";

export default function GardenerProtectedRoute() {
  const { isAuthenticated, setAuth, logout } = useAuthStore();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let active = true;

    const checkGardener = async (user) => {
      try {
        if (!user) {
          logout();
          if (active) setAllowed(false);
          return;
        }

        const token = await user.getIdToken();
        setAuth(user, token);

        const response = await fetch("/api/v1/gardener/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          await signOut(auth).catch(() => {});
          logout();
          if (active) setAllowed(false);
          return;
        }

        if (active) setAllowed(true);
      } catch (error) {
        console.error("Gardener authorization check failed:", error);
        await signOut(auth).catch(() => {});
        logout();
        if (active) setAllowed(false);
      } finally {
        if (active) setChecking(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, checkGardener);

    return () => {
      active = false;
      unsubscribe();
    };
  }, [logout, setAuth]);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "Arial, sans-serif",
          color: "#173322",
        }}
      >
        Checking gardener access...
      </div>
    );
  }

  if (!auth.currentUser || !isAuthenticated || !allowed) {
    return <Navigate to="/gardener/login" replace />;
  }

  return <Outlet />;
}
