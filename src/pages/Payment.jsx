import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

export function Payment() {
  const navigate = useNavigate();

  const [method, setMethod] = useState(
    "UPI (Google Pay, PhonePe, Paytm)"
  );

  const [plan, setPlan] = useState(null);
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const months = Number(
    localStorage.getItem("munder_cart_months") || 1
  );

  useEffect(() => {
    try {
      const savedPlan = JSON.parse(
        localStorage.getItem("munder_selected_plan") || "null"
      );

      const savedAddress = JSON.parse(
        localStorage.getItem("munder_address") || "{}"
      );

      if (savedPlan) {
        setPlan(savedPlan);
      }

      setAddress(savedAddress);
    } catch (err) {
      console.error("Payment data error:", err);

      setError(
        "Unable to load payment details."
      );
    }
  }, []);

  const handlePay = async () => {
    try {
      setLoading(true);
      setError("");

      if (!plan?.name) {
        throw new Error(
          "No plan selected. Please go back and select a plan."
        );
      }

      if (!address?.name || !address?.phone) {
        throw new Error(
          "Customer details are missing. Please go back to Checkout."
        );
      }

      /*
       * CREATE RAZORPAY ORDER
       */

      const response = await fetch(
         "https://munder-p9yk.onrender.com/api/v1/razorpay/order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            planName: plan.name,

            months,

            customer: {
              name: address.name,
              phone: address.phone,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to create payment order."
        );
      }

      /*
       * LOAD RAZORPAY
       */

      const razorpayLoaded =
        await loadRazorpay();

      if (!razorpayLoaded) {
        throw new Error(
          "Razorpay Checkout could not be loaded."
        );
      }

      /*
       * RAZORPAY OPTIONS
       */

      const options = {
        key: data.keyId,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "Munder",

        description:
          `${data.pricing.planName} - ${data.pricing.months} Month`,

        image:
          "/images/munder-logo-horizontal.png",

        order_id: data.order.id,

        prefill: {
          name: address.name || "",

          contact: address.phone
            ? `+91${address.phone}`
            : "",
        },

        notes: {
          plan:
            data.pricing.planName,

          months:
            String(data.pricing.months),

          address:
            address.street || "",

          city:
            address.city || "",

          pincode:
            address.pincode || "",
        },

        theme: {
          color: "#0e4d28",
        },

        modal: {
          confirm_close: true,
          escape: false,
          backdropclose: false,

          ondismiss: () => {
            setLoading(false);
          },
        },

        /*
         * PAYMENT SUCCESS
         */

        handler: async (
          paymentResponse
        ) => {
          try {
            setLoading(true);
            setError("");

            /*
             * VERIFY PAYMENT ON SERVER
             */

            const verifyResponse =
              await fetch(
                 "https://munder-p9yk.onrender.com/api/v1/razorpay/verify",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    razorpay_order_id:
                      paymentResponse.razorpay_order_id,

                    razorpay_payment_id:
                      paymentResponse.razorpay_payment_id,

                    razorpay_signature:
                      paymentResponse.razorpay_signature,
                  }),
                }
              );

            const verifyData =
              await verifyResponse.json();

            if (
              !verifyResponse.ok ||
              !verifyData.success
            ) {
              throw new Error(
                verifyData.message ||
                  "Payment verification failed."
              );
            }

            /*
             * CREATE LOCAL ORDER
             */

            const orderId =
              `MND${new Date()
                .toISOString()
                .slice(0, 10)
                .replace(/-/g, "")}${Math.floor(
                1000 +
                  Math.random() * 9000
              )}`;

            const newOrder = {
              orderId,

              razorpayOrderId:
                paymentResponse.razorpay_order_id,

              razorpayPaymentId:
                paymentResponse.razorpay_payment_id,

              planName:
                data.pricing.planName,

              months:
                data.pricing.months,

              subtotal:
                data.pricing.subtotal,

              gst:
                data.pricing.gst,

              total:
                data.pricing.grandTotal,

              method,

              customer: {
                name: address.name,

                phone: address.phone,
              },

              address,

              status: "Confirmed",

              progressStep: 1,

              createdAt:
                new Date().toISOString(),
            };

            const orders =
              JSON.parse(
                localStorage.getItem(
                  "munder_orders"
                ) || "[]"
              );

            orders.unshift(newOrder);

            localStorage.setItem(
              "munder_orders",
              JSON.stringify(orders)
            );

            localStorage.setItem(
              "munder_latest",
              JSON.stringify(newOrder)
            );

            localStorage.setItem(
              "munder_cart_total",
              String(
                data.pricing.grandTotal
              )
            );

            /*
             * SUCCESS
             */

            navigate("/order-success");

          } catch (verificationError) {
            console.error(
              "Payment verification error:",
              verificationError
            );

            setLoading(false);

            setError(
              verificationError.message ||
                "Payment verification failed."
            );
          }
        },
      };

      /*
       * CREATE RAZORPAY INSTANCE
       */

      const razorpay =
        new window.Razorpay(options);

      /*
       * PAYMENT FAILED
       */

      razorpay.on(
        "payment.failed",
        (response) => {
          console.error(
            "Razorpay payment failed:",
            response
          );

          setLoading(false);

          setError(
            response?.error?.description ||
              "Payment failed. Please try again."
          );
        }
      );

      /*
       * OPEN RAZORPAY
       */

      razorpay.open();

    } catch (err) {
      console.error(
        "Payment error:",
        err
      );

      setLoading(false);

      setError(
        err.message ||
          "Unable to start payment."
      );
    }
  };

  if (!plan) {
    return (
      <Box
        sx={{
          minHeight: "50vh",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",
        }}
      >
        <CircularProgress
          sx={{
            color: "#0e4d28",
          }}
        />
      </Box>
    );
  }

  /*
   * DISPLAY TOTAL
   */

  const displayedTotal =
    localStorage.getItem(
      "munder_cart_total"
    ) || plan.price;

  return (
    <Box
      p={3}
      pb={10}
      sx={{
        maxWidth: 700,

        mx: "auto",
      }}
    >

      {/* PROGRESS */}

      <Box mb={2}>

        <Typography
          variant="caption"
          color="#0e4d28"
          fontWeight="bold"
        >
          Step 3 of 3 • Secure Payment
        </Typography>

        <LinearProgress
          variant="determinate"
          value={100}
          sx={{
            mt: 1,

            height: 6,

            borderRadius: 3,

            "& .MuiLinearProgress-bar": {
              bgcolor: "#0e4d28",
            },
          }}
        />

      </Box>


      {/* ERROR */}

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
          }}
        >
          {error}
        </Alert>
      )}


      {/* PLAN */}

      <Card
        sx={{
          borderRadius: 3,

          border:
            "1px solid #c8e6c9",
        }}
      >

        <CardContent>

          <Typography
            variant="h6"
            fontWeight="bold"
            color="#0e4d28"
          >
            {plan.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
            }}
          >
            Garden Maintenance Plan
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
            }}
          >
            Duration: {months} month
            {months > 1 ? "s" : ""}
          </Typography>

          <Divider
            sx={{
              my: 2,
            }}
          />

          <Box
            display="flex"
            justifyContent="space-between"
          >
            <Typography>
              Amount
            </Typography>

            <Typography
              fontWeight="bold"
            >
              ₹{displayedTotal}
            </Typography>
          </Box>

        </CardContent>

      </Card>


      {/* PAYMENT METHODS */}

      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{
          mt: 3,
          mb: 1,
        }}
      >
        Select Payment Method
      </Typography>

      {[
        "UPI (Google Pay, PhonePe, Paytm)",
        "Cards (Credit / Debit)",
        "Net Banking",
        "Wallet",
      ].map((m) => (

        <Button
          key={m}
          variant={
            method === m
              ? "contained"
              : "outlined"
          }

          fullWidth

          onClick={() => setMethod(m)}

          sx={{
            my: 1,

            justifyContent:
              "flex-start",

            p: 1.5,

            bgcolor:
              method === m
                ? "#0e4d28"
                : "#fff",

            color:
              method === m
                ? "#fff"
                : "#0e4d28",

            borderColor:
              "#0e4d28",

            "&:hover": {
              borderColor:
                "#0e4d28",
            },
          }}
        >
          {m}
        </Button>

      ))}


      {/* SECURITY */}

      <Card
        sx={{
          bgcolor: "#f1f8e9",

          mt: 4,

          mb: 2,

          border:
            "1px solid #c8e6c9",

          textAlign: "center",
        }}
      >

        <CardContent>

          <Typography
            variant="body2"
            fontWeight="bold"
            color="#0e4d28"
          >
            🔒 Secure Razorpay Payment
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{
              mt: 0.5,
            }}
          >
            UPI • Cards • Net Banking • Wallets
          </Typography>

        </CardContent>

      </Card>


      {/* PAY BUTTON */}

      <Button
        variant="contained"

        fullWidth

        disabled={loading}

        onClick={handlePay}

        sx={{
          mt: 2,

          py: 1.5,

          bgcolor:
            "#0e4d28",

          "&:hover": {
            bgcolor:
              "#08783f",
          },
        }}
      >

        {loading ? (

          <CircularProgress
            size={24}
            sx={{
              color: "#fff",
            }}
          />

        ) : (

          `Confirm & Pay ₹${displayedTotal}`

        )}

      </Button>

    </Box>
  );
}