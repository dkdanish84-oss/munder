import React from "react";
import { useNavigate } from "react-router-dom";

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

  const currentPlan = {
    name: "Basic Care",
    price: "₹1,178",
    visits: "2 Visits / Month",
    renewal: "14 September 2026",
  };

  const upgradePlans = [
    {
      id: "premium-care",
      name: "Premium Care",
      price: "₹1,999",
      visits: "4 Visits / Month",
      features: [
        "Garden maintenance",
        "Plant care",
        "Priority maintenance",
        "4 scheduled visits",
      ],
    },
    {
      id: "complete-care",
      name: "Complete Care",
      price: "₹2,999",
      visits: "8 Visits / Month",
      features: [
        "Garden maintenance",
        "Plant care",
        "Priority maintenance",
        "8 scheduled visits",
      ],
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
