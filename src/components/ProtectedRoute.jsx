import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth, onAuthStateChanged } from "../config/firebase";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute() {
  const { isAuthenticated, setAuth } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("=== onAuthStateChanged ===");
      console.log(user);

      if (user) {
        const token = await user.getIdToken();
        setAuth(user, token);
      }

      setChecking(false);
    });

    return () => unsubscribe();
  }, [setAuth]);

  if (checking) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
