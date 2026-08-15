import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export function OrderSuccess() {
  const navigate = useNavigate();

  const latest = JSON.parse(
    localStorage.getItem("munder_latest") || "{}"
  );

  const address = JSON.parse(
    localStorage.getItem("munder_address") || "{}"
  );

  const garden = JSON.parse(
    localStorage.getItem("munder_garden") || "{}"
  );

  const formatDate = (dateValue) => {
    if (!dateValue) return "-";

    try {
      return new Date(dateValue).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return dateValue;
    }
  };

  const downloadInvoice = () => {
    const invoice = `
MUNDER
Garden Maintenance & Landscaping

================================
INVOICE
================================

Order ID:
${latest.orderId || "-"}

Razorpay Order ID:
${latest.razorpayOrderId || "-"}

Razorpay Payment ID:
${latest.razorpayPaymentId || "-"}

--------------------------------
SERVICE DETAILS
--------------------------------

Plan:
${latest.planName || "Garden Maintenance Plan"}

Duration:
${latest.months || 1} Month(s)

Garden Size:
${latest.gardenSize || garden.size || "To be measured"}

--------------------------------
CUSTOMER DETAILS
--------------------------------

Name:
${latest.customer?.name || address.name || "-"}

Mobile:
${latest.customer?.phone || address.phone || "-"}

Address:
${address.street || "-"}

City:
${address.city || "-"}

Pincode:
${address.pincode || "-"}

--------------------------------
PAYMENT DETAILS
--------------------------------

Subtotal:
₹${latest.subtotal || latest.total || 0}

GST:
Included

Total Paid:
₹${latest.total || 0}

Payment Mode:
${latest.method || "Razorpay"}

Payment Status:
${latest.paymentStatus || "Paid"}

--------------------------------
SERVICE STATUS
--------------------------------

${latest.status || "Pending Assignment"}

================================

Thank you for choosing Munder.
`;

    const blob = new Blob([invoice], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${latest.orderId || "Munder-Invoice"}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: { xs: 2, md: 4 },
        pb: 8,
      }}
    >
      {/* SUCCESS HEADER */}

      <Box textAlign="center" mb={3}>
        <Typography
          sx={{
            fontSize: 56,
            lineHeight: 1,
          }}
        >
          🎉
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          color="#0e4d28"
          mt={1}
        >
          Booking Successful!
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Your payment has been successfully received.
        </Typography>
      </Box>

      {/* ORDER INFORMATION */}

      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          border: "1px solid #c8e6c9",
        }}
      >
        <CardContent>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Order ID
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            color="#0e4d28"
            sx={{
              wordBreak: "break-word",
            }}
          >
            {latest.orderId || "-"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
          >
            {formatDate(latest.createdAt)}
          </Typography>
        </CardContent>
      </Card>

      {/* SERVICE DETAILS */}

      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#0e4d28"
          >
            Service Details
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
            mb={1.5}
          >
            <Typography color="text.secondary">
              Plan
            </Typography>

            <Typography
              fontWeight="bold"
              textAlign="right"
            >
              {latest.planName || "-"}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
            mb={1.5}
          >
            <Typography color="text.secondary">
              Duration
            </Typography>

            <Typography fontWeight="bold">
              {latest.months || 1} Month(s)
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
          >
            <Typography color="text.secondary">
              Garden Size
            </Typography>

            <Typography
              fontWeight="bold"
              textAlign="right"
            >
              {latest.gardenSize ||
                garden.size ||
                "To be measured"}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* PAYMENT DETAILS */}

      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          bgcolor: "#f9fdf8",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#0e4d28"
          >
            Payment Details
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box
            display="flex"
            justifyContent="space-between"
            mb={1.5}
          >
            <Typography color="text.secondary">
              Amount
            </Typography>

            <Typography>
              ₹{latest.subtotal || latest.total || 0}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            mb={1.5}
          >
            <Typography color="text.secondary">
              GST
            </Typography>

            <Typography color="success.main">
              Included
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            mb={1.5}
          >
            <Typography color="text.secondary">
              Payment Mode
            </Typography>

            <Typography fontWeight="bold">
              {latest.method || "Razorpay"}
            </Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="bold">
              Total Paid
            </Typography>

            <Typography
              variant="h5"
              fontWeight="bold"
              color="#0e4d28"
            >
              ₹{latest.total || 0}
            </Typography>
          </Box>

          <Box mt={2}>
            <Chip
              label={
                latest.paymentStatus ||
                "Payment Successful"
              }
              color="success"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>

      {/* RAZORPAY DETAILS */}

      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#0e4d28"
          >
            Razorpay Details
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Razorpay Order ID
          </Typography>

          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              wordBreak: "break-all",
              mb: 2,
            }}
          >
            {latest.razorpayOrderId || "-"}
          </Typography>

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
            {latest.razorpayPaymentId || "-"}
          </Typography>
        </CardContent>
      </Card>

      {/* CUSTOMER DETAILS */}

      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#0e4d28"
          >
            Customer Details
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography>
            <b>Name:</b>{" "}
            {latest.customer?.name ||
              address.name ||
              "-"}
          </Typography>

          <Typography mt={1}>
            <b>Mobile:</b>{" "}
            {latest.customer?.phone ||
              address.phone ||
              "-"}
          </Typography>

          <Typography mt={1}>
            <b>Address:</b>{" "}
            {address.street || "-"}
          </Typography>

          <Typography mt={1}>
            <b>City:</b>{" "}
            {address.city || "-"}
          </Typography>

          <Typography mt={1}>
            <b>Pincode:</b>{" "}
            {address.pincode || "-"}
          </Typography>
        </CardContent>
      </Card>

      {/* SERVICE ASSIGNMENT */}

      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          bgcolor: "#fff8e1",
          border: "1px solid #ffe082",
        }}
      >
        <CardContent>
          <Typography fontWeight="bold">
            👨‍🌾 Service Assignment
          </Typography>

          <Typography
            mt={1}
            color="#e65100"
            fontWeight="bold"
          >
            {latest.status ||
              "Pending Assignment"}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
          >
            Our team will assign a gardener according
            to your service route and availability.
          </Typography>
        </CardContent>
      </Card>

      {/* ACTION BUTTONS */}

      <Button
        variant="outlined"
        fullWidth
        onClick={downloadInvoice}
        sx={{
          mb: 1.5,
          py: 1.3,
          color: "#0e4d28",
          borderColor: "#0e4d28",
        }}
      >
        📄 Download Invoice
      </Button>

      <Button
        variant="contained"
        fullWidth
        onClick={() => navigate("/orders")}
        sx={{
          mb: 1.5,
          py: 1.4,
          bgcolor: "#0e4d28",
          "&:hover": {
            bgcolor: "#09361c",
          },
        }}
      >
        📦 View Orders & Progress
      </Button>

      <Button
        variant="outlined"
        fullWidth
        onClick={() => navigate("/")}
        sx={{
          py: 1.3,
          color: "#0e4d28",
          borderColor: "#0e4d28",
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
}