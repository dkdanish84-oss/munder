import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import {
  CalendarDays,
  Users,
  Clock3,
  RefreshCw,
  MapPin,
  Phone,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVisits = async () => {
    try {
      setLoading(true);
      setError("");

      const token = sessionStorage.getItem(
  "munder-admin-token"
);

if (!token) {
  throw new Error(
    "Admin authentication token is required. Please login again."
  );
}

const response = await fetch(
  `${API_BASE}/api/visits`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to load visits");
      }

      setVisits(Array.isArray(data) ? data : data.visits || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load visit requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisits();
  }, []);

  const updateVisitStatus = async (visitId, status) => {
    try {
      setError("");

      const token = sessionStorage.getItem(
        "munder-admin-token"
      );

      if (!token) {
        throw new Error(
          "Admin authentication token is required. Please login again."
        );
      }

      const response = await fetch(
        `${API_BASE}/api/visit/${encodeURIComponent(visitId)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Unable to update visit status."
        );
      }

      setVisits((currentVisits) =>
        currentVisits.map((visit) =>
          visit.visitId === visitId
            ? { ...visit, ...data.visit }
            : visit
        )
      );

    } catch (err) {
      console.error(err);

      setError(
        err.message ||
        "Unable to update visit status."
      );
    }
  };

  const pending = visits.filter(
    (v) => String(v.status || "").toLowerCase() === "pending"
  ).length;

  const confirmed = visits.filter(
    (v) => String(v.status || "").toLowerCase() === "confirmed"
  ).length;

  return (
    <Box sx={{ maxWidth: 1400, mx: "auto", pb: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, color: "#183B2A" }}
          >
            Admin Dashboard
          </Typography>
          <Typography sx={{ color: "#66756C", mt: 0.5 }}>
            Manage garden visit requests
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<RefreshCw size={17} />}
          onClick={loadVisits}
          sx={{
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            icon={<CalendarDays size={22} />}
            title="Total Visits"
            value={visits.length}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            icon={<Clock3 size={22} />}
            title="Pending"
            value={pending}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard
            icon={<Users size={22} />}
            title="Confirmed"
            value={confirmed}
          />
        </Grid>
      </Grid>

      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #E5EAE6",
          boxShadow: "0 5px 20px rgba(0,0,0,0.04)",
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 900, color: "#183B2A", mb: 2 }}
          >
            Visit Requests
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 6,
              }}
            >
              <CircularProgress color="success" />
            </Box>
          ) : visits.length === 0 ? (
            <Typography sx={{ color: "#66756C", py: 4 }}>
              No visit requests found.
            </Typography>
          ) : (
            <Box>
              {visits.map((visit, index) => (
                <React.Fragment key={visit.id || visit._id || index}>
                  {index > 0 && <Divider sx={{ my: 2 }} />}

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "1.4fr 1fr 1fr 1fr auto",
                      },
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#183B2A",
                        }}
                      >
                        {visit.name || "Unknown Customer"}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.7,
                          mt: 0.5,
                          color: "#66756C",
                        }}
                      >
                        <Phone size={14} />
                        <Typography fontSize={13}>
                          {visit.mobile || "â€”"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        fontSize={12}
                        sx={{ color: "#7A857F" }}
                      >
                        SERVICE
                      </Typography>
                      <Typography fontWeight={700}>
                        {visit.service || "Garden Maintenance"}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        fontSize={12}
                        sx={{ color: "#7A857F" }}
                      >
                        DATE
                      </Typography>
                      <Typography fontWeight={700}>
                        {visit.visitDate || "â€”"}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        fontSize={12}
                        sx={{ color: "#7A857F" }}
                      >
                        LOCATION
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <MapPin size={14} />
                        <Typography fontWeight={600}>
                          {visit.address || "â€”"}
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        fontSize={12}
                        sx={{
                          color: "#7A857F",
                          mb: 0.5,
                        }}
                      >
                        STATUS
                      </Typography>

                      <Select
                        size="small"
                        fullWidth
                        value={
                          visit.status || "Pending"
                        }
                        onChange={(event) =>
                          updateVisitStatus(
                            visit.visitId,
                            event.target.value
                          )
                        }
                        sx={{
                          minWidth: 175,
                          fontWeight: 800,
                          borderRadius: 2,
                          "& .MuiSelect-select": {
                            py: 0.8,
                            fontWeight: 800,
                          },
                        }}
                      >
                        <MenuItem value="Pending">
                          Pending
                        </MenuItem>

                        <MenuItem value="Confirmed">
                          Confirmed
                        </MenuItem>

                        <MenuItem
                          value="Gardener Assigned"
                        >
                          Gardener Assigned
                        </MenuItem>

                        <MenuItem
                          value="Visit Scheduled"
                        >
                          Visit Scheduled
                        </MenuItem>

                        <MenuItem value="Completed">
                          Completed  Customer
                        </MenuItem>

                        <MenuItem value="Cancelled">
                          Cancelled  Future Lead
                        </MenuItem>
                      </Select>

                      <Typography
                        fontSize={11}
                        sx={{
                          mt: 0.7,
                          fontWeight: 800,
                          color:
                            visit.category === "CUSTOMER"
                              ? "#2E7D32"
                              : visit.category ===
                                "FUTURE_LEAD"
                                ? "#8A6500"
                                : "#66756C",
                        }}
                      >
                        {visit.category || "LEAD"}
                      </Typography>
                    </Box>
                  </Box>
                </React.Fragment>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        border: "1px solid #E5EAE6",
        boxShadow: "0 5px 20px rgba(0,0,0,0.04)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#2E7D32",
          }}
        >
          {icon}
          <Typography fontWeight={700}>{title}</Typography>
        </Box>

        <Typography
          variant="h4"
          sx={{
            mt: 1,
            fontWeight: 900,
            color: "#183B2A",
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

