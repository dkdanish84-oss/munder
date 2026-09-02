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

import {
  Plus,
  RefreshCw,
  UserRound,
  UserCheck,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000";

export default function AdminGardeners() {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [createdGardener, setCreatedGardener] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const api = useCallback(
    async (url, options = {}) => {
      const token = sessionStorage.getItem(
        "munder-admin-token"
      );

      if (!token) {
        throw new Error(
          "Admin session expired. Please login again."
        );
      }

      const response = await fetch(
        `${API_BASE}${url}`,
        {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {}),
          },
        }
      );

      const data =
        await response.json().catch(
          () => ({})
        );

      if (!response.ok) {
        if (
          response.status === 401 ||
          response.status === 403
        ) {
          sessionStorage.removeItem(
            "munder-admin-token"
          );

          sessionStorage.removeItem(
            "munder-main-admin"
          );
        }

        throw new Error(
          data?.message ||
          `Request failed (${response.status}).`
        );
      }

      return data;
    },
    []
  );

  const loadGardeners = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const data = await api(
          "/api/v1/admin/gardeners"
        );

        setGardeners(
          Array.isArray(data?.gardeners)
            ? data.gardeners
            : []
        );
      } catch (err) {
        console.error(
          "Load gardeners error:",
          err
        );

        setError(
          err?.message ||
          "Unable to load gardeners."
        );
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  useEffect(() => {
    loadGardeners();
  }, [loadGardeners]);

  const submit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError(
        "Gardener name is required."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");
      setCreatedGardener(null);

      const data = await api(
        "/api/v1/admin/gardeners",
        {
          method: "POST",
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
          }),
        }
      );

      setForm({
        name: "",
        email: "",
        phone: "",
      });

      setCreatedGardener(
        data?.gardener || null
      );

      setMessage(
        "Gardener added successfully. Gardener ID has been generated."
      );

      await loadGardeners();
    } catch (err) {
      console.error(
        "Create gardener error:",
        err
      );

      setError(
        err?.message ||
        "Unable to create gardener."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        pb: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          gap: 2,
          mb: 3,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: "#183B2A",
            }}
          >
            Gardeners
          </Typography>

          <Typography
            sx={{
              color: "#66756C",
              mt: 0.5,
            }}
          >
            Add and manage MUNDER gardeners.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={
            <RefreshCw size={17} />
          }
          onClick={loadGardeners}
          disabled={loading}
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
        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {message && (
        <Alert
          severity="success"
          sx={{
            mb: 2,
            borderRadius: 2,
          }}
        >
          {message}
        </Alert>
      )}

      {createdGardener?.gardenerId && (
        <Alert
          severity="info"
          sx={{
            mb: 2,
            borderRadius: 2,
          }}
        >
          <strong>
            Generated Gardener ID:{" "}
            {createdGardener.gardenerId}
          </strong>
        </Alert>
      )}

      <Grid
        container
        spacing={2.5}
      >
        <Grid
          size={{
            xs: 12,
            md: 5,
          }}
        >
          <Card
            sx={{
              borderRadius: 4,
              border:
                "1px solid #E2E9E3",
              boxShadow:
                "0 5px 20px rgba(0,0,0,.04)",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: "#183B2A",
                  mb: 0.5,
                }}
              >
                Add Gardener
              </Typography>

              <Typography
                sx={{
                  color: "#66756C",
                  fontSize: 13,
                  mb: 2,
                }}
              >
                Enter the gardener details.
                MUNDER will automatically
                generate a unique Gardener ID.
              </Typography>

              <Box
                component="form"
                onSubmit={submit}
                sx={{
                  display: "grid",
                  gap: 1.6,
                }}
              >
                <TextField
                  label="Gardener name"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  fullWidth
                />

                <TextField
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  fullWidth
                />

                <TextField
                  label="Phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  startIcon={
                    <Plus size={18} />
                  }
                  disabled={saving}
                  sx={{
                    mt: 0.5,
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 900,
                    py: 1.2,
                  }}
                >
                  {saving
                    ? "Adding..."
                    : "Add Gardener & Generate ID"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 7,
          }}
        >
          <Card
            sx={{
              borderRadius: 4,
              border:
                "1px solid #E2E9E3",
              boxShadow:
                "0 5px 20px rgba(0,0,0,.04)",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2,
                  sm: 3,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                <UserRound size={21} />

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    color: "#183B2A",
                  }}
                >
                  Gardener List
                </Typography>

                <Chip
                  size="small"
                  label={gardeners.length}
                  sx={{
                    ml: "auto",
                    fontWeight: 900,
                  }}
                />
              </Box>

              {loading ? (
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    py: 6,
                  }}
                >
                  <CircularProgress
                    color="success"
                  />
                </Box>
              ) : gardeners.length === 0 ? (
                <Typography
                  sx={{
                    color: "#66756C",
                    py: 5,
                    textAlign: "center",
                  }}
                >
                  No gardeners added yet.
                </Typography>
              ) : (
                gardeners.map(
                  (gardener, index) => (
                    <React.Fragment
                      key={
                        gardener.gardenerId ||
                        gardener.uid ||
                        index
                      }
                    >
                      {index > 0 && (
                        <Divider
                          sx={{
                            my: 2,
                          }}
                        />
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          gap: 2,
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 900,
                              color: "#183B2A",
                            }}
                          >
                            {gardener.name ||
                              "Unnamed Gardener"}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 13,
                              color: "#66756C",
                              mt: 0.3,
                            }}
                          >
                            {gardener.email ||
                              "No email"}
                            {" · "}
                            {gardener.phone ||
                              "No phone"}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 12,
                              color: "#183B2A",
                              fontWeight: 800,
                              mt: 0.6,
                            }}
                          >
                            Gardener ID:{" "}
                            {gardener.gardenerId ||
                              "Not generated"}
                          </Typography>
                        </Box>

                        <Chip
                          icon={
                            <UserCheck
                              size={15}
                            />
                          }
                          label={
                            gardener.active === false
                              ? "Inactive"
                              : "Active"
                          }
                          size="small"
                          sx={{
                            fontWeight: 800,
                          }}
                        />
                      </Box>
                    </React.Fragment>
                  )
                )
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}