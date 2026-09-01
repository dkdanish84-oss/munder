import React, { useCallback, useEffect, useState } from "react";
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
import { Plus, RefreshCw, UserRound, UserCheck } from "lucide-react";
import { auth } from "../config/firebase";

export default function AdminGardeners() {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    uid: "",
    name: "",
    email: "",
    phone: "",
  });

  const api = useCallback(async (url, options = {}) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Admin is not logged in.");

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

  const loadGardeners = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api("/api/v1/admin/gardeners");
      setGardeners(Array.isArray(data?.gardeners) ? data.gardeners : []);
    } catch (err) {
      console.error(err);
      setError(err?.message || "Unable to load gardeners.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    loadGardeners();
  }, [loadGardeners]);

  const submit = async (event) => {
    event.preventDefault();

    if (!form.uid.trim() || !form.name.trim()) {
      setError("Firebase UID and gardener name are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      await api("/api/v1/admin/gardeners", {
        method: "POST",
        body: JSON.stringify({
          uid: form.uid.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        }),
      });

      setForm({ uid: "", name: "", email: "", phone: "" });
      setMessage("Gardener linked successfully.");
      await loadGardeners();
    } catch (err) {
      setError(err?.message || "Unable to create gardener.");
    } finally {
      setSaving(false);
    }
  };

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
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#183B2A" }}>
            Gardeners
          </Typography>
          <Typography sx={{ color: "#66756C", mt: 0.5 }}>
            Manage the gardeners who can receive MUNDER visit assignments.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<RefreshCw size={17} />}
          onClick={loadGardeners}
          sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 800 }}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {message && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
          {message}
        </Alert>
      )}

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid #E2E9E3",
              boxShadow: "0 5px 20px rgba(0,0,0,.04)",
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 900, color: "#183B2A", mb: 0.5 }}
              >
                Link Gardener
              </Typography>

              <Typography sx={{ color: "#66756C", fontSize: 13, mb: 2 }}>
                The gardener must already have a Firebase account. This form
                links that Firebase UID to the MUNDER gardener role.
              </Typography>

              <Box component="form" onSubmit={submit} sx={{ display: "grid", gap: 1.6 }}>
                <TextField
                  label="Firebase UID"
                  required
                  value={form.uid}
                  onChange={(e) => setForm({ ...form, uid: e.target.value })}
                  fullWidth
                />

                <TextField
                  label="Gardener name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  fullWidth
                />

                <TextField
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  fullWidth
                />

                <TextField
                  label="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  startIcon={<Plus size={18} />}
                  disabled={saving}
                  sx={{
                    mt: 0.5,
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 900,
                    py: 1.2,
                  }}
                >
                  {saving ? "Saving..." : "Add Gardener"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid #E2E9E3",
              boxShadow: "0 5px 20px rgba(0,0,0,.04)",
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <UserRound size={21} />
                <Typography variant="h6" sx={{ fontWeight: 900, color: "#183B2A" }}>
                  Gardener List
                </Typography>
                <Chip
                  size="small"
                  label={gardeners.length}
                  sx={{ ml: "auto", fontWeight: 900 }}
                />
              </Box>

              {loading ? (
                <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
                  <CircularProgress color="success" />
                </Box>
              ) : gardeners.length === 0 ? (
                <Typography sx={{ color: "#66756C", py: 5, textAlign: "center" }}>
                  No gardeners linked yet.
                </Typography>
              ) : (
                gardeners.map((gardener, index) => (
                  <React.Fragment key={gardener.gardenerId || gardener.uid}>
                    {index > 0 && <Divider sx={{ my: 2 }} />}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box>
                        <Typography sx={{ fontWeight: 900, color: "#183B2A" }}>
                          {gardener.name || "Unnamed Gardener"}
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: "#66756C", mt: 0.3 }}>
                          {gardener.email || "No email"} Â· {gardener.phone || "No phone"}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 11,
                            color: "#8A948E",
                            mt: 0.5,
                            wordBreak: "break-all",
                          }}
                        >
                          UID: {gardener.uid}
                        </Typography>
                      </Box>

                      <Chip
                        icon={<UserCheck size={15} />}
                        label={gardener.active === false ? "Inactive" : "Active"}
                        size="small"
                        sx={{ fontWeight: 800 }}
                      />
                    </Box>
                  </React.Fragment>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
