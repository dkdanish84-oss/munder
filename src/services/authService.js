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
