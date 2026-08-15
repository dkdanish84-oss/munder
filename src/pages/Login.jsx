import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  auth,
  googleProvider,
  signInWithPopup,
} from "../config/firebase";

import { useAuthStore } from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (newMode) => {
    setError("");
    setMode(newMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let credential;

      if (mode === "login") {
        credential = await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      } else {
        if (!name.trim()) {
          throw new Error("Please enter your name.");
        }

        credential = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
      }

      const token = await credential.user.getIdToken();

      setAuth(credential.user, token);

      navigate("/profile", { replace: true });
    } catch (err) {
      console.error(err);

      let message = "Something went wrong. Please try again.";

      if (err?.code === "auth/invalid-credential") {
        message = "Invalid email or password.";
      } else if (err?.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (err?.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      } else if (err?.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (err?.message) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      const token = await result.user.getIdToken();

      setAuth(result.user, token);

      navigate("/profile", { replace: true });
    } catch (err) {
      console.error(err);

      let message = "Google login failed.";

      if (err?.code === "auth/popup-closed-by-user") {
        message = "Google login was cancelled.";
      } else if (err?.message) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`

        /* =========================================================
           MUNDER LOGIN
           BRAND COLORS
        ========================================================= */

        :root {
          --munder-green: #0E4D28;
          --munder-dark-green: #07351B;
          --munder-green-2: #176B3A;
          --munder-light-green: #E8F5E9;
          --munder-beige: #D8C39A;
          --munder-beige-light: #F3EBDD;
          --munder-white: #FFFFFF;
          --munder-text: #173322;
          --munder-muted: #7A857D;
        }

        /* =========================================================
           PAGE
        ========================================================= */

        .munder-login-page {
          min-height: calc(100vh - 80px);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 45px 20px;
          background:
            radial-gradient(
              circle at 10% 20%,
              rgba(14,77,40,.10),
              transparent 30%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(216,195,154,.14),
              transparent 30%
            ),
            #f7f9f6;
          overflow: hidden;
        }

        /* =========================================================
           CARD
        ========================================================= */

        .munder-auth-wrapper {
          width: min(980px, 100%);
          min-height: 600px;
          height: auto;
          position: relative;
          overflow: hidden;
          background: #fff;
          border-radius: 22px;
          border: 1px solid rgba(14,77,40,.12);

          box-shadow:
            0 30px 80px rgba(14,77,40,.13),
            0 8px 25px rgba(0,0,0,.08);

          animation: cardEnter .8s cubic-bezier(.22,1,.36,1);
        }

        @keyframes cardEnter {
          from {
            opacity: 0;
            transform: translateY(35px) scale(.97);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* =========================================================
           PANELS
        ========================================================= */

        .munder-auth-panel {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
        }

        /* =========================================================
           LEFT BRAND PANEL
        ========================================================= */

        .munder-brand-panel {
          left: 0;
          z-index: 3;
          overflow: hidden;

          display: flex;
          align-items: center;

          color: white;

          background:
            radial-gradient(
              circle at 90% 10%,
              rgba(216,195,154,.16),
              transparent 35%
            ),
            linear-gradient(
              145deg,
              #07351B 0%,
              #0E4D28 55%,
              #176B3A 100%
            );

          padding: 55px 50px;

          clip-path: polygon(
            0 0,
            100% 0,
            78% 50%,
            100% 100%,
            0 100%
          );

          animation: brandEnter .9s cubic-bezier(.22,1,.36,1);
        }

        @keyframes brandEnter {
          from {
            opacity: 0;
            transform: translateX(-80px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* animated glow */

        .munder-brand-panel::before {
          content: "";
          position: absolute;
          width: 330px;
          height: 330px;
          right: -100px;
          top: -100px;

          border-radius: 50%;

          background: rgba(216,195,154,.10);

          animation: glowMove 7s ease-in-out infinite;
        }

        .munder-brand-panel::after {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          left: -150px;
          bottom: -140px;

          border-radius: 50%;

          background: rgba(216,195,154,.08);

          animation: glowMove2 8s ease-in-out infinite;
        }

        @keyframes glowMove {
          0%,100% {
            transform: translate(0,0) scale(1);
          }

          50% {
            transform: translate(-30px,35px) scale(1.15);
          }
        }

        @keyframes glowMove2 {
          0%,100% {
            transform: translate(0,0);
          }

          50% {
            transform: translate(35px,-25px);
          }
        }

        .munder-brand-inner {
          position: relative;
          z-index: 5;
          width: 78%;
        }

        /* =========================================================
           ORIGINAL LOGO
        ========================================================= */

        .munder-original-logo {
          position: relative;
          z-index: 3;
          display: block;
          width: 238px;
          height: auto;
          max-width: 100%;
          padding: 10px 24px;
          border-radius: 19px;
          background: #ffffff;
          object-fit: contain;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
          margin: 0 auto 28px;
        }

        @keyframes logoReveal {
          from {
            opacity: 0;
            transform: translateY(-25px) scale(.85);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes logoFloat {
          0%,100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        /* =========================================================
           BRAND TEXT
        ========================================================= */

        .munder-welcome-title {
          margin: 0 0 17px;

          font-size: 43px;
          line-height: 1.02;
          font-weight: 900;
          letter-spacing: -1px;

          color: white;

          animation: textReveal .9s .25s both;
        }

        .munder-welcome-title span {
          color: var(--munder-beige);
        }

        .munder-welcome-text {
          margin: 0;

          max-width: 310px;

          font-size: 14px;
          line-height: 1.8;

          color: rgba(255,255,255,.78);

          animation: textReveal .9s .4s both;
        }

        @keyframes textReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =========================================================
           FORM PANEL
        ========================================================= */

        .munder-form-panel {
          right: 0;
          z-index: 2;

          display: flex;
          justify-content: center;
          align-items: center;

          background: #fff;

          padding: 34px 65px 34px 135px;
          min-height: 600px;
          height: auto;

          animation: formEnter .9s cubic-bezier(.22,1,.36,1);
        }

        @keyframes formEnter {
          from {
            opacity: 0;
            transform: translateX(70px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .munder-form-content {
          width: 100%;
          max-width: 390px;
        }

        /* =========================================================
           LOGIN / SIGNUP TABS
        ========================================================= */

        .munder-mode-tabs {
          position: relative;

          display: flex;

          width: 100%;
          height: 50px;

          padding: 4px;

          margin-bottom: 35px;

          background: #edf3ee;

          border-radius: 28px;

          overflow: hidden;
        }

        .munder-mode-tab {
          position: relative;
          z-index: 2;

          flex: 1;

          border: 0;
          background: transparent;

          border-radius: 24px;

          font-size: 13px;
          font-weight: 800;

          color: var(--munder-green);

          cursor: pointer;

          transition:
            color .35s ease,
            transform .25s ease;
        }

        .munder-mode-tab.active {
          color: white;
        }

        .munder-mode-tab:hover {
          transform: translateY(-1px);
        }

        .munder-mode-slider {
          position: absolute;

          top: 4px;
          bottom: 4px;

          width: calc(50% - 4px);

          background:
            linear-gradient(
              135deg,
              var(--munder-green),
              var(--munder-green-2)
            );

          border-radius: 24px;

          box-shadow:
            0 5px 15px rgba(14,77,40,.22);

          transition:
            transform .45s cubic-bezier(.68,-.25,.265,1.25);
        }

        .munder-mode-slider.signup {
          transform: translateX(calc(100% + 4px));
        }

        /* =========================================================
           FORM TITLE
        ========================================================= */

        .munder-form-title {
          margin: 0 0 7px;

          font-size: 32px;
          line-height: 1.1;

          font-weight: 900;

          color: var(--munder-text);

          animation: titleReveal .5s ease;
        }

        @keyframes titleReveal {
          from {
            opacity: 0;
            transform: translateX(15px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .munder-form-subtitle {
          margin: 0 0 29px;

          font-size: 13px;

          color: var(--munder-muted);
        }

        /* =========================================================
           ERROR
        ========================================================= */

        .munder-error {
          padding: 11px 13px;

          margin-bottom: 17px;

          border-radius: 9px;

          background: #fff3f3;
          border: 1px solid #ffd0d0;

          color: #b42318;

          font-size: 12px;

          animation: errorShake .35s ease;
        }

        @keyframes errorShake {
          0%,100% {
            transform: translateX(0);
          }

          25% {
            transform: translateX(-5px);
          }

          75% {
            transform: translateX(5px);
          }
        }

        /* =========================================================
           INPUTS
        ========================================================= */

        .munder-field {
          margin-bottom: 19px;

          animation: fieldReveal .55s ease both;
        }

        .munder-field:nth-child(2) {
          animation-delay: .05s;
        }

        .munder-field:nth-child(3) {
          animation-delay: .1s;
        }

        @keyframes fieldReveal {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .munder-field label {
          display: block;

          margin-bottom: 7px;

          font-size: 12px;
          font-weight: 800;

          color: var(--munder-text);
        }

        .munder-field input {
          width: 100%;
          height: 48px;

          padding: 0 13px;

          outline: none;

          border:
            1px solid
            #d7dfd9;

          border-radius: 10px;

          background: #fbfcfb;

          color: #18251d;

          font-size: 14px;

          transition:
            border-color .25s ease,
            box-shadow .25s ease,
            background .25s ease,
            transform .25s ease;
        }

        .munder-field input::placeholder {
          color: #a0aaa3;
        }

        .munder-field input:focus {
          background: white;

          border-color:
            var(--munder-green);

          box-shadow:
            0 0 0 4px
            rgba(14,77,40,.09);

          transform: translateY(-1px);
        }

        /* =========================================================
           OPTIONS
        ========================================================= */

        .munder-options {
          display: flex;

          justify-content: space-between;
          align-items: center;

          margin: -1px 0 21px;

          font-size: 12px;

          color: #69736c;
        }

        .munder-remember {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .munder-remember input {
          width: 15px;
          height: 15px;

          accent-color:
            var(--munder-green);
        }

        .munder-forgot {
          border: 0;
          background: transparent;

          color:
            var(--munder-green);

          font-weight: 800;

          cursor: pointer;
        }

        /* =========================================================
           MAIN BUTTON
        ========================================================= */

        .munder-main-button {
          position: relative;
          overflow: hidden;

          width: 100%;
          height: 51px;

          border: 0;
          border-radius: 27px;

          background:
            linear-gradient(
              135deg,
              var(--munder-green),
              var(--munder-green-2)
            );

          color: white;

          font-size: 14px;
          font-weight: 900;

          cursor: pointer;

          box-shadow:
            0 8px 20px
            rgba(14,77,40,.23);

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .munder-main-button::before {
          content: "";

          position: absolute;

          top: 0;
          left: -120%;

          width: 80%;
          height: 100%;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,.25),
              transparent
            );

          transform: skewX(-20deg);

          transition: left .6s ease;
        }

        .munder-main-button:hover::before {
          left: 140%;
        }

        .munder-main-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 12px 26px
            rgba(14,77,40,.28);
        }

        .munder-main-button:active {
          transform: translateY(0);
        }

        .munder-main-button:disabled {
          opacity: .65;
          cursor: not-allowed;
          transform: none;
        }

        /* =========================================================
           DIVIDER
        ========================================================= */

        .munder-divider {
          display: flex;
          align-items: center;

          gap: 10px;

          margin: 21px 0 15px;

          color: #9aa39d;

          font-size: 11px;
        }

        .munder-divider::before,
        .munder-divider::after {
          content: "";

          height: 1px;

          flex: 1;

          background: #e1e5e2;
        }

        /* =========================================================
           SOCIAL BUTTONS
        ========================================================= */

        .munder-google-button,
        .munder-mobile-button {
          width: 100%;
          height: 47px;

          border-radius: 24px;

          font-size: 13px;
          font-weight: 800;

          cursor: pointer;

          transition:
            transform .22s ease,
            box-shadow .22s ease,
            background .22s ease;
        }

        .munder-google-button {
          background: white;

          border:
            1px solid
            #d6ddd8;

          color: #26332a;
        }

        .munder-mobile-button {
          margin-top: 10px;

          background:
            var(--munder-light-green);

          border:
            1px solid
            rgba(14,77,40,.25);

          color:
            var(--munder-green);
        }

        .munder-google-button:hover,
        .munder-mobile-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 6px 15px
            rgba(0,0,0,.08);
        }

        /* =========================================================
           SWITCH
        ========================================================= */

        .munder-switch-text {
          text-align: center;

          margin-top: 20px;

          font-size: 12px;

          color: #7d867f;
        }

        .munder-switch-link {
          padding: 0;

          border: 0;
          background: transparent;

          color:
            var(--munder-green);

          font-size: 12px;
          font-weight: 900;

          cursor: pointer;
        }

        .munder-switch-link:hover {
          color:
            var(--munder-green-2);

          text-decoration: underline;
        }

        /* =========================================================
           FOOT NOTE
        ========================================================= */

        .munder-footnote {
          text-align: center;

          margin-top: 17px;

          font-size: 9px;

          letter-spacing: .5px;

          color: #a2aaa4;
        }

        /* =========================================================
           LOGIN COMPACT MODE
           Keeps the original design but removes extra vertical space.
        ========================================================= */

        /* =========================================================
           EQUAL LOGIN / SIGNUP PANEL SIZE
        ========================================================= */

        @media (min-width: 761px) {
          .munder-form-panel {
            height: 600px;
            min-height: 600px;
            max-height: 600px;
            box-sizing: border-box;
          }

          .munder-form-panel.login-mode,
          .munder-form-panel.signup-mode {
            height: 600px;
            min-height: 600px;
            max-height: 600px;
          }

          .munder-form-panel.signup-mode {
            justify-content: center;
          }

        @media (min-width: 761px) {
          .munder-form-panel.login-mode {
            padding-top: 30px;
            padding-bottom: 30px;
          }

          .munder-form-panel.login-mode .munder-mode-tabs {
            margin-bottom: 24px;
          }

          .munder-form-panel.login-mode .munder-form-subtitle {
            margin-bottom: 20px;
          }

          .munder-form-panel.login-mode .munder-field {
            margin-bottom: 14px;
          }

          .munder-form-panel.login-mode .munder-field label {
            margin-bottom: 5px;
          }

          .munder-form-panel.login-mode .munder-field input {
            height: 44px;
          }

          .munder-form-panel.login-mode .munder-options {
            margin-bottom: 15px;
          }

          .munder-form-panel.login-mode .munder-main-button {
            height: 47px;
          }

          .munder-form-panel.login-mode .munder-google-button,
          .munder-form-panel.login-mode .munder-mobile-button {
            height: 44px;
          }

          .munder-form-panel.login-mode .munder-mobile-button {
            margin-top: 8px;
          }

          .munder-form-panel.login-mode .munder-switch-text {
            margin-top: 9px;
          }

          .munder-form-panel.login-mode .munder-footnote {
            margin-top: 10px;
          }
        }

        /* =========================================================
           SIGNUP COMPACT MODE
           Keeps Signup clear and compact without changing Login.
        ========================================================= */

        @media (min-width: 761px) {
          .munder-form-panel.signup-mode {
            padding-top: 25px;
            padding-bottom: 25px;
          }

          .munder-form-panel.signup-mode .munder-mode-tabs {
            height: 46px;
            margin-bottom: 18px;
          }

          .munder-form-panel.signup-mode .munder-form-title {
            font-size: 34px;
            margin-bottom: 6px;
          }

          .munder-form-panel.signup-mode .munder-form-subtitle {
            margin-bottom: 14px;
          }

          .munder-form-panel.signup-mode .munder-field {
            margin-bottom: 9px;
          }

          .munder-form-panel.signup-mode .munder-field label {
            margin-bottom: 4px;
            font-size: 12px;
          }

          .munder-form-panel.signup-mode .munder-field input {
            height: 40px;
            padding-top: 6px;
            padding-bottom: 6px;
          }

          .munder-form-panel.signup-mode .munder-main-button {
            height: 43px;
          }

          .munder-form-panel.signup-mode .munder-divider {
            margin: 11px 0;
          }

          .munder-form-panel.signup-mode .munder-google-button,
          .munder-form-panel.signup-mode .munder-mobile-button {
            height: 40px;
          }

          .munder-form-panel.signup-mode .munder-mobile-button {
            margin-top: 7px;
          }

          .munder-form-panel.signup-mode .munder-switch-text {
            margin-top: 10px;
          }

          .munder-form-panel.signup-mode .munder-footnote {
            margin-top: 7px;
          }
        }

        /* =========================================================
           DESKTOP HEIGHT SAFETY
        ========================================================= */

        @media (min-width: 761px) {
          .munder-login-page {
            min-height: calc(100vh - 80px);
            overflow: visible;
          }

          .munder-auth-wrapper {
            max-height: none;
          }

          .munder-form-panel {
            overflow: visible;
          }
        }

        /* =========================================================
           MOBILE
        ========================================================= */

        @media (max-width: 760px) {
          .munder-form-panel,
          .munder-form-panel.login-mode,
          .munder-form-panel.signup-mode {
            height: auto;
            min-height: 0;
            max-height: none;
          }


          .munder-original-logo {
            width: 215px;
            padding: 9px 22px;
            border-radius: 18px;
            margin-bottom: 22px;
          }


          .munder-login-page {
            min-height: calc(100vh - 70px);

            padding:
              20px 12px 35px;

            align-items: flex-start;
          }

          .munder-auth-wrapper {
            min-height: auto;

            border-radius: 18px;
          }

          .munder-auth-panel {
            position: relative;

            width: 100%;
          }

          .munder-brand-panel {
            min-height: 265px;

            padding:
              27px 28px 65px;

            clip-path:
              polygon(
                0 0,
                100% 0,
                100% 78%,
                50% 100%,
                0 78%
              );
          }

          .munder-brand-inner {
            width: 100%;
          }

          .munder-original-logo {
            width: 130px;

            margin-bottom: 30px;
          }

          .munder-welcome-title {
            font-size: 29px;
          }

          .munder-welcome-text {
            font-size: 11px;

            line-height: 1.55;
          }

          .munder-form-panel {
            min-height: 530px;

            padding:
              27px 22px 32px;
          }

          .munder-form-content {
            max-width: 100%;
          }

          .munder-mode-tabs {
            margin-bottom: 27px;
          }

          .munder-form-title {
            font-size: 28px;
          }
        }

      `}</style>

      <main className="munder-login-page">

        <section className="munder-auth-wrapper">

          {/* =====================================================
              MUNDER BRAND PANEL
          ===================================================== */}

          <div className="munder-auth-panel munder-brand-panel">

            <div className="munder-brand-inner">

              {/* ORIGINAL MUNDER LOGO */}
              <img
                src="/images/munder-logo-horizontal.png"
                alt="MUNDER"
                className="munder-original-logo"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <h1 className="munder-welcome-title">
                {mode === "login" ? (
                  <>
                    Welcome
                    <br />
                    <span>Back!</span>
                  </>
                ) : (
                  <>
                    Join
                    <br />
                    <span>MUNDER!</span>
                  </>
                )}
              </h1>

              <p className="munder-welcome-text">
                {mode === "login"
                  ? "Login to continue your gardening journey and manage your garden with MUNDER."
                  : "Create your MUNDER account and start your journey towards a healthier, greener garden."
                }
              </p>

            </div>

          </div>

          {/* =====================================================
              FORM PANEL
          ===================================================== */}

          <div className={`munder-auth-panel munder-form-panel ${mode === "login" ? "login-mode" : "signup-mode"}`}>

            <div className="munder-form-content">

              {/* LOGIN / SIGNUP SWITCH */}

              <div className="munder-mode-tabs">

                <div
                  className={`munder-mode-slider ${
                    mode === "signup" ? "signup" : ""
                  }`}
                />

                <button
                  type="button"
                  className={`munder-mode-tab ${
                    mode === "login" ? "active" : ""
                  }`}
                  onClick={() => switchMode("login")}
                >
                  Login
                </button>

                <button
                  type="button"
                  className={`munder-mode-tab ${
                    mode === "signup" ? "active" : ""
                  }`}
                  onClick={() => switchMode("signup")}
                >
                  Sign Up
                </button>

              </div>

              <h2 className="munder-form-title" key={mode}>
                {mode === "login"
                  ? "Hello Again!"
                  : "Create Account"
                }
              </h2>

              <p className="munder-form-subtitle">
                {mode === "login"
                  ? "Login to access your MUNDER account"
                  : "Create your account to get started"
                }
              </p>

              {error && (
                <div className="munder-error">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {mode === "signup" && (
                  <div className="munder-field">
                    <label>Full Name</label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Enter your name"
                      autoComplete="name"
                      required
                    />
                  </div>
                )}

                <div className="munder-field">

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                  />

                </div>

                <div className="munder-field">

                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete={
                      mode === "login"
                        ? "current-password"
                        : "new-password"
                    }
                    minLength={6}
                    required
                  />

                </div>

                {mode === "login" && (
                  <div className="munder-options">

                    <label className="munder-remember">

                      <input
                        type="checkbox"
                      />

                      <span>
                        Remember me
                      </span>

                    </label>

                    <button
                      type="button"
                      className="munder-forgot"
                      onClick={() =>
                        setError(
                          "Password reset will be added next."
                        )
                      }
                    >
                      Forgot Password?
                    </button>

                  </div>
                )}

                <button
                  type="submit"
                  className="munder-main-button"
                  disabled={loading}
                >
                  {loading
                    ? "Please wait..."
                    : mode === "login"
                      ? "Login"
                      : "Create Account"
                  }
                </button>

              </form>

              <div className="munder-divider">
                <span>
                  {mode === "login"
                    ? "or continue with"
                    : "or sign up with"
                  }
                </span>
              </div>

              <button
                type="button"
                className="munder-google-button"
                onClick={handleGoogle}
                disabled={loading}
              >
                Continue with Google
              </button>

              <button
                type="button"
                className="munder-mobile-button"
                onClick={() => navigate("/mobile-login")}
              >
                Continue with Mobile
              </button>

              <div className="munder-switch-text">

                {mode === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "
                }

                <button
                  type="button"
                  className="munder-switch-link"
                  onClick={() =>
                    switchMode(
                      mode === "login"
                        ? "signup"
                        : "login"
                    )
                  }
                >
                  {mode === "login"
                    ? "Sign Up"
                    : "Login"
                  }
                </button>

              </div>

              <div className="munder-footnote">
                MUNDER • Landscape • Maintenance • Plants
              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}