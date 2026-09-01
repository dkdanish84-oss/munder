import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, onAuthStateChanged } from "../config/firebase";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://munder.in";

export default function ActivePlanGate({ children }) {
  const [state, setState] = useState("loading");

  useEffect(() => {
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        if (!cancelled) {
          setState("blocked");
        }
        return;
      }

      try {
        const token = await user.getIdToken();

        const response = await fetch(
          `${API_BASE}/api/v1/customer/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to verify customer."
          );
        }

        const customer = data.customer;

        console.log("ActivePlanGate customer:", customer);

        const active =
          customer?.status === "ACTIVE" &&
          !!customer?.plan;

        console.log("ActivePlanGate active:", active);

        if (!cancelled) {
          setState(active ? "active" : "blocked");
        }
      } catch (error) {
        console.error("ActivePlanGate error:", error);

        if (!cancelled) {
          setState("blocked");
        }
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  if (state === "loading") {
    return (
      <div
        style={{
          minHeight: "40vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        Checking your plan...
      </div>
    );
  }

  if (state === "blocked") {
    return <Navigate to="/my-plan" replace />;
  }

  return children;
}

