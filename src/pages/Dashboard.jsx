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
  CalendarDays,
  CreditCard,
  ArrowRight,
  Clock3,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

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
          Good Evening 👋
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            color: "#66756C",
            fontSize: 14,
          }}
        >
          Welcome back to your MUNDER garden.
        </Typography>
      </Box>

      {/* =====================================================
          ACTIVE PLAN
      ===================================================== */}

      <Card
        sx={{
          mb: 2.5,
          borderRadius: 4,
          border: "1px solid #DCEBDD",
          boxShadow: "0 8px 30px rgba(31,80,45,0.08)",
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
                  Basic Care Plan
                </Typography>

                <Typography
                  sx={{
                    mt: 0.4,
                    fontSize: 14,
                    color: "#66756C",
                  }}
                >
                  ₹1,178 / month
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

          <Divider sx={{ my: 2 }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "stretch", sm: "center" }}
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
                14 September 2026
              </Typography>
            </Box>

            <Button
              onClick={() => navigate("/my-plan")}
              variant="outlined"
              endIcon={<ArrowRight size={17} />}
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

      {/* =====================================================
          NEXT VISIT
      ===================================================== */}

      <Card
        sx={{
          mb: 2.5,
          borderRadius: 4,
          border: "1px solid #E4ECE5",
          boxShadow: "0 5px 20px rgba(0,0,0,0.04)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
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
                18 August 2026
              </Typography>

              <Typography
                sx={{
                  color: "#66756C",
                  fontSize: 14,
                }}
              >
                10:00 AM • Routine Maintenance
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
              label="Confirmed"
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
              }}
            />

            <Button
              onClick={() => navigate("/my-visits")}
              variant="contained"
              endIcon={<ArrowRight size={17} />}
              sx={{
                bgcolor: "#2E7D32",
                "&:hover": { bgcolor: "#256628" },
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

      {/* =====================================================
          LAST PAYMENT
      ===================================================== */}

      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #E4ECE5",
          boxShadow: "0 5px 20px rgba(0,0,0,0.04)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
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
                ₹1,178
              </Typography>

              <Typography
                sx={{
                  color: "#66756C",
                  fontSize: 14,
                }}
              >
                01 August 2026 • Basic Care Plan
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
              label="Paid"
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
              }}
            />

            <Button
              onClick={() => navigate("/payments")}
              variant="outlined"
              endIcon={<ArrowRight size={17} />}
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
