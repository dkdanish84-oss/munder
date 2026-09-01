import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

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
  CheckCircle2,
  ArrowRight,
  GitCompare,
} from "lucide-react";

export default function MyPlan() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [customerLoading, setCustomerLoading] = useState(true);
  const [customerError, setCustomerError] = useState("");

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    "https://munder.in";

  useEffect(() => {
    let cancelled = false;

    async function loadCustomer() {
      try {
        setCustomerLoading(true);
        setCustomerError("");

        const user = auth.currentUser;

        if (!user) {
          throw new Error(
            "Please login to view your plan."
          );
        }

        const token = await user.getIdToken();

        const response = await fetch(
          `${API_BASE}/api/v1/customer/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success || !data.customer) {
          throw new Error(
            data.message ||
              "Unable to load customer account."
          );
        }

        if (!cancelled) {
          setCustomer(data.customer);
        }
      } catch (error) {
        console.error(
          "MyPlan customer lookup error:",
          error
        );

        if (!cancelled) {
          setCustomerError(
            error.message ||
              "Unable to load your plan."
          );
        }
      } finally {
        if (!cancelled) {
          setCustomerLoading(false);
        }
      }
    }

    loadCustomer();

    return () => {
      cancelled = true;
    };
  }, []);

  if (customerLoading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Typography
          sx={{
            color: "#2E7D32",
            fontWeight: 700,
          }}
        >
          Loading your plan...
        </Typography>
      </Box>
    );
  }

  if (customerError) {
    return (
      <Box
        sx={{
          maxWidth: 700,
          mx: "auto",
          px: 2,
          py: 4,
        }}
      >
        <Typography
          sx={{
            color: "#B3261E",
            fontWeight: 700,
            mb: 1,
          }}
        >
          Unable to load your plan
        </Typography>

        <Typography
          sx={{
            color: "#66756C",
            fontSize: 14,
          }}
        >
          {customerError}
        </Typography>
      </Box>
    );
  }
  const backendPlan = customer?.plan;

  const currentPlan = {
    name:
      backendPlan?.name ||
      "No active plan",

    price:
      backendPlan?.monthlyPrice != null
        ? `₹${backendPlan.monthlyPrice}`
        : "—",

    visits:
      backendPlan?.visitsPerMonth != null
        ? `${backendPlan.visitsPerMonth} visits per month`
        : "—",

    renewal:
      backendPlan?.renewalDate
        ? new Date(
            backendPlan.renewalDate
          ).toLocaleDateString(
            "en-IN",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )
        : "Not available",
  };

  const isActivePlan =
    customer?.status === "ACTIVE" &&
    !!customer?.plan;

  const planStatusLabel =
    isActivePlan
      ? "Active"
      : customer?.status === "PAYMENT_PENDING"
        ? "Payment Pending"
        : "No Active Plan";

  const upgradePlans = [
    {
      id: 1,
      name: "Basic Care Plan",
      price: "999",
      duration: "per month",
      visits: "2 visits per month",
      suitable: "Balcony Garden",
      features: [
        "2 Gardener visits per month",
        "Garden cleaning & dry-leaf removal",
        "Light weed removal",
        "Soil loosening",
        "Light pruning & dry branch removal",
        "Basic plant health inspection",
        "WhatsApp expert support",
      ],
      description:
        "An affordable basic maintenance plan for small gardens and balcony spaces, focused on cleaning, light weeding, soil care and basic plant health.",
    },
    {
      id: 2,
      name: "Pro Garden Plan",
      price: "1,999",
      duration: "per month",
      visits: "4 visits per month",
      suitable: "Home Garden",
      features: [
        "4 Gardener visits per month",
        "Garden cleaning & dry-leaf removal",
        "Regular weed removal",
        "Soil loosening",
        "Regular pruning & trimming",
        "Hedge trimming",
        "Basic lawn maintenance",
        "Detailed plant health inspection",
        "Basic pest & disease care",
        "Scheduled fertilizer application",
        "Priority WhatsApp support",
      ],
      description:
        "A regular professional maintenance plan for home gardens with four monthly visits, pruning, hedge care, lawn maintenance and scheduled plant care.",
    },
    {
      id: 3,
      name: "Ultimate Estate Plan",
      price: "3,999",
      duration: "per month",
      visits: "Weekly  4 visits per month",
      suitable: "Villa / Luxury Lawn",
      features: [
        "Weekly 4 gardener visits per month",
        "Plant watering",
        "Complete garden cleaning",
        "Regular weed removal",
        "Soil loosening & soil care",
        "Professional pruning & trimming",
        "Hedge shaping & trimming",
        "Lawn mowing & edge trimming",
        "Detailed plant health inspection",
        "Pest & disease management",
        "Scheduled fertilizer application",
        "Irrigation system basic check",
        "Seasonal plant & flower care",
        "Landscape styling advice",
        "Priority WhatsApp & Call support",
        "Dedicated gardener attention",
      ],
      description:
        "A premium weekly garden management plan for villas and larger estates with watering, lawn and hedge care, pest management, irrigation checks and dedicated attention.",
    },
  ];
  const handleSelectPlan = (plan) => {
    navigate("/plan-payment", {
      state: {
        plan,
        currentPlan,
      },
    });
  };

  if (customerLoading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Typography
          sx={{
            color: "#2E7D32",
            fontWeight: 700,
          }}
        >
          Loading your plan...
        </Typography>
      </Box>
    );
  }

  if (customerError) {
    return (
      <Box
        sx={{
          maxWidth: 700,
          mx: "auto",
          px: 2,
          py: 4,
        }}
      >
        <Typography
          sx={{
            color: "#B3261E",
            fontWeight: 700,
            mb: 1,
          }}
        >
          Unable to load your plan
        </Typography>

        <Typography
          sx={{
            color: "#66756C",
            fontSize: 14,
          }}
        >
          {customerError}
        </Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
        pb: 12,
      }}
    >
      {/* HEADER */}

      <Typography
        sx={{
          fontSize: { xs: 25, sm: 30 },
          fontWeight: 800,
          color: "#123D22",
        }}
      >
        My Plan
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: "#6B756E",
          mb: 3,
        }}
      >
        Manage your MUNDER garden care plan
      </Typography>

      {/* CURRENT PLAN */}

      <Card
        sx={{
          borderRadius: 4,
          border: "2px solid #2E7D32",
          boxShadow: "0 8px 30px rgba(31,80,45,0.08)",
          mb: 3.5,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
          >
            <Stack direction="row" spacing={1.5}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: 3,
                  bgcolor: "#E8F5E9",
                  color: "#2E7D32",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Leaf size={25} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#718078",
                    fontWeight: 700,
                  }}
                >
                  CURRENT PLAN
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#183B2A",
                  }}
                >
                  {currentPlan.name}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    color: "#2E7D32",
                    fontWeight: 700,
                  }}
                >
                  {currentPlan.price} / month
                </Typography>
              </Box>
            </Stack>

            <Chip
              label="Active"
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
              }}
            />
          </Stack>

          <Divider sx={{ my: 2.5 }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1.5, sm: 5 }}
          >
            <Box>
              <Typography fontSize={12} color="#7A857F">
                Visits
              </Typography>

              <Typography fontWeight={800} color="#183B2A">
                {currentPlan.visits}
              </Typography>
            </Box>

            <Box>
              <Typography fontSize={12} color="#7A857F">
                Next Renewal
              </Typography>

              <Typography fontWeight={800} color="#183B2A">
                {currentPlan.renewal}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2.5 }} />

          <Typography
            sx={{
              fontWeight: 800,
              color: "#183B2A",
              mb: 1.2,
            }}
          >
            Plan Benefits
          </Typography>

          {[
            "Garden maintenance",
            "Scheduled gardener visits",
            "Plant care",
            "Routine maintenance",
          ].map((item) => (
            <Stack
              key={item}
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 0.8 }}
            >
              <CheckCircle2 size={17} color="#2E7D32" />

              <Typography fontSize={14} color="#4F5D55">
                {item}
              </Typography>
            </Stack>
          ))}
        </CardContent>
      </Card>

      {/* UPGRADE SECTION */}

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <GitCompare size={20} color="#2E7D32" />

        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 800,
            color: "#123D22",
          }}
        >
          Upgrade to another plan
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontSize: 13,
          color: "#6B756E",
          mb: 2,
        }}
      >
        Choose a higher plan for more visits and additional benefits.
      </Typography>

      <Stack spacing={2}>
        {upgradePlans.map((plan) => (
          <Card
            key={plan.id}
            sx={{
              borderRadius: 4,
              border: "1px solid #DDE7DF",
              boxShadow: "0 4px 18px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                gap={2}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 19,
                      fontWeight: 800,
                      color: "#183B2A",
                    }}
                  >
                    {plan.name}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.4,
                      fontWeight: 800,
                      color: "#2E7D32",
                    }}
                  >
                    {plan.price} / month
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 13,
                      color: "#66756C",
                    }}
                  >
                    {plan.visits}
                  </Typography>
                </Box>

                <Chip
                  label="Upgrade"
                  size="small"
                  sx={{
                    bgcolor: "#F0F7F1",
                    color: "#2E7D32",
                    fontWeight: 700,
                  }}
                />
              </Stack>

              <Divider sx={{ my: 2 }} />

              {plan.features.map((feature) => (
                <Stack
                  key={feature}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mb: 0.8 }}
                >
                  <CheckCircle2 size={16} color="#2E7D32" />

                  <Typography fontSize={13} color="#5F6B64">
                    {feature}
                  </Typography>
                </Stack>
              ))}

              <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowRight size={17} />}
                onClick={() => handleSelectPlan(plan)}
                sx={{
                  mt: 2,
                  bgcolor: "#2E7D32",
                  "&:hover": {
                    bgcolor: "#256628",
                  },
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 700,
                  py: 1.2,
                }}
              >
                Select Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}









