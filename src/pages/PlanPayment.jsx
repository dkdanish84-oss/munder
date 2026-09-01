import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

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
const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://munder.in";

export default function PlanPayment() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPlan = location.state?.plan;
  const currentPlan = location.state?.currentPlan;

  const [loading, setLoading] = useState(false);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState(null);
  const [customerLoading, setCustomerLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadCustomer() {
      try {
        const user = auth.currentUser;

        if (!user) {
          throw new Error(
            "Please login before purchasing a plan."
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
          "PlanPayment customer lookup error:",
          error
        );

        if (!cancelled) {
          setError(
            error.message ||
              "Unable to load customer account."
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

  const customerName =
    customer?.name ||
    auth.currentUser?.displayName ||
    "Munder Customer";

  const customerPhone =
    customer?.phone ||
    auth.currentUser?.phoneNumber ||
    "";



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
      const user = auth.currentUser;

      if (!user) {
        throw new Error(
          "Please login before making a payment."
        );
      }

      const firebaseToken =
        await user.getIdToken();
      setLoading(true);
      setError("");
/*
       * CREATE RAZORPAY ORDER
       */const response = await fetch(
        `${API_BASE}/api/v1/razorpay/order`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
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

      const razorpayLoaded = await loadRazorpay();

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
          `${data.pricing.planName} - Plan Upgrade`,

        // Do not use a localhost-relative image here. Razorpay checkout is hosted
        // on Razorpay, so it cannot access the local Vite server image.
        // image: "https://YOUR-PUBLIC-DOMAIN/images/munder-logo-horizontal.png",

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
                    Authorization: `Bearer ${firebaseToken}`,
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
            }/*
             * SUCCESS
             */

            const upgradeRecord = {
              previousPlan:
                currentPlan?.name || "",

              planName:
                verifyData.subscription?.planName ||
                data.pricing.planName,

              amount:
                verifyData.payment?.amount ??
                data.pricing.grandTotal,

              razorpayOrderId:
                verifyData.payment?.razorpayOrderId ||
                paymentResponse.razorpay_order_id,

              razorpayPaymentId:
                verifyData.payment?.razorpayPaymentId ||
                paymentResponse.razorpay_payment_id,

              paymentStatus: "Paid",

              status:
                verifyData.subscription?.status ||
                "ACTIVE",

              createdAt:
                verifyData.payment?.paidAt ||
                new Date().toISOString(),

              customer:
                verifyData.customer || null,

              subscription:
                verifyData.subscription || null,

              payment:
                verifyData.payment || null,
            };
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














