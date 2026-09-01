import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Divider,
  Stack,
} from "@mui/material";

import {
  Leaf,
  CalendarDays,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://munder.in";

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPaymentDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getUpcomingVisit(visits) {
  if (!Array.isArray(visits) || visits.length === 0) {
    return null;
  }

  const now = new Date();

  const upcoming = visits
    .filter((visit) => {
      if (!visit?.visitDate) return false;

      const date = new Date(
        `${visit.visitDate}T23:59:59`
      );

      return !Number.isNaN(date.getTime()) && date >= now;
    })
    .sort((a, b) => {
      const aDate = new Date(
        `${a.visitDate}T00:00:00`
      ).getTime();

      const bDate = new Date(
        `${b.visitDate}T00:00:00`
      ).getTime();

      return aDate - bDate;
    });

  return upcoming[0] || null;
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadDashboard = async () => {
      try {
        const auth = getAuth();
        const firebaseUser = auth.currentUser;

        if (!firebaseUser) {
          throw new Error(
            "Please login to view your customer dashboard."
          );
        }

        const token = await firebaseUser.getIdToken();

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [customerResponse, visitsResponse] =
          await Promise.all([
            fetch(
              `${API_BASE}/api/v1/customer/me`,
              { headers }
            ),

            fetch(
              `${API_BASE}/api/v1/customer/visits`,
              { headers }
            ),
          ]);

        const customerData =
          await customerResponse.json();

        const visitsData =
          await visitsResponse.json();

        if (
          !customerResponse.ok ||
          !customerData.success
        ) {
          throw new Error(
            customerData.message ||
              "Unable to load customer account."
          );
        }

        if (
          !visitsResponse.ok ||
          !visitsData.success
        ) {
          throw new Error(
            visitsData.message ||
              "Unable to load customer visits."
          );
        }

        if (!cancelled) {
          setCustomer(customerData.customer);

          setVisits(
            Array.isArray(visitsData.visits)
              ? visitsData.visits
              : []
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message ||
              "Unable to load customer dashboard."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const nextVisit = getUpcomingVisit(visits);

  const customerName =
    customer?.name ||
    "Munder Customer";

  const activePlan =
    customer?.plan;

  const lastPayment =
    customer?.lastPayment;

  const nextVisitDate =
    nextVisit?.visitDate
      ? formatDate(nextVisit.visitDate)
      : "No visit scheduled";

  const nextVisitDetails = nextVisit
    ? [
        nextVisit.service,
        nextVisit.visitTime,
        nextVisit.assignedGardener
          ? `Gardener: ${nextVisit.assignedGardener}`
          : null,
      ]
        .filter(Boolean)
        .join(" • ")
    : "Visit details will appear here";

  const nextVisitStatus =
    nextVisit?.status || "Pending";

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        pt: { xs: 3, sm: 4 },
        pb: 12,
      }}
    >
      {/* WELCOME */}

      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: { xs: 24, sm: 30 },
            fontWeight: 800,
            color: "#183B2A",
          }}
        >
          {loading
            ? "Loading your account..."
            : `Good Evening${
                customerName
                  ? `, ${customerName}`
                  : ""
              } 👋`}
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            color: "#66756C",
            fontSize: 14,
          }}
        >
          {error
            ? error
            : "Welcome back to your MUNDER garden."}
        </Typography>
      </Box>

      {/* ACTIVE PLAN */}

      <Card
        sx={{
          mb: 2.5,
          borderRadius: 4,
          border: "1px solid #DCEBDD",
          boxShadow:
            "0 8px 30px rgba(31,80,45,0.08)",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2.5, sm: 3 },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
          >
            <Stack
              direction="row"
              spacing={1.5}
            >
              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 3,
                  bgcolor: "#EAF4EB",
                  color: "#2E7D32",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Leaf size={23} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#718078",
                    fontWeight: 700,
                  }}
                >
                  YOUR ACTIVE PLAN
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: 21,
                    fontWeight: 800,
                    color: "#183B2A",
                  }}
                >
                  {activePlan?.name ||
                    "No active plan"}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.4,
                    fontSize: 14,
                    color: "#66756C",
                  }}
                >
                  {activePlan?.monthlyPrice != null
                    ? `₹${activePlan.monthlyPrice} / month`
                    : customer?.status ===
                      "PAYMENT_PENDING"
                    ? "Plan payment pending"
                    : "Price not available"}
                </Typography>
              </Box>
            </Stack>

            <Chip
              label={
                customer?.status === "ACTIVE"
                  ? "Active"
                  : customer?.status ||
                    "Pending"
              }
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
              }}
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "stretch",
              sm: "center",
            }}
            gap={2}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#7A857F",
                }}
              >
                Next renewal
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontWeight: 700,
                  color: "#26382D",
                }}
              >
                {formatDate(
                  activePlan?.renewalDate
                )}
              </Typography>
            </Box>

            <Button
              onClick={() =>
                navigate("/my-plan")
              }
              variant="outlined"
              endIcon={
                <ArrowRight size={17} />
              }
              sx={{
                borderColor: "#2E7D32",
                color: "#2E7D32",
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              View Plan
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* NEXT VISIT */}

      <Card
        sx={{
          mb: 2.5,
          borderRadius: 4,
          border: "1px solid #E4ECE5",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.04)",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2.5, sm: 3 },
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 3,
                bgcolor: "#EAF4EB",
                color: "#2E7D32",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CalendarDays size={23} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#718078",
                  fontWeight: 700,
                }}
              >
                NEXT VISIT
              </Typography>

              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#183B2A",
                }}
              >
                {nextVisitDate}
              </Typography>

              <Typography
                sx={{
                  color: "#66756C",
                  fontSize: 14,
                }}
              >
                {nextVisitDetails}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <Chip
              label={nextVisitStatus}
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
              }}
            />

            <Button
              onClick={() =>
                navigate("/my-visits")
              }
              variant="contained"
              endIcon={
                <ArrowRight size={17} />
              }
              sx={{
                bgcolor: "#2E7D32",
                "&:hover": {
                  bgcolor: "#256628",
                },
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              View Visit
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* LAST PAYMENT */}

      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #E4ECE5",
          boxShadow:
            "0 5px 20px rgba(0,0,0,0.04)",
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2.5, sm: 3 },
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 3,
                bgcolor: "#EAF4EB",
                color: "#2E7D32",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CreditCard size={23} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#718078",
                  fontWeight: 700,
                }}
              >
                LAST PAYMENT
              </Typography>

              <Typography
                sx={{
                  fontSize: 21,
                  fontWeight: 800,
                  color: "#183B2A",
                }}
              >
                {lastPayment?.amount != null
                  ? `₹${lastPayment.amount}`
                  : "No payment yet"}
              </Typography>

              <Typography
                sx={{
                  color: "#66756C",
                  fontSize: 14,
                }}
              >
                {lastPayment?.date
                  ? `${formatPaymentDate(
                      lastPayment.date
                    )}${
                      lastPayment.plan
                        ? ` • ${lastPayment.plan}`
                        : ""
                    }`
                  : "Payment history will appear here"}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              label={
                lastPayment?.status ||
                "Pending"
              }
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
              }}
            />

            <Button
              onClick={() =>
                navigate("/payments")
              }
              variant="outlined"
              endIcon={
                <ArrowRight size={17} />
              }
              sx={{
                borderColor: "#2E7D32",
                color: "#2E7D32",
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              View Payments
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}


