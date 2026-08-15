import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const [months, setMonths] = useState(1);

  // Always read the exact plan selected from Plans.jsx.
  const storedPlan = localStorage.getItem("munder_selected_plan");

  const plan = storedPlan
    ? JSON.parse(storedPlan)
    : {
        name: "Basic Care Plan",
        price: 999,
        duration: "per month",
        visits: "2 visits per month",
        type: "Garden Maintenance Plan",
      };

  const garden = JSON.parse(
    localStorage.getItem("munder_garden") ||
      '{"size":"200 sq ft"}'
  );

  const subtotal = Number(plan.price || 0) * months;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  const increase = () => {
    setMonths((previous) => previous + 1);
  };

  const decrease = () => {
    setMonths((previous) => (previous > 1 ? previous - 1 : 1));
  };

  const proceedCheckout = () => {
    localStorage.setItem("munder_cart_total", String(grandTotal));
    localStorage.setItem("munder_cart_months", String(months));

    // Keep the exact selected plan available for Checkout/Payment.
    localStorage.setItem(
      "munder_selected_plan",
      JSON.stringify(plan)
    );

    navigate("/checkout");
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        p: {
          xs: 1.5,
          sm: 2,
          md: 3,
        },
        pb: 12,
        background: "#F7FAF7",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        color="#0e4d28"
      >
        Order Summary
      </Typography>

      <Card
        sx={{
          my: 2,
          borderRadius: 3,
          boxShadow: 2,
          width: "100%",
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#102A43"
          >
            {plan.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            Garden Size : {garden.size}
          </Typography>

          {plan.visits && (
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: "#0e4d28",
                fontWeight: 700,
              }}
            >
              {plan.visits}
            </Typography>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            <Typography>
              Duration (Months)
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="outlined"
                size="small"
                onClick={decrease}
                sx={{
                  minWidth: 94,
                  borderRadius: 5,
                  color: "#0e4d28",
                  borderColor: "#8BB89B",
                  fontWeight: 800,
                }}
              >
                -
              </Button>

              <Typography
                sx={{
                  width: 25,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {months}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={increase}
                sx={{
                  minWidth: 94,
                  borderRadius: 5,
                  color: "#0e4d28",
                  borderColor: "#8BB89B",
                  fontWeight: 800,
                }}
              >
                +
              </Button>
            </Stack>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Subtotal</Typography>
            <Typography>₹{subtotal}</Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Typography>GST (18%)</Typography>
            <Typography>₹{gst}</Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Typography color="success.main">
              First Visit Fee
            </Typography>

            <Typography
              color="success.main"
              fontWeight="bold"
            >
              FREE
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Grand Total
            </Typography>

            <Typography
              variant="h6"
              fontWeight="bold"
              color="#0e4d28"
            >
              ₹{grandTotal}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <TextField
        disabled
        fullWidth
        size="small"
        label="Coupon Code"
        placeholder="Coming Soon"
      />

      <Typography
        variant="caption"
        color="text.secondary"
      >
        Coupons & Discounts coming soon.
      </Typography>

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          py: 1.5,
          bgcolor: "#0e4d28",
          fontWeight: 800,
          "&:hover": {
            bgcolor: "#08783F",
          },
        }}
        onClick={proceedCheckout}
      >
        Proceed to Checkout →
      </Button>
    </Box>
  );
}
