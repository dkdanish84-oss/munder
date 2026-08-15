import React from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Divider,
  Chip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Orders() {
  const navigate = useNavigate();

  const orders = JSON.parse(
    localStorage.getItem("munder_orders") || "[]"
  );

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    try {
      return new Date(dateValue).toLocaleString(
        "en-IN",
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      );
    } catch {
      return dateValue;
    }
  };

  const getStatusColor = (status) => {
    if (status === "Completed") {
      return "success";
    }

    if (
      status === "Confirmed" ||
      status === "Paid"
    ) {
      return "success";
    }

    if (
      status === "Pending Assignment"
    ) {
      return "warning";
    }

    return "default";
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#f7f9f6",
        minHeight: "100vh",
        pb: 14,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: 3,
        }}
      >
        {/* PAGE TITLE */}

        <Typography
          variant="h5"
          fontWeight="bold"
          color="#0e4d28"
          mb={3}
        >
          My Orders 📦
        </Typography>

        {/* ORDERS */}

        {orders.length > 0 ? (
          orders.map((order, index) => (
            <Paper
              key={
                order.razorpayOrderId ||
                order.orderId ||
                index
              }
              elevation={0}
              sx={{
                p: {
                  xs: 2,
                  md: 3,
                },
                mb: 2,
                borderRadius: 3,
                border: "1px solid #e0e0e0",
                bgcolor: "#ffffff",
              }}
            >
              {/* ORDER HEADER */}

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                gap={2}
              >
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Order ID
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="#0e4d28"
                    sx={{
                      wordBreak: "break-all",
                    }}
                  >
                    {order.orderId || "-"}
                  </Typography>
                </Box>

                <Chip
                  label={
                    order.status ||
                    "Pending Assignment"
                  }
                  color={getStatusColor(
                    order.status
                  )}
                  size="small"
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* PLAN */}

              <Typography
                variant="h6"
                fontWeight="bold"
                color="#0f382c"
              >
                {order.planName ||
                  "Garden Maintenance Plan"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={0.5}
              >
                Garden Maintenance Service
              </Typography>

              {/* SERVICE INFO */}

              <Box mt={2}>
                <Typography variant="body2">
                  <b>Duration:</b>{" "}
                  {order.months || 1} month(s)
                </Typography>

                <Typography
                  variant="body2"
                  mt={0.7}
                >
                  <b>Payment Mode:</b>{" "}
                  {order.method ||
                    "Razorpay"}
                </Typography>

                <Typography
                  variant="body2"
                  mt={0.7}
                >
                  <b>Payment Status:</b>{" "}
                  <span
                    style={{
                      color: "#2e7d32",
                      fontWeight: "bold",
                    }}
                  >
                    {order.paymentStatus ||
                      "Paid"}
                  </span>
                </Typography>

                <Typography
                  variant="body2"
                  mt={0.7}
                >
                  <b>Ordered:</b>{" "}
                  {formatDate(
                    order.createdAt
                  )}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* TOTAL */}

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Total Paid
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="#0e4d28"
                >
                  ₹{order.total || 0}
                </Typography>
              </Box>

              {/* RAZORPAY PAYMENT ID */}

              {order.razorpayPaymentId && (
                <Box mt={2}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Razorpay Payment ID
                  </Typography>

                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    sx={{
                      wordBreak: "break-all",
                    }}
                  >
                    {order.razorpayPaymentId}
                  </Typography>
                </Box>
              )}

              {/* VIEW DETAILS */}

              <Button
                variant="outlined"
                fullWidth
                startIcon={
                  <VisibilityIcon />
                }
                onClick={() => {
                  localStorage.setItem(
                    "munder_latest",
                    JSON.stringify(order)
                  );

                  navigate(
                    "/order-success"
                  );
                }}
                sx={{
                  mt: 2,
                  color: "#0e4d28",
                  borderColor: "#0e4d28",
                  textTransform: "none",
                  fontWeight: "bold",
                  py: 1,
                }}
              >
                View Order Details
              </Button>
            </Paper>
          ))
        ) : (
          /* EMPTY ORDERS */

          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: 3,
              border: "1px solid #e0e0e0",
              bgcolor: "#ffffff",
            }}
          >
            <LocalShippingIcon
              sx={{
                fontSize: 55,
                color: "#bdbdbd",
                mb: 1,
              }}
            />

            <Typography
              variant="h6"
              fontWeight="bold"
            >
              No Orders Yet
            </Typography>

            <Typography
              color="text.secondary"
              mt={1}
            >
              Your garden maintenance bookings
              will appear here.
            </Typography>

            <Button
              variant="contained"
              onClick={() =>
                navigate("/plans")
              }
              sx={{
                mt: 3,
                bgcolor: "#0e4d28",
                "&:hover": {
                  bgcolor: "#09361c",
                },
              }}
            >
              View Plans
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
}