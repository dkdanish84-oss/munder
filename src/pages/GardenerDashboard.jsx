import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  RefreshCw,
  PlayCircle,
} from "lucide-react";
import { auth } from "../config/firebase";

export default function GardenerDashboard() {
  const [gardener, setGardener] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [notes, setNotes] = useState({});

  const api = useCallback(async (url, options = {}) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Gardener is not logged in.");

    const token = await user.getIdToken();

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data?.message || "Request failed.");
    }

    return data;
  }, []);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [me, visitData] = await Promise.all([
        api("/api/v1/gardener/me"),
        api("/api/v1/gardener/visits"),
      ]);

      setGardener(me?.gardener || null);
      setVisits(Array.isArray(visitData?.visits) ? visitData.visits : []);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Unable to load gardener dashboard.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(() => {
    const pending = visits.filter(
      (v) => String(v.status || "").toLowerCase() === "gardener assigned"
    ).length;

    const progress = visits.filter(
      (v) => String(v.status || "").toLowerCase() === "in progress"
    ).length;

    const completed = visits.filter(
      (v) => String(v.status || "").toLowerCase() === "completed"
    ).length;

    return { pending, progress, completed };
  }, [visits]);

  const startVisit = async (visitId) => {
    try {
      setBusyId(visitId);
      setError("");
      await api(`/api/v1/gardener/visits/${visitId}/start`, {
        method: "PATCH",
      });
      await load();
    } catch (err) {
      setError(err?.message || "Unable to start visit.");
    } finally {
      setBusyId("");
    }
  };

  const completeVisit = async (visitId) => {
    try {
      setBusyId(visitId);
      setError("");

      await api(`/api/v1/gardener/visits/${visitId}/complete`, {
        method: "PATCH",
        body: JSON.stringify({
          gardenerNotes: notes[visitId] || "",
        }),
      });

      setNotes((current) => {
        const next = { ...current };
        delete next[visitId];
        return next;
      });

      await load();
    } catch (err) {
      setError(err?.message || "Unable to complete visit.");
    } finally {
      setBusyId("");
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: 300, display: "grid", placeItems: "center" }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box>
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
            sx={{ fontWeight: 900, color: "#173322" }}
          >
            Hello, {gardener?.name || "Gardener"}
          </Typography>
          <Typography sx={{ color: "#66756C", mt: 0.5 }}>
            Your assigned garden visits
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<RefreshCw size={17} />}
          onClick={load}
          sx={{
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 800,
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

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Stat title="Assigned" value={stats.pending} icon={<Clock3 size={21} />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Stat title="In Progress" value={stats.progress} icon={<PlayCircle size={21} />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Stat title="Completed" value={stats.completed} icon={<CheckCircle2 size={21} />} />
        </Grid>
      </Grid>

      {visits.length === 0 ? (
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ py: 6, textAlign: "center" }}>
            <Typography sx={{ fontWeight: 800, color: "#173322" }}>
              No visits assigned yet.
            </Typography>
            <Typography sx={{ color: "#66756C", mt: 0.5 }}>
              New assignments from MUNDER Admin will appear here.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: "grid", gap: 2 }}>
          {visits.map((visit) => {
            const status = String(visit.status || "Pending");
            const lower = status.toLowerCase();
            const isBusy = busyId === visit.visitId;
            const canStart =
              lower === "gardener assigned" ||
              lower === "visit scheduled" ||
              lower === "confirmed";
            const canComplete = lower === "in progress";

            return (
              <Card
                key={visit.visitId}
                sx={{
                  borderRadius: 4,
                  border: "1px solid #E2E9E3",
                  boxShadow: "0 5px 20px rgba(0,0,0,.04)",
                }}
              >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 900, color: "#173322", fontSize: 19 }}>
                        {visit.name || "Customer"}
                      </Typography>

                      <Typography sx={{ color: "#66756C", mt: 0.4 }}>
                        {visit.service || "Garden Maintenance"}
                      </Typography>
                    </Box>

                    <Chip
                      label={status}
                      size="small"
                      sx={{ fontWeight: 800 }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ color: "#7A857F", fontWeight: 800 }}>
                        DATE
                      </Typography>
                      <Typography fontWeight={700}>
                        {visit.visitDate || "â€”"} Â· {visit.visitTime || "Morning"}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ color: "#7A857F", fontWeight: 800 }}>
                        CONTACT
                      </Typography>
                      <Box sx={{ display: "flex", gap: 0.7, alignItems: "center" }}>
                        <Phone size={15} />
                        <Typography fontWeight={700}>
                          {visit.mobile || "â€”"}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ color: "#7A857F", fontWeight: 800 }}>
                        ADDRESS
                      </Typography>
                      <Box sx={{ display: "flex", gap: 0.7, alignItems: "flex-start" }}>
                        <MapPin size={15} />
                        <Typography fontWeight={700}>
                          {visit.address || "â€”"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  {canComplete && (
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      label="Gardener notes"
                      value={notes[visit.visitId] || ""}
                      onChange={(e) =>
                        setNotes((current) => ({
                          ...current,
                          [visit.visitId]: e.target.value,
                        }))
                      }
                      sx={{ mt: 2 }}
                    />
                  )}

                  <Box sx={{ display: "flex", gap: 1.2, mt: 2, flexWrap: "wrap" }}>
                    {canStart && (
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<PlayCircle size={18} />}
                        disabled={isBusy}
                        onClick={() => startVisit(visit.visitId)}
                        sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 800 }}
                      >
                        {isBusy ? "Starting..." : "Start Visit"}
                      </Button>
                    )}

                    {canComplete && (
                      <Button
                        variant="contained"
                        startIcon={<CheckCircle2 size={18} />}
                        disabled={isBusy}
                        onClick={() => completeVisit(visit.visitId)}
                        sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 800 }}
                      >
                        {isBusy ? "Completing..." : "Complete Visit"}
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

function Stat({ title, value, icon }) {
  return (
    <Card sx={{ borderRadius: 4, border: "1px solid #E2E9E3" }}>
      <CardContent>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "#2E7D32" }}>
          {icon}
          <Typography fontWeight={800}>{title}</Typography>
        </Box>
        <Typography variant="h4" sx={{ mt: 1, fontWeight: 900, color: "#173322" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
