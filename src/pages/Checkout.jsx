import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  LinearProgress,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Checkout() {
  const navigate = useNavigate();

  const [addr, setAddr] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const [err, setErr] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  /*
   * =========================================
   * DETECT CURRENT LOCATION
   * =========================================
   */

  const handleGPS = () => {
    setErr("");

    if (!window.isSecureContext) {
      setErr(
        "Location access requires a secure connection. Please use localhost or HTTPS."
      );
      return;
    }

    if (!navigator.geolocation) {
      setErr(
        "Your browser does not support location services."
      );
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          /*
           * Reverse geocoding using
           * OpenStreetMap Nominatim.
           */
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              "Unable to find address."
            );
          }

          const data = await response.json();

          const address =
            data.address || {};

          /*
           * STREET / HOUSE
           */

          const house =
            address.house_number || "";

          const road =
            address.road ||
            address.residential ||
            address.neighbourhood ||
            "";

          const area =
            address.suburb ||
            address.neighbourhood ||
            address.village ||
            "";

          const streetParts = [
            house,
            road,
            area,
          ].filter(Boolean);

          const street =
            streetParts.join(", ") ||
            data.display_name ||
            `GPS: ${latitude.toFixed(
              6
            )}, ${longitude.toFixed(6)}`;

          /*
           * CITY
           */

          const city =
            address.city ||
            address.town ||
            address.municipality ||
            address.village ||
            address.county ||
            "";

          /*
           * PINCODE
           */

          const pincode =
            address.postcode || "";

          setAddr((prev) => ({
            ...prev,
            street,
            city,
            pincode,
          }));

          setErr("");

        } catch (error) {
          console.error(
            "Address lookup error:",
            error
          );

          /*
           * GPS worked but address lookup
           * failed.
           */

          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          setAddr((prev) => ({
            ...prev,
            street: `GPS: ${latitude.toFixed(
              6
            )}, ${longitude.toFixed(6)}`,
          }));

          setErr(
            "Location detected, but address could not be found automatically. Please enter your address manually."
          );
        } finally {
          setLocationLoading(false);
        }
      },

      (error) => {
        console.error(
          "Geolocation error:",
          error
        );

        setLocationLoading(false);

        if (error.code === 1) {
          setErr(
            "Location permission was denied. Please allow location access for localhost in your browser and try again."
          );
        } else if (error.code === 2) {
          setErr(
            "Your location could not be detected. Please check your device location/GPS and try again."
          );
        } else if (error.code === 3) {
          setErr(
            "Location request timed out. Please try again."
          );
        } else {
          setErr(
            "Unable to detect your current location. Please enter your address manually."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  /*
   * =========================================
   * CONTINUE TO PAYMENT
   * =========================================
   */

  const handleNext = () => {
    setErr("");

    if (!addr.name.trim()) {
      setErr(
        "Please enter your full name."
      );
      return;
    }

    if (!/^[0-9]{10}$/.test(addr.phone)) {
      setErr(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (!addr.street.trim()) {
      setErr(
        "Please enter your service address."
      );
      return;
    }

    if (!addr.city.trim()) {
      setErr(
        "Please enter city."
      );
      return;
    }

    if (!/^[0-9]{6}$/.test(addr.pincode)) {
      setErr(
        "Please enter a valid 6-digit pincode."
      );
      return;
    }

    /*
     * SAVE ADDRESS
     */

    localStorage.setItem(
      "munder_address",
      JSON.stringify(addr)
    );

    /*
     * DIRECT PAYMENT
     *
     * No Garden Details.
     * No Time Schedule.
     */

    navigate("/payment");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        py: {
          xs: 2,
          md: 3,
        },
        pb: 6,
      }}
    >

      {/* =====================================
          PROGRESS
          ===================================== */}

      <Typography
        variant="caption"
        fontWeight="bold"
        color="#0e4d28"
      >
        Step 2 of 3 - Service Address
      </Typography>

      <LinearProgress
        variant="determinate"
        value={66}
        sx={{
          mt: 1,
          mb: 3,
          height: 8,
          borderRadius: 5,

          "& .MuiLinearProgress-bar": {
            bgcolor: "#0e4d28",
          },
        }}
      />

      {/* =====================================
          ERROR
          ===================================== */}

      {err && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: 2,
          }}
        >
          {err}
        </Alert>
      )}

      {/* =====================================
          CURRENT LOCATION
          ===================================== */}

      <Button
        fullWidth
        variant="outlined"
        onClick={handleGPS}
        disabled={locationLoading}
        sx={{
          mb: 3,
          minHeight: 54,
          color: "#0e4d28",
          borderColor: "#0e4d28",
          borderRadius: 3,
          fontSize: {
            xs: "1rem",
            sm: "1.1rem",
          },
          fontWeight: 700,

          "&:hover": {
            borderColor: "#0e4d28",
            bgcolor: "#f1f8e9",
          },
        }}
      >
        {locationLoading ? (
          <>
            <CircularProgress
              size={22}
              sx={{
                mr: 1,
                color: "#0e4d28",
              }}
            />

            Detecting Location...
          </>
        ) : (
          "Detect Current Location"
        )}
      </Button>

      {/* =====================================
          ADDRESS FORM
          ===================================== */}

      <Paper
        elevation={1}
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          borderRadius: 4,
          border: "1px solid #eeeeee",
          bgcolor: "#ffffff",
        }}
      >

        {/* NAME */}

        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          value={addr.name}
          onChange={(e) =>
            setAddr({
              ...addr,
              name: e.target.value,
            })
          }
        />

        {/* MOBILE */}

        <TextField
          fullWidth
          label="Mobile Number"
          margin="normal"
          type="tel"
          inputProps={{
            maxLength: 10,
            inputMode: "numeric",
          }}
          value={addr.phone}
          onChange={(e) => {
            const value =
              e.target.value
                .replace(/\D/g, "")
                .slice(0, 10);

            setAddr({
              ...addr,
              phone: value,
            });
          }}
        />

        {/* ADDRESS */}

        <TextField
          fullWidth
          label="House No / Street Address"
          margin="normal"
          multiline
          minRows={2}
          value={addr.street}
          onChange={(e) =>
            setAddr({
              ...addr,
              street: e.target.value,
            })
          }
        />

        {/* CITY */}

        <TextField
          fullWidth
          label="City"
          margin="normal"
          value={addr.city}
          onChange={(e) =>
            setAddr({
              ...addr,
              city: e.target.value,
            })
          }
        />

        {/* PINCODE */}

        <TextField
          fullWidth
          label="Pincode"
          margin="normal"
          type="tel"
          inputProps={{
            maxLength: 6,
            inputMode: "numeric",
          }}
          value={addr.pincode}
          onChange={(e) => {
            const value =
              e.target.value
                .replace(/\D/g, "")
                .slice(0, 6);

            setAddr({
              ...addr,
              pincode: value,
            });
          }}
        />
      </Paper>

      {/* =====================================
          PAYMENT
          ===================================== */}

      <Button
        fullWidth
        variant="contained"
        onClick={handleNext}
        sx={{
          mt: 3,
          py: 1.6,
          bgcolor: "#0e4d28",
          borderRadius: 3,
          fontSize: {
            xs: "1rem",
            sm: "1.1rem",
          },
          fontWeight: 700,

          "&:hover": {
            bgcolor: "#09361c",
          },
        }}
      >
        Continue to Payment
      </Button>

    </Box>
  );
}
