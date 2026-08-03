import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function MobileLogin() {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    if (!mobile) {
      alert("Enter Mobile Number");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://munder-p9yk.onrender.com/api/auth/send-otp",
        {
          mobile,
        }
      );

      alert(res.data.message);
      setSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "OTP Sending Failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://munder-p9yk.onrender.com/api/auth/verify-otp",
        {
          mobile,
          otp,
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ width: 400 }}>
        <CardContent>
          <Typography variant="h5" align="center" mb={3}>
            Login with Mobile
          </Typography>

          <TextField
            fullWidth
            label="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={sendOTP}
            disabled={loading}
          >
            Send OTP
          </Button>

          {sent && (
            <>
              <TextField
                fullWidth
                label="OTP"
                sx={{ mt: 3 }}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={verifyOTP}
                disabled={loading}
              >
                Verify OTP
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}


