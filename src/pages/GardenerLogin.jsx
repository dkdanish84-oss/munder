import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

export default function GardenerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const credential =
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      /*
       * Firebase login successful.
       * Backend will perform the actual Gardener
       * authorization using the user's Firebase UID.
       */
      const token =
        await credential.user.getIdToken();

      if (!token) {
        throw new Error(
          "Unable to authenticate gardener."
        );
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL ||
          "https://munder.in"
        }/api/v1/gardener/me`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        await auth.signOut();

        throw new Error(
          data.message ||
          "This account is not registered as a gardener."
        );
      }

      navigate(
        "/gardener",
        { replace: true }
      );
    } catch (err) {
      console.error(
        "Gardener login failed:",
        err
      );

      let message =
        "Gardener login failed.";

      if (
        err?.code ===
        "auth/invalid-credential"
      ) {
        message =
          "Invalid email or password.";
      } else if (
        err?.code ===
        "auth/user-disabled"
      ) {
        message =
          "This gardener account has been disabled.";
      } else if (
        err?.code ===
        "auth/too-many-requests"
      ) {
        message =
          "Too many login attempts. Please try again later.";
      } else if (err?.message) {
        message =
          err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "#F4F7F3",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "36px",
          boxShadow:
            "0 10px 35px rgba(24,59,42,0.10)",
          border:
            "1px solid #E2EAE3",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 900,
              color: "#183B2A",
              letterSpacing: "0.5px",
            }}
          >
            MUNDER
          </div>

          <div
            style={{
              marginTop: "8px",
              fontSize: "22px",
              fontWeight: 800,
              color: "#183B2A",
            }}
          >
            Gardener Login
          </div>

          <div
            style={{
              marginTop: "6px",
              color: "#6C786F",
              fontSize: "14px",
            }}
          >
            Sign in to manage your assigned visits.
          </div>
        </div>

        {error && (
          <div
            style={{
              background: "#FFF1F1",
              color: "#B42318",
              border:
                "1px solid #F2C5C5",
              borderRadius: "10px",
              padding: "12px 14px",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
        >
          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: 700,
              color: "#183B2A",
              fontSize: "14px",
            }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            autoComplete="username"
            placeholder="Gardener email"
            disabled={loading}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding:
                "13px 14px",
              border:
                "1px solid #D5DED7",
              borderRadius: "10px",
              marginBottom: "18px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "7px",
              fontWeight: 700,
              color: "#183B2A",
              fontSize: "14px",
            }}
          >
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            autoComplete="current-password"
            placeholder="Password"
            disabled={loading}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding:
                "13px 14px",
              border:
                "1px solid #D5DED7",
              borderRadius: "10px",
              marginBottom: "22px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              border: "none",
              borderRadius: "10px",
              padding: "14px",
              background:
                loading
                  ? "#8FA596"
                  : "#2E7D32",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "15px",
              cursor:
                loading
                  ? "default"
                  : "pointer",
            }}
          >
            {loading
              ? "Signing in..."
              : "Gardener Login"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "22px",
            color: "#7A857E",
            fontSize: "12px",
          }}
        >
          Gardener accounts are created and
          managed by MUNDER Admin.
        </div>
      </div>
    </div>
  );
}

