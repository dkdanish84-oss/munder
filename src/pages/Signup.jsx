import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  signInWithRedirect,
  getRedirectResult,
} from "../config/firebase";

import { useAuthStore } from "../store/authStore";

export default function Signup() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function finishGoogleSignup() {
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

    finishGoogleSignup();
  }, [navigate, setAuth]);

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const credential = await createUserWithEmailAndPassword(
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

  const handleGoogleSignup = async () => {
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
      <h2>Sign Up</h2>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSignup}>

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
          Create Account
        </button>

      </form>

      <button
        onClick={handleGoogleSignup}
        style={{
          width:"100%",
          marginTop:10,
          padding:12
        }}
      >
        Continue with Google
      </button>

      <p style={{marginTop:15}}>
        Already have an account?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>

    </div>
  );
}
