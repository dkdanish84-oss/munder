import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Stack,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";

import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Leaf,
} from "lucide-react";

const RAZORPAY_SCRIPT =
  "https://checkout.razorpay.com/v1/checkout.js";

const API_BASE =
  "https://munder-p9yk.onrender.com";

export default function PlanPayment() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPlan = location.state?.plan;
  const currentPlan = location.state?.currentPlan;

  const [loading, setLoading] = useState(false);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (window.Razorpay) {
      return;
    }

    setScriptLoading(true);

    const script = document.createElement("script");

    script.src = RAZORPAY_SCRIPT;
    script.async = true;

    script.onload = () => {
      setScriptLoading(false);
    };

    script.onerror = () => {
      setScriptLoading(false);
      setError(
        "Razorpay Checkout could not be loaded. Please try again."
      );
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  if (!selectedPlan) {
    return (
      <Box
        sx={{
          maxWidth: 700,
          mx: "auto",
          px: 2,
          py: 4,
          pb: 12,
        }}
      >
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 800,
                color: "#183B2A",
              }}
            >
              No plan selected
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#66756C",
              }}
            >
              Please select an upgrade plan first.
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
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Back to My Plan
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      /*
       * CUSTOMER DETAILS
       *
       * Existing Payment.jsx uses customer details from checkout.
       * For plan upgrade, use saved customer details if available.
       */

      let savedCustomer = {};

      try {
        savedCustomer = JSON.parse(
          localStorage.getItem("munder_customer") || "{}"
        );
      } catch {
        savedCustomer = {};
      }

      const customerName =
        savedCustomer.name ||
        savedCustomer.fullName ||
        "Munder Customer";

      const customerPhone =
        savedCustomer.phone ||
        savedCustomer.mobile ||
        "";

      /*
       * CREATE RAZORPAY ORDER
       */

      const response = await fetch(
        `${API_BASE}/api/v1/razorpay/order`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            planName: selectedPlan.name,

            months: 1,

            customer: {
              name: customerName,
              phone: customerPhone,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to create upgrade payment order."
        );
      }

      /*
       * MAKE SURE RAZORPAY IS AVAILABLE
       */

      if (!window.Razorpay) {
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
          `${data.pricing.planName} - Plan Upgrade`,

        image:
          "/images/munder-logo-horizontal.png",

        order_id: data.order.id,

        prefill: {
          name: customerName,

          contact: customerPhone
            ? `+91${String(customerPhone).replace(
                /^\+91/,
                ""
              )}`
            : "",
        },

        notes: {
          type: "plan_upgrade",

          currentPlan:
            currentPlan?.name || "",

          newPlan:
            data.pricing.planName,

          months: "1",
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

        handler: async (paymentResponse) => {
          try {
            setLoading(true);
            setError("");

            /*
             * VERIFY PAYMENT ON SERVER
             */

            const verifyResponse =
              await fetch(
                `${API_BASE}/api/v1/razorpay/verify`,
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
             * SAVE CUSTOMER PLAN UPGRADE
             *
             * This keeps the successful upgrade available
             * to the customer dashboard until the backend
             * subscription system is connected.
             */

            const upgradeRecord = {
              type: "plan_upgrade",

              previousPlan:
                currentPlan?.name || "",

              planName:
                data.pricing.planName,

              amount:
                data.pricing.grandTotal,

              razorpayOrderId:
                paymentResponse.razorpay_order_id,

              razorpayPaymentId:
                paymentResponse.razorpay_payment_id,

              paymentStatus: "Paid",

              status: "Active",

              createdAt:
                new Date().toISOString(),
            };

            localStorage.setItem(
              "munder_active_plan",
              JSON.stringify(upgradeRecord)
            );

            const upgrades =
              JSON.parse(
                localStorage.getItem(
                  "munder_plan_upgrades"
                ) || "[]"
              );

            upgrades.unshift(upgradeRecord);

            localStorage.setItem(
              "munder_plan_upgrades",
              JSON.stringify(upgrades)
            );

            /*
             * SUCCESS
             */

            navigate("/plan-upgrade-success", {
              state: {
                upgrade: upgradeRecord,
              },
            });
          } catch (verificationError) {
            console.error(
              "Plan payment verification error:",
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
        "Plan payment error:",
        err
      );

      setLoading(false);

      setError(
        err.message ||
          "Unable to start payment."
      );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
        pb: 12,
      }}
    >
      <Button
        startIcon={<ArrowLeft size={18} />}
        onClick={() => navigate("/my-plan")}
        sx={{
          color: "#2E7D32",
          textTransform: "none",
          fontWeight: 700,
          mb: 1.5,
        }}
      >
        Back to My Plan
      </Button>

      <Typography
        sx={{
          fontSize: { xs: 25, sm: 30 },
          fontWeight: 800,
          color: "#123D22",
        }}
      >
        Upgrade Plan
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: "#6B756E",
          mb: 3,
        }}
      >
        Review your new plan before payment.
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: 3,
          }}
        >
          {error}
        </Alert>
      )}

      {/* CURRENT → NEW */}

      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #E1E9E2",
          mb: 2,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#718078",
            }}
          >
            CURRENT PLAN
          </Typography>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: 18,
              fontWeight: 800,
              color: "#183B2A",
            }}
          >
            {currentPlan?.name || "Current Plan"}
          </Typography>

          <Typography
            sx={{
              color: "#66756C",
              fontSize: 13,
            }}
          >
            {currentPlan?.price || ""}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#718078",
            }}
          >
            NEW PLAN
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            sx={{ mt: 0.5 }}
          >
            <Stack
              direction="row"
              spacing={1.2}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2.5,
                  bgcolor: "#E8F5E9",
                  color: "#2E7D32",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Leaf size={21} />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: "#183B2A",
                  }}
                >
                  {selectedPlan.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    color: "#2E7D32",
                    fontWeight: 700,
                  }}
                >
                  {selectedPlan.price} / month
                </Typography>
              </Box>
            </Stack>

            <Chip
              label="Upgrade"
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* BENEFITS */}

      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #E1E9E2",
          mb: 2,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Typography
            sx={{
              fontWeight: 800,
              color: "#183B2A",
              mb: 1.5,
            }}
          >
            New Plan Benefits
          </Typography>

          {(selectedPlan.features || []).map(
            (feature) => (
              <Stack
                key={feature}
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <CheckCircle2
                  size={17}
                  color="#2E7D32"
                />

                <Typography
                  fontSize={14}
                  color="#4F5D55"
                >
                  {feature}
                </Typography>
              </Stack>
            )
          )}

          <Typography
            sx={{
              mt: 1.5,
              fontSize: 13,
              color: "#66756C",
            }}
          >
            {selectedPlan.visits}
          </Typography>
        </CardContent>
      </Card>

      {/* PAYMENT */}

      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #DCEBDD",
          bgcolor: "#F8FCF8",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <CreditCard
              size={20}
              color="#2E7D32"
            />

            <Typography
              sx={{
                fontWeight: 800,
                color: "#183B2A",
              }}
            >
              Payment Summary
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography
              fontSize={14}
              color="#66756C"
            >
              New plan
            </Typography>

            <Typography fontWeight={700}>
              {selectedPlan.name}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography
              fontSize={14}
              color="#66756C"
            >
              Monthly price
            </Typography>

            <Typography fontWeight={700}>
              {selectedPlan.price}
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{
                fontWeight: 800,
                color: "#183B2A",
              }}
            >
              Pay
            </Typography>

            <Typography
              sx={{
                fontSize: 23,
                fontWeight: 900,
                color: "#2E7D32",
              }}
            >
              {selectedPlan.price}
            </Typography>
          </Stack>

          <Button
            fullWidth
            variant="contained"
            disabled={loading || scriptLoading}
            onClick={handlePayment}
            startIcon={
              loading ? (
                <CircularProgress
                  size={18}
                  color="inherit"
                />
              ) : (
                <CreditCard size={18} />
              )
            }
            sx={{
              mt: 2.5,
              py: 1.3,
              bgcolor: "#2E7D32",
              "&:hover": {
                bgcolor: "#256628",
              },
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 800,
            }}
          >
            {scriptLoading
              ? "Loading Payment..."
              : loading
              ? "Opening Payment..."
              : "Continue to Payment"}
          </Button>

          <Typography
            sx={{
              mt: 1.5,
              textAlign: "center",
              fontSize: 11,
              color: "#7A857F",
            }}
          >
            Secure payment powered by Razorpay.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
