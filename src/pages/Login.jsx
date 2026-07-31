import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  signInWithRedirect,
  getRedirectResult,
} from "../config/firebase";

import { useAuthStore } from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function finishGoogleLogin() {
      try {
        const result = await getRedirectResult(auth);

        if (result?.user) {
          const token = await result.user.getIdToken();

          setAuth(result.user, token);

          navigate("/profile", { replace: true });
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    finishGoogleLogin();
  }, [navigate, setAuth]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await credential.user.getIdToken();

      setAuth(credential.user, token);

      navigate("/profile", { replace: true });

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    setError("");

    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "50px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
      }}
    >
      <h2>Login</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleLogin}>

        <p>Email</p>

        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          style={{
            width:"100%",
            padding:10
          }}
        />

        <p>Password</p>

        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          style={{
            width:"100%",
            padding:10
          }}
        />

        <button
          type="submit"
          style={{
            width:"100%",
            marginTop:20,
            padding:12
          }}
        >
          Login
        </button>

      </form>

      <button
        onClick={handleGoogle}
        style={{
          width:"100%",
          marginTop:10,
          padding:12
        }}
      >
        Continue with Google
      </button>

      <p style={{marginTop:15}}>
        Don't have an account?{" "}
        <Link to="/signup">
          Sign Up
        </Link>
      </p>

    </div>
  );
}
