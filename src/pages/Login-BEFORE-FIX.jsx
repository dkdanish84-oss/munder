import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Leaf, Sparkles, ShieldCheck } from "lucide-react";

import {
  auth,
  googleProvider,
  signInWithPopup,
} from "../config/firebase";

import { useAuthStore } from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const token = await credential.user.getIdToken();

      setAuth(credential.user, token);

      if (rememberMe) {
        localStorage.setItem("munder_remember", "true");
      } else {
        localStorage.removeItem("munder_remember");
      }

      navigate("/profile", { replace: true });
    } catch (err) {
      console.error("Login error:", err);

      let message = "Unable to login. Please check your email and password.";

      if (err?.code === "auth/invalid-credential") {
        message = "Invalid email or password.";
      } else if (err?.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (err?.code === "auth/wrong-password") {
        message = "Incorrect password.";
      } else if (err?.code === "auth/too-many-requests") {
        message = "Too many attempts. Please try again later.";
      } else if (err?.code === "auth/network-request-failed") {
        message = "Network error. Please check your internet connection.";
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      const token = await result.user.getIdToken();

      setAuth(result.user, token);

      navigate("/profile", { replace: true });
    } catch (err) {
      console.error("Google login error:", err);

      if (err?.code !== "auth/popup-closed-by-user") {
        setError("Google login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMobile = () => {
    navigate("/mobile-login");
  };

  return (
    <div className="munder-login-page">

      <style>{`
        .munder-login-page {
          min-height: calc(100vh - 80px);
          width: 100%;
          background:
            radial-gradient(circle at 12% 30%, rgba(14, 77, 40, 0.08), transparent 25%),
            radial-gradient(circle at 88% 70%, rgba(203, 180, 137, 0.12), transparent 28%),
            #f7faf7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 45px 20px 55px;
          font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          overflow: hidden;
        }

        .munder-login-card {
          width: min(980px, 100%);
          min-height: 600px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #ffffff;
          border-radius: 26px;
          overflow: hidden;
          box-shadow:
            0 30px 70px rgba(14, 77, 40, 0.13),
            0 8px 25px rgba(0, 0, 0, 0.06);
          animation: munderCardIn 0.55s ease-out;
        }

        @keyframes munderCardIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .munder-login-left {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 90% 8%, rgba(255,255,255,0.07) 0 120px, transparent 121px),
            radial-gradient(circle at 5% 100%, rgba(203,180,137,0.08) 0 125px, transparent 126px),
            linear-gradient(145deg, #064b29 0%, #075c31 55%, #08723d 100%);
          color: white;
          padding: 36px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .munder-login-left::before {
          content: "";
          position: absolute;
          width: 260px;
          height: 260px;
          right: -125px;
          top: -110px;
          border-radius: 50%;
          background: rgba(255,255,255,0.045);
        }

        .munder-login-left::after {
          content: "";
          position: absolute;
          width: 240px;
          height: 240px;
          left: -130px;
          bottom: -130px;
          border-radius: 50%;
          background: rgba(203,180,137,0.08);
        }

        .munder-logo-box {
          position: relative;
          z-index: 2;
          width: 170px;
          height: 105px;
          border-radius: 18px;
          background: rgba(255,255,255,0.96);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
        }

        .munder-logo-box img {
          width: 100%;
          max-height: 76px;
          object-fit: contain;
          display: block;
        }

        .munder-left-content {
          position: relative;
          z-index: 2;
          margin-top: auto;
          margin-bottom: auto;
          padding-top: 40px;
          padding-bottom: 35px;
        }

        .munder-left-title {
          margin: 0;
          font-size: clamp(48px, 5vw, 70px);
          line-height: 0.96;
          font-weight: 900;
          letter-spacing: -2.5px;
        }

        .munder-left-title span {
          display: block;
          color: #d5bd91;
        }

        .munder-left-text {
          margin: 24px 0 0;
          max-width: 430px;
          color: rgba(255,255,255,0.9);
          font-size: 16px;
          line-height: 1.65;
        }

        .munder-features {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .munder-feature {
          min-height: 82px;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255,255,255,0.055);
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 7px;
          backdrop-filter: blur(5px);
          transition: transform .25s ease, background .25s ease;
        }

        .munder-feature:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.09);
        }

        .munder-feature svg {
          width: 21px;
          height: 21px;
          color: #d5bd91;
        }

        .munder-feature span {
          color: #ffffff;
          font-size: 11px;
          line-height: 1.25;
          font-weight: 700;
        }

        .munder-login-right {
          padding: 28px 58px 34px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .munder-auth-tabs {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #edf4ef;
          border-radius: 18px;
          padding: 4px;
          margin-bottom: 32px;
        }

        .munder-auth-tab {
          min-height: 48px;
          border: 0;
          background: transparent;
          border-radius: 14px;
          color: #0e4d28;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .25s ease;
        }

        .munder-auth-tab.active {
          background: #0e4d28;
          color: #ffffff;
          box-shadow: 0 7px 18px rgba(14,77,40,0.2);
        }

        .munder-login-heading {
          margin: 0;
          color: #073f24;
          font-size: clamp(36px, 4vw, 48px);
          line-height: 1;
          font-weight: 900;
          letter-spacing: -1.7px;
        }

        .munder-login-subtitle {
          margin: 10px 0 30px;
          color: #66756d;
          font-size: 14px;
        }

        .munder-error {
          margin-bottom: 18px;
          padding: 12px 14px;
          border-radius: 12px;
          background: #fff0f0;
          border: 1px solid #ffd0d0;
          color: #b42318;
          font-size: 13px;
          line-height: 1.4;
        }

        .munder-field {
          margin-bottom: 17px;
        }

        .munder-field label {
          display: block;
          margin-bottom: 8px;
          color: #183c2a;
          font-size: 13px;
          font-weight: 800;
        }

        .munder-input-wrap {
          position: relative;
        }

        .munder-input-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 19px;
          height: 19px;
          color: #789184;
          pointer-events: none;
        }

        .munder-input {
          width: 100%;
          height: 52px;
          border: 1px solid #d4dfd8;
          border-radius: 14px;
          outline: none;
          background: #fbfdfc;
          color: #153b28;
          font-size: 14px;
          padding: 0 46px;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .munder-input:focus {
          border-color: #0e4d28;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(14,77,40,0.08);
        }

        .munder-password-button {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          color: #70867a;
          padding: 4px;
          cursor: pointer;
          display: flex;
        }

        .munder-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin: 4px 0 20px;
        }

        .munder-remember {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #63736a;
          font-size: 12px;
          cursor: pointer;
        }

        .munder-remember input {
          accent-color: #0e4d28;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .munder-forgot {
          color: #0e4d28;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
        }

        .munder-forgot:hover {
          text-decoration: underline;
        }

        .munder-main-button {
          width: 100%;
          height: 54px;
          border: 0;
          border-radius: 15px;
          background: linear-gradient(135deg, #0b5c31, #087a40);
          color: #ffffff;
          font-size: 15px;
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          box-shadow: 0 12px 25px rgba(14,77,40,0.2);
          transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
        }

        .munder-main-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 16px 30px rgba(14,77,40,0.26);
        }

        .munder-main-button:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .munder-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #98a69f;
          font-size: 11px;
          margin: 22px 0 15px;
        }

        .munder-divider::before,
        .munder-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #dde4df;
        }

        .munder-secondary-button {
          width: 100%;
          height: 50px;
          border-radius: 14px;
          border: 1px solid #d1ddd5;
          background: #ffffff;
          color: #153b28;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: all .2s ease;
        }

        .munder-secondary-button:hover {
          border-color: #0e4d28;
          background: #f6faf7;
          transform: translateY(-1px);
        }

        .munder-mobile-button {
          margin-top: 10px;
          background: #eaf5ed;
          border-color: #b9d8c3;
          color: #0e4d28;
        }

        .munder-signup-line {
          margin: 20px 0 0;
          text-align: center;
          color: #77847d;
          font-size: 12px;
        }

        .munder-signup-link {
          color: #0e4d28;
          font-weight: 900;
          text-decoration: none;
        }

        .munder-signup-link:hover {
          text-decoration: underline;
        }

        .munder-footer-note {
          text-align: center;
          margin-top: 17px;
          color: #98a39d;
          font-size: 9px;
          letter-spacing: .4px;
        }

        @media (max-width: 850px) {
          .munder-login-page {
            padding: 25px 14px 40px;
            align-items: flex-start;
          }

          .munder-login-card {
            grid-template-columns: 1fr;
            min-height: auto;
            max-width: 540px;
          }

          .munder-login-left {
            min-height: 370px;
            padding: 28px;
          }

          .munder-login-left .munder-logo-box {
            width: 145px;
            height: 85px;
          }

          .munder-left-content {
            padding-top: 25px;
            padding-bottom: 25px;
          }

          .munder-left-title {
            font-size: 52px;
          }

          .munder-login-right {
            padding: 30px 28px 35px;
          }
        }

        @media (max-width: 480px) {
          .munder-login-page {
            padding: 15px 10px 30px;
          }

          .munder-login-card {
            border-radius: 20px;
          }

          .munder-login-left {
            min-height: 335px;
            padding: 22px;
          }

          .munder-logo-box {
            width: 130px;
            height: 76px;
          }

          .munder-left-title {
            font-size: 43px;
            letter-spacing: -1.5px;
          }

          .munder-left-text {
            font-size: 14px;
            margin-top: 17px;
          }

          .munder-features {
            gap: 7px;
          }

          .munder-feature {
            min-height: 70px;
          }

          .munder-feature span {
            font-size: 9px;
          }

          .munder-login-right {
            padding: 22px 18px 28px;
          }

          .munder-login-heading {
            font-size: 35px;
          }

          .munder-options {
            gap: 8px;
          }
        }
      `}</style>

      <div className="munder-login-card">

        {/* LEFT BRAND PANEL */}
        <section className="munder-login-left">

          <div className="munder-logo-box">
            <img
              src="/images/munder-logo-horizontal.png"
              alt="MUNDER - Landscape Maintenance Plants"
            />
          </div>

          <div className="munder-left-content">
            <h1 className="munder-left-title">
              Welcome
              <span>Back!</span>
            </h1>

            <p className="munder-left-text">
              Login to continue your gardening journey and manage your
              garden with MUNDER.
            </p>
          </div>

          <div className="munder-features">

            <div className="munder-feature">
              <Leaf />
              <span>
                Smart
                <br />
                Garden Care
              </span>
            </div>

            <div className="munder-feature">
              <Sparkles />
              <span>
                Expert
                <br />
                Guidance
              </span>
            </div>

            <div className="munder-feature">
              <ShieldCheck />
              <span>
                Secure
                <br />
                Account
              </span>
            </div>

          </div>
        </section>

        {/* RIGHT LOGIN PANEL */}
        <section className="munder-login-right">

          {/* LOGIN / SIGNUP TABS */}
          <div className="munder-auth-tabs">

            <Link
              to="/login"
              className="munder-auth-tab active"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="munder-auth-tab"
            >
              Sign Up
            </Link>

          </div>

          <h2 className="munder-login-heading">
            Hello Again!
          </h2>

          <p className="munder-login-subtitle">
            Login to access your MUNDER account
          </p>

          {error && (
            <div className="munder-error">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="munder-field">

              <label htmlFor="munder-email">
                Email Address
              </label>

              <div className="munder-input-wrap">

                <Mail className="munder-input-icon" />

                <input
                  id="munder-email"
                  className="munder-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="munder-field">

              <label htmlFor="munder-password">
                Password
              </label>

              <div className="munder-input-wrap">

                <Lock className="munder-input-icon" />

                <input
                  id="munder-password"
                  className="munder-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="munder-password-button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* OPTIONS */}
            <div className="munder-options">

              <label className="munder-remember">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span>Remember me</span>

              </label>

              <Link
                to="/forgot-password"
                className="munder-forgot"
              >
                Forgot Password?
              </Link>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="munder-main-button"
              disabled={loading}
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Login
                  <ArrowRight size={19} />
                </>
              )}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="munder-divider">
            or continue with
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            className="munder-secondary-button"
            onClick={handleGoogle}
            disabled={loading}
          >
            Continue with Google
          </button>

          {/* MOBILE */}
          <button
            type="button"
            className="munder-secondary-button munder-mobile-button"
            onClick={handleMobile}
            disabled={loading}
          >
            Continue with Mobile
          </button>

          {/* SIGN UP */}
          <p className="munder-signup-line">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="munder-signup-link"
            >
              Sign Up
            </Link>
          </p>

          <div className="munder-footer-note">
            MUNDER • Landscape • Maintenance • Plants
          </div>

        </section>

      </div>
    </div>
  );
}
