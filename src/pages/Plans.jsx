import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function Plan() {
  const navigate = useNavigate();

  const plans = [
    {
      id: 1,
      name: "Basic Care Plan",
      shortTitle: "Basic Care\nPlan",
      badge: "Starter",
      badgeBg: "#E8F5E9",
      badgeColor: "#0E4D28",
      suitable: "Balcony Garden",
      price: 999,
      duration: "per month",
      visits: "2 visits per month",
      image: "/images/services/munder maintenance 01.png",
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
      shortTitle: "Pro Garden\nPlan",
      badge: "Most Popular",
      badgeBg: "#FFF3E0",
      badgeColor: "#E65100",
      suitable: "Home Garden",
      price: 1999,
      duration: "per month",
      visits: "4 visits per month",
      image: "/images/services/munder maintenance 01.png",
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
      shortTitle: "Ultimate Estate\nPlan",
      badge: "Premium",
      badgeBg: "#F3E5F5",
      badgeColor: "#6A1B9A",
      suitable: "Villa / Luxury Lawn",
      price: 3999,
      duration: "per month",
      visits: "Weekly • 4 visits per month",
      image: "/images/services/munder maintenance 01.png",
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

  const [currentIndex, setCurrentIndex] = useState(1);
  const currentPlan = plans[currentIndex];

  const selectPlan = (index) => {
    setCurrentIndex(index);
  };

  const handleSelectPlan = (plan) => {
    const existingCart = JSON.parse(
      localStorage.getItem("munder_cart") || "[]"
    );

    const existingIndex = existingCart.findIndex(
      (item) => item.id === plan.id
    );

    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        duration: plan.duration,
        suitable: plan.suitable,
        quantity: 1,
        type: "Garden Maintenance Plan",
      });
    }

    localStorage.setItem("munder_cart", JSON.stringify(existingCart));
    navigate("/cart");
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#F7FAF7",
      }}
    >
      {/* PLAN HERO */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {
            xs: 300,
            sm: 350,
            md: 430,
          },
          overflow: "hidden",
          background: "#123D25",
        }}
      >
        {/* MAIN IMAGE */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
          }}
        >
          <Box
            key={currentPlan.image}
            component="img"
            src={currentPlan.image}
            alt={currentPlan.name}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              animation: "planImageIn .45s ease",
              "@keyframes planImageIn": {
                from: {
                  opacity: 0.55,
                  transform: "scale(1.02)",
                },
                to: {
                  opacity: 1,
                  transform: "scale(1)",
                },
              },
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.50) 38%, rgba(0,0,0,.18) 72%, rgba(0,0,0,.20) 100%)",
            }}
          />
        </Box>

        {/* LEFT CONTENT */}
        <Box
          sx={{
            position: "absolute",
            left: {
              xs: 16,
              sm: 28,
              md: 45,
            },
            top: {
              xs: 52,
              sm: 72,
              md: 100,
            },
            width: {
              xs: "58%",
              sm: "54%",
              md: "48%",
            },
            zIndex: 5,
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 0.9,
              py: 0.35,
              mb: { xs: 0.8, md: 1.1 },
              borderRadius: 1,
              background: "rgba(0,120,55,.9)",
              color: "#fff",
              fontSize: {
                xs: ".46rem",
                sm: ".58rem",
                md: ".72rem",
              },
              fontWeight: 800,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
            }}
          >
            Munder Garden Maintenance Plans
          </Box>

          <Typography
            sx={{
              color: "#fff",
              fontSize: {
                xs: "1.45rem",
                sm: "1.9rem",
                md: "3rem",
              },
              fontWeight: 900,
              lineHeight: 1.04,
              whiteSpace: "pre-line",
              textShadow: "0 2px 7px rgba(0,0,0,.45)",
            }}
          >
            {currentPlan.shortTitle}
          </Typography>

          <Typography
            sx={{
              mt: { xs: 0.7, md: 1 },
              color: "rgba(255,255,255,.96)",
              fontSize: {
                xs: ".56rem",
                sm: ".68rem",
                md: ".92rem",
              },
              lineHeight: 1.45,
              maxWidth: {
                xs: 205,
                sm: 290,
                md: 470,
              },
              display: "-webkit-box",
              WebkitLineClamp: { xs: 3, sm: 4, md: 4 },
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {currentPlan.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: { xs: 1, sm: 1.5 },
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: { xs: "1.2rem", md: "1.8rem" },
                fontWeight: 900,
              }}
            >
              ₹{currentPlan.price}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,.82)",
                fontSize: { xs: ".52rem", md: ".72rem" },
              }}
            >
              / {currentPlan.duration}
            </Typography>
          </Box>

          <Typography
            sx={{
              mt: { xs: 0.35, md: 0.55 },
              color: "#fff",
              fontSize: { xs: ".52rem", md: ".72rem" },
              fontWeight: 800,
            }}
          >
            {currentPlan.visits}
          </Typography>

          <Button
            onClick={() => handleSelectPlan(currentPlan)}
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              mt: { xs: 1, sm: 1.4 },
              minWidth: 0,
              height: { xs: 29, sm: 34, md: 40 },
              px: { xs: 1.2, sm: 1.7, md: 2 },
              borderRadius: 5,
              background: "#fff",
              color: "#08783F",
              fontSize: {
                xs: ".48rem",
                sm: ".6rem",
                md: ".75rem",
              },
              fontWeight: 900,
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,.2)",
              "&:hover": {
                background: "#F2FFF6",
              },
            }}
          >
            Select Plan
          </Button>
        </Box>

        {/* PLAN SELECTOR */}
        <Box
          sx={{
            position: "absolute",
            right: { xs: 4, sm: 10, md: 20 },
            top: { xs: 42, sm: 55, md: 78 },
            width: {
              xs: 108,
              sm: 145,
              md: 215,
            },
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: { xs: 0.6, sm: 0.85, md: 1 },
          }}
        >
          {plans.map((plan, index) => {
            const selected = index === currentIndex;

            return (
              <Box
                key={plan.id}
                onClick={() => selectPlan(index)}
                sx={{
                  width: "100%",
                  minHeight: {
                    xs: 52,
                    sm: 64,
                    md: 82,
                  },
                  flexShrink: 0,
                  borderRadius: "11px",
                  background: "rgba(255,255,255,.96)",
                  border: selected
                    ? "2px solid #08783F"
                    : "1px solid rgba(255,255,255,.65)",
                  boxShadow: selected
                    ? "0 6px 18px rgba(0,90,45,.28)"
                    : "0 5px 14px rgba(0,0,0,.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 0.55, sm: 0.8, md: 1 },
                  px: { xs: 0.6, sm: 0.8, md: 1 },
                  cursor: "pointer",
                  transition: "border-color .2s ease, box-shadow .2s ease",
                }}
              >
                <Box
                  sx={{
                    width: { xs: 28, sm: 36, md: 45 },
                    height: { xs: 28, sm: 36, md: 45 },
                    minWidth: { xs: 28, sm: 36, md: 45 },
                    borderRadius: "50%",
                    background: plan.badgeBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: plan.badgeColor,
                  }}
                >
                  {index === 0 && (
                    <StarIcon sx={{ fontSize: { xs: 15, md: 23 } }} />
                  )}

                  {index === 1 && (
                    <WorkspacePremiumIcon
                      sx={{ fontSize: { xs: 15, md: 23 } }}
                    />
                  )}

                  {index === 2 && (
                    <VerifiedUserIcon
                      sx={{ fontSize: { xs: 15, md: 23 } }}
                    />
                  )}
                </Box>

                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    sx={{
                      color: "#0E4D28",
                      fontSize: {
                        xs: ".57rem",
                        sm: ".67rem",
                        md: ".86rem",
                      },
                      fontWeight: 900,
                      lineHeight: 1.1,
                    }}
                  >
                    {plan.name}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.25,
                      color: "#858585",
                      fontSize: {
                        xs: ".4rem",
                        sm: ".47rem",
                        md: ".59rem",
                      },
                      lineHeight: 1.2,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    ₹{plan.price} / month
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* DOTS */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 7, md: 12 },
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            zIndex: 15,
          }}
        >
          {plans.map((plan, index) => (
            <Box
              key={plan.id}
              onClick={() => selectPlan(index)}
              sx={{
                width:
                  currentIndex === index
                    ? { xs: 22, md: 30 }
                    : { xs: 7, md: 8 },
                height: { xs: 5, md: 6 },
                borderRadius: 5,
                background:
                  currentIndex === index
                    ? "#fff"
                    : "rgba(255,255,255,.55)",
                cursor: "pointer",
                transition: "width .2s ease",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* SELECTED PLAN DETAILS */}
      <Box
        sx={{
          px: { xs: 1.5, sm: 2, md: 4 },
          py: { xs: 1.8, md: 3 },
          background: "#F7FAF7",
        }}
      >
        <Box
          sx={{
            maxWidth: 1000,
            mx: "auto",
            background: "#fff",
            borderRadius: { xs: 3, md: 4 },
            p: { xs: 2, sm: 2.5, md: 3 },
            boxShadow: "0 4px 18px rgba(0,0,0,.07)",
          }}
        >
          <Typography
            sx={{
              color: "#08783F",
              fontSize: { xs: ".62rem", sm: ".72rem", md: ".85rem" },
              fontWeight: 800,
              mb: 0.4,
            }}
          >
            {currentPlan.badge} • Garden Maintenance Plan
          </Typography>

          <Typography
            sx={{
              color: "#0E4D28",
              fontSize: { xs: "1.25rem", sm: "1.45rem", md: "1.9rem" },
              fontWeight: 900,
              lineHeight: 1.15,
            }}
          >
            {currentPlan.name}
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: "#4B5563",
              fontSize: { xs: ".76rem", sm: ".88rem", md: "1rem" },
              lineHeight: 1.6,
            }}
          >
            {currentPlan.description}
          </Typography>

          <Box
            sx={{
              mt: 1.6,
              display: "flex",
              alignItems: "baseline",
              gap: 0.7,
            }}
          >
            <Typography
              sx={{
                color: "#0E4D28",
                fontSize: { xs: "1.7rem", md: "2.1rem" },
                fontWeight: 900,
              }}
            >
              ₹{currentPlan.price}
            </Typography>

            <Typography
              sx={{
                color: "#6B7280",
                fontSize: { xs: ".7rem", md: ".85rem" },
              }}
            >
              / {currentPlan.duration}
            </Typography>
          </Box>

          <Typography
            sx={{
              mt: 0.5,
              color: "#16A34A",
              fontWeight: 800,
              fontSize: ".72rem",
            }}
          >
            ✓ GST Included • No Hidden Charges
          </Typography>

          <Box
            sx={{
              mt: 1.8,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: { xs: 1, sm: 1.2 },
            }}
          >
            {currentPlan.features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 0.8,
                }}
              >
                <CheckCircleIcon
                  sx={{
                    color: "#0E4D28",
                    fontSize: 17,
                    mt: "1px",
                    flexShrink: 0,
                  }}
                />

                <Typography
                  sx={{
                    color: "#4B5563",
                    fontSize: { xs: ".75rem", md: ".84rem" },
                    lineHeight: 1.4,
                  }}
                >
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>

          <Button
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={() => handleSelectPlan(currentPlan)}
            sx={{
              mt: 2,
              height: { xs: 42, md: 48 },
              borderRadius: 3,
              background: "#0E4D28",
              color: "#fff",
              fontSize: { xs: ".75rem", md: ".9rem" },
              fontWeight: 900,
              textTransform: "none",
              "&:hover": {
                background: "#08783F",
              },
            }}
          >
            Select {currentPlan.name}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
