import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import {
  CheckCircle2,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";

export default function PlanUpgradeSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const upgrade = location.state?.upgrade;

  if (!upgrade) {
    return (
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          px: 2,
          py: 5,
          pb: 12,
        }}
      >
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 800,
                color: "#183B2A",
              }}
            >
              Upgrade details not found
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/my-plan")}
              sx={{
                mt: 3,
                bgcolor: "#2E7D32",
                "&:hover": {
                  bgcolor: "#256628",
                },
              }}
            >
              View My Plan
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const amount =
    upgrade.grandTotal ??
    upgrade.total ??
    upgrade.amount ??
    0;

  return (
    <Box
      sx={{
        maxWidth: 650,
        mx: "auto",
        px: 2,
        py: 4,
        pb: 12,
      }}
    >
      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #DCEBDD",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ textAlign: "center" }}>
            <CheckCircle2
              size={64}
              color="#2E7D32"
              strokeWidth={1.8}
            />

            <Typography
              sx={{
                mt: 2,
                fontSize: { xs: 25, sm: 30 },
                fontWeight: 800,
                color: "#183B2A",
              }}
            >
              Upgrade Successful
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#66756C",
              }}
            >
              Your Munder plan has been upgraded successfully.
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Stack spacing={2}>
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#748078",
                }}
              >
                Previous Plan
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontWeight: 700,
                  color: "#183B2A",
                }}
              >
                {upgrade.previousPlan || "Current Plan"}
              </Typography>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#748078",
                }}
              >
                New Plan
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#2E7D32",
                }}
              >
                {upgrade.planName || "Updated Plan"}
              </Typography>
            </Box>

            {amount > 0 && (
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#748078",
                  }}
                >
                  Amount Paid
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#183B2A",
                  }}
                >
                  ₹{Number(amount).toLocaleString("en-IN")}
                </Typography>
              </Box>
            )}

            {upgrade.razorpayPaymentId && (
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#748078",
                  }}
                >
                  Payment ID
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#44524A",
                    wordBreak: "break-all",
                  }}
                >
                  {upgrade.razorpayPaymentId}
                </Typography>
              </Box>
            )}

            {upgrade.createdAt && (
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#748078",
                  }}
                >
                  Date
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontWeight: 600,
                    color: "#44524A",
                  }}
                >
                  {new Date(upgrade.createdAt).toLocaleString(
                    "en-IN"
                  )}
                </Typography>
              </Box>
            )}
          </Stack>

          <Stack
            spacing={1.5}
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowRight size={18} />}
              onClick={() => navigate("/my-plan")}
              sx={{
                minHeight: 48,
                borderRadius: 2.5,
                bgcolor: "#2E7D32",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#256628",
                },
              }}
            >
              View My Plan
            </Button>

            <Button
              variant="outlined"
              startIcon={<LayoutDashboard size={18} />}
              onClick={() => navigate("/dashboard")}
              sx={{
                minHeight: 48,
                borderRadius: 2.5,
                borderColor: "#2E7D32",
                color: "#2E7D32",
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Go to Dashboard
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

