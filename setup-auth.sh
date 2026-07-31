#!/data/data/com.termux/files/usr/bin/bash

mkdir -p src/config src/store src/services src/components

cat > src/config/firebase.js << 'EOT'
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export { RecaptchaVerifier, signInWithPhoneNumber };
EOT

cat > src/store/authStore.js << 'EOT'
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "munder-auth-storage",
    }
  )
);
EOT

cat > src/services/authService.js << 'EOT'
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export const authService = {
  async verifyFirebaseToken(firebaseIdToken) {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { token: firebaseIdToken }
    );

    return response.data;
  },
};
EOT

cat > src/components/ProtectedRoute.jsx << 'EOT'
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
}
EOT

echo ""
echo "=================================="
echo "✅ Auth core files created!"
echo "=================================="
