import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (
      adminId.trim() === "mainadmin" &&
      password === "Munder@123"
    ) {
      sessionStorage.setItem(
        "munder-main-admin",
        JSON.stringify({
          id: "mainadmin",
          role: "MAIN_ADMIN",
          name: "Main Administrator",
          loginAt: new Date().toISOString(),
        })
      );

      navigate("/admin");
      return;
    }

    setError("Invalid Admin ID or Password.");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        background:
          "linear-gradient(135deg, #123524 0%, #1B5E20 50%, #2E7D32 100%)",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 440,
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Box
            component="img"
            src="/images/munder-logo-horizontal.png"
            alt="Munder"
            sx={{
              width: "100%",
              maxWidth: 260,
              height: "auto",
              mb: 3,
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <AdminPanelSettingsIcon
              sx={{
                fontSize: 42,
                color: "#1B5E20",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ color: "#183B2A" }}
          >
            Main Admin Login
          </Typography>

          <Typography
            sx={{
              color: "#6B7280",
              mt: 1,
            }}
          >
            Secure access to Munder Administration
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleLogin}
        >
          <TextField
            fullWidth
            label="Admin ID"
            value={adminId}
            onChange={(e) =>
              setAdminId(e.target.value)
            }
            margin="normal"
            autoComplete="username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            margin="normal"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              py: 1.4,
              bgcolor: "#1B5E20",
              fontSize: 16,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#123F16",
              },
            }}
          >
            Login to Admin Panel
          </Button>
        </Box>

        <Typography
          align="center"
          sx={{
            mt: 3,
            color: "#9CA3AF",
            fontSize: 13,
          }}
        >
          Munder Administration System
        </Typography>
      </Paper>
    </Box>
  );
}
