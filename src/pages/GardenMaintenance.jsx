import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import GrassRoundedIcon from "@mui/icons-material/GrassRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";

const maintenanceWork = [
  "Lawn mowing and grass cutting",
  "Plant pruning and shaping",
  "Hedge trimming and maintenance",
  "Weeding and unwanted plant removal",
  "Watering and irrigation checks",
  "Fertilizing and seasonal plant care",
  "Dry leaf and garden waste removal",
  "General garden cleaning",
  "Plant health observation",
  "Basic pest and plant-care attention",
];

const suitableFor = [
  {
    title: "Homes & Villas",
    description:
      "Regular garden care for residential lawns, plants, hedges and outdoor spaces.",
    icon: <HomeWorkRoundedIcon />,
  },
  {
    title: "Offices & Commercial Properties",
    description:
      "Scheduled maintenance to keep entrances, lawns and landscaped areas presentable.",
    icon: <BusinessRoundedIcon />,
  },
  {
    title: "Hotels, Resorts & Schools",
    description:
      "Planned garden maintenance for larger outdoor areas and regularly used landscapes.",
    icon: <ParkRoundedIcon />,
  },
];

const process = [
  {
    number: "01",
    title: "Site Visit",
    text: "We understand the garden size, plant types, lawn condition and maintenance requirements.",
  },
  {
    number: "02",
    title: "Maintenance Plan",
    text: "A suitable maintenance schedule is planned according to the property and garden condition.",
  },
  {
    number: "03",
    title: "Our Team",
    text: "Our gardening team carries out the required routine maintenance work at the property.",
  },
  {
    number: "04",
    title: "Ongoing Care",
    text: "Regular visits help keep the garden clean, healthy and properly maintained throughout the year.",
  },
];

const faqs = [
  {
    question: "What is included in garden maintenance?",
    answer:
      "Garden maintenance can include lawn mowing, grass cutting, pruning, hedge trimming, weeding, watering, fertilizing, seasonal plant care, dry leaf removal and general garden cleaning. The exact work depends on the condition and requirements of the garden.",
  },
  {
    question: "Does MUNDER provide garden maintenance in Bhopal?",
    answer:
      "Yes. MUNDER provides garden maintenance services in Bhopal for homes, villas, offices, resorts, hotels, schools and other properties, subject to service availability in the required area.",
  },
  {
    question: "Can maintenance be scheduled regularly?",
    answer:
      "Yes. Garden maintenance can be planned as a recurring service according to the garden size, plant types, lawn condition and requirements of the property.",
  },
  {
    question: "Can MUNDER maintain an existing garden?",
    answer:
      "Yes. Existing gardens can be assessed and maintained. The maintenance plan can be adjusted according to the current condition of the lawn, plants, hedges and other landscape elements.",
  },
];

export default function GardenMaintenance() {
  const navigate = useNavigate();

  const handleVisit = () => {
    navigate("/visit", {
      state: {
        service: "Garden Maintenance",
      },
    });
  };

  return (
    <>
      <SEO
        title="Garden Maintenance in Bhopal | MUNDER"
        description="MUNDER provides professional garden maintenance services in Bhopal for homes, villas, offices, resorts, hotels and schools. Lawn mowing, pruning, hedge trimming, weeding, watering and regular garden care."
        keywords="garden maintenance Bhopal, garden maintenance services Bhopal, gardening services Bhopal, lawn maintenance Bhopal, gardener service Bhopal, garden care Bhopal, MUNDER"
        url="https://munder.in/garden-maintenance-bhopal"
      />

      <Helmet>
        <meta
          property="og:title"
          content="Garden Maintenance in Bhopal | MUNDER"
        />
        <meta
          property="og:description"
          content="Professional garden maintenance services in Bhopal by MUNDER for homes, villas, offices, resorts, hotels and schools."
        />
        <meta
          property="og:url"
          content="https://munder.in/garden-maintenance-bhopal"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Garden Maintenance",
            serviceType: "Garden Maintenance",
            url: "https://munder.in/garden-maintenance-bhopal",
            description:
              "Professional garden maintenance services in Bhopal including lawn mowing, pruning, hedge trimming, weeding, watering, fertilizing, seasonal plant care and garden cleaning.",
            provider: {
              "@type": "LocalBusiness",
              name: "MUNDER",
              url: "https://munder.in/",
            },
            areaServed: {
              "@type": "City",
              name: "Bhopal",
            },
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      <Box sx={{ background: "#F7FBF7", minHeight: "100vh" }}>
        {/* HERO */}
        <Box
          sx={{
            position: "relative",
            minHeight: { xs: 430, sm: 500, md: 570 },
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            backgroundImage:
              "linear-gradient(90deg, rgba(8,45,27,0.92) 0%, rgba(8,45,27,0.78) 45%, rgba(8,45,27,0.30) 100%), url('/images/services/munder maintenance 01.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                maxWidth: 760,
                py: { xs: 6, md: 9 },
                color: "#FFFFFF",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "0.72rem", sm: "0.82rem" },
                  fontWeight: 800,
                  letterSpacing: 1.8,
                  textTransform: "uppercase",
                  color: "#BFE8C9",
                  mb: 1.2,
                }}
              >
                Professional MUNDER Service
              </Typography>

              <Typography
                component="h1"
                sx={{
                  fontSize: {
                    xs: "2.35rem",
                    sm: "3.2rem",
                    md: "4.25rem",
                  },
                  fontWeight: 850,
                  lineHeight: 1.04,
                  letterSpacing: "-0.035em",
                  mb: 1.8,
                }}
              >
                Garden Maintenance
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    color: "#B9E59E",
                  }}
                >
                  in Bhopal
                </Box>
              </Typography>

              <Typography
                sx={{
                  maxWidth: 650,
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.88)",
                  mb: 3,
                }}
              >
                Regular garden care to keep lawns, plants, hedges and outdoor
                spaces clean, healthy and well maintained throughout the year.
              </Typography>

              <Button
                onClick={handleVisit}
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  minHeight: 52,
                  px: 3,
                  borderRadius: 3,
                  background: "#B9E59E",
                  color: "#103F28",
                  fontWeight: 850,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
                  "&:hover": {
                    background: "#D0F0BE",
                  },
                }}
              >
                Book a Garden Visit
              </Button>
            </Box>
          </Container>
        </Box>

        {/* INTRO */}
        <Container maxWidth="lg">
          <Box
            sx={{
              py: { xs: 5, md: 8 },
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
              gap: { xs: 3, md: 6 },
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#08783F",
                  fontSize: "0.75rem",
                  fontWeight: 850,
                  letterSpacing: 1.4,
                  textTransform: "uppercase",
                  mb: 0.8,
                }}
              >
                Garden Care by MUNDER
              </Typography>

              <Typography
                component="h2"
                sx={{
                  color: "#103F28",
                  fontSize: { xs: "1.9rem", md: "2.65rem" },
                  fontWeight: 850,
                  lineHeight: 1.15,
                  mb: 1.6,
                }}
              >
                Keep your garden healthy, clean and maintained.
              </Typography>

              <Typography
                sx={{
                  color: "#52655D",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  lineHeight: 1.75,
                  mb: 1.5,
                }}
              >
                MUNDER provides regular garden maintenance services for homes,
                villas, offices, resorts, hotels, schools and other properties
                in Bhopal. Our team takes care of the routine work required to
                keep the garden looking clean and healthy.
              </Typography>

              <Typography
                sx={{
                  color: "#52655D",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  lineHeight: 1.75,
                }}
              >
                The maintenance schedule can be planned according to the size
                of the garden, type of plants, lawn condition and requirements
                of the property.
              </Typography>
            </Box>

            <Box
              sx={{
                borderRadius: { xs: 3, md: 4 },
                overflow: "hidden",
                boxShadow: "0 15px 40px rgba(20,70,40,0.14)",
              }}
            >
              <Box
                component="img"
                src="/images/services/munder maintenance 02.png"
                alt="MUNDER garden maintenance service in Bhopal"
                sx={{
                  display: "block",
                  width: "100%",
                  height: { xs: 270, md: 390 },
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Container>

        {/* WHAT WE DO */}
        <Box
          sx={{
            py: { xs: 5, md: 8 },
            background:
              "linear-gradient(180deg, #EEF7EE 0%, #F7FBF7 100%)",
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ maxWidth: 720, mb: 4 }}>
              <Typography
                sx={{
                  color: "#08783F",
                  fontSize: "0.75rem",
                  fontWeight: 850,
                  letterSpacing: 1.4,
                  textTransform: "uppercase",
                  mb: 0.7,
                }}
              >
                Maintenance Services
              </Typography>

              <Typography
                component="h2"
                sx={{
                  color: "#103F28",
                  fontSize: { xs: "1.85rem", md: "2.55rem" },
                  fontWeight: 850,
                  lineHeight: 1.15,
                  mb: 1,
                }}
              >
                What our garden maintenance includes
              </Typography>

              <Typography
                sx={{
                  color: "#60736A",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                }}
              >
                Routine garden work is planned according to the actual needs
                of your outdoor space.
              </Typography>
            </Box>

            <Grid container spacing={1.5}>
              {maintenanceWork.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      p: 1.6,
                      borderRadius: 2.5,
                      background: "#FFFFFF",
                      border: "1px solid rgba(27,107,58,0.09)",
                      boxShadow: "0 5px 18px rgba(20,70,40,0.05)",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        flexShrink: 0,
                        color: "#198754",
                        fontSize: 24,
                      }}
                    />

                    <Typography
                      sx={{
                        color: "#294B38",
                        fontSize: "0.92rem",
                        lineHeight: 1.45,
                        fontWeight: 650,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* SUITABLE FOR */}
        <Container maxWidth="lg">
          <Box sx={{ py: { xs: 5, md: 8 } }}>
            <Box sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: 4 }}>
              <Typography
                sx={{
                  color: "#08783F",
                  fontSize: "0.75rem",
                  fontWeight: 850,
                  letterSpacing: 1.4,
                  textTransform: "uppercase",
                  mb: 0.7,
                }}
              >
                Suitable For
              </Typography>

              <Typography
                component="h2"
                sx={{
                  color: "#103F28",
                  fontSize: { xs: "1.85rem", md: "2.55rem" },
                  fontWeight: 850,
                  lineHeight: 1.15,
                }}
              >
                Garden maintenance for different properties
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {suitableFor.map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box
                    sx={{
                      height: "100%",
                      p: { xs: 2.3, md: 2.7 },
                      borderRadius: 3,
                      background: "#FFFFFF",
                      border: "1px solid #DDE8E0",
                      boxShadow: "0 7px 24px rgba(20,70,40,0.07)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#E7F4D2",
                        color: "#1B6B3A",
                        mb: 1.7,
                      }}
                    >
                      {React.cloneElement(item.icon, {
                        sx: { fontSize: 27 },
                      })}
                    </Box>

                    <Typography
                      component="h3"
                      sx={{
                        color: "#103F28",
                        fontSize: "1.15rem",
                        fontWeight: 800,
                        mb: 0.8,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#60736A",
                        fontSize: "0.9rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>

        {/* PROCESS */}
        <Box sx={{ background: "#123D25", color: "#FFFFFF" }}>
          <Container maxWidth="lg">
            <Box sx={{ py: { xs: 5, md: 8 } }}>
              <Box sx={{ maxWidth: 700, mb: 4 }}>
                <Typography
                  sx={{
                    color: "#B9E59E",
                    fontSize: "0.75rem",
                    fontWeight: 850,
                    letterSpacing: 1.4,
                    textTransform: "uppercase",
                    mb: 0.7,
                  }}
                >
                  How It Works
                </Typography>

                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: "1.85rem", md: "2.55rem" },
                    fontWeight: 850,
                    lineHeight: 1.15,
                    mb: 1,
                  }}
                >
                  A practical approach to garden care
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.72)",
                    lineHeight: 1.7,
                  }}
                >
                  MUNDER plans garden maintenance according to the property,
                  garden condition and ongoing care requirements.
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {process.map((item) => (
                  <Grid item xs={12} sm={6} md={3} key={item.number}>
                    <Box
                      sx={{
                        height: "100%",
                        p: 2.3,
                        borderRadius: 3,
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#B9E59E",
                          fontWeight: 900,
                          fontSize: "0.82rem",
                          letterSpacing: 1,
                          mb: 1.5,
                        }}
                      >
                        {item.number}
                      </Typography>

                      <Typography
                        component="h3"
                        sx={{
                          fontSize: "1.08rem",
                          fontWeight: 800,
                          mb: 0.8,
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.72)",
                          fontSize: "0.88rem",
                          lineHeight: 1.65,
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* LOCAL CTA */}
        <Container maxWidth="lg">
          <Box
            sx={{
              py: { xs: 5, md: 7 },
            }}
          >
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: { xs: 3, md: 4 },
                p: { xs: 2.5, sm: 4, md: 5 },
                background:
                  "linear-gradient(135deg, #E8F5E9 0%, #DDF1D7 100%)",
                border: "1px solid #CFE3D0",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.35)",
                  right: -90,
                  top: -100,
                }}
              />

              <Box sx={{ position: "relative", maxWidth: 760 }}>
                <Typography
                  sx={{
                    color: "#08783F",
                    fontSize: "0.75rem",
                    fontWeight: 850,
                    letterSpacing: 1.3,
                    textTransform: "uppercase",
                    mb: 0.8,
                  }}
                >
                  Garden Maintenance in Bhopal
                </Typography>

                <Typography
                  component="h2"
                  sx={{
                    color: "#103F28",
                    fontSize: { xs: "1.7rem", md: "2.35rem" },
                    fontWeight: 850,
                    lineHeight: 1.15,
                    mb: 1,
                  }}
                >
                  Want your garden maintained regularly?
                </Typography>

                <Typography
                  sx={{
                    color: "#52655D",
                    fontSize: "0.98rem",
                    lineHeight: 1.7,
                    mb: 2.3,
                  }}
                >
                  Tell us about your garden and property. MUNDER can assess
                  the requirements and plan the appropriate maintenance
                  service.
                </Typography>

                <Button
                  onClick={handleVisit}
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{
                    minHeight: 50,
                    px: 2.5,
                    borderRadius: 2.5,
                    background: "#116B3A",
                    color: "#FFFFFF",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    boxShadow: "0 8px 20px rgba(17,107,58,0.20)",
                    "&:hover": {
                      background: "#0D5B31",
                    },
                  }}
                >
                  Book a Garden Visit
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>

        {/* FAQ */}
        <Box sx={{ background: "#F1F7F1" }}>
          <Container maxWidth="md">
            <Box sx={{ py: { xs: 5, md: 7 } }}>
              <Box sx={{ textAlign: "center", mb: 3.5 }}>
                <Typography
                  sx={{
                    color: "#08783F",
                    fontSize: "0.75rem",
                    fontWeight: 850,
                    letterSpacing: 1.3,
                    textTransform: "uppercase",
                    mb: 0.7,
                  }}
                >
                  FAQ
                </Typography>

                <Typography
                  component="h2"
                  sx={{
                    color: "#103F28",
                    fontSize: { xs: "1.8rem", md: "2.4rem" },
                    fontWeight: 850,
                    lineHeight: 1.15,
                  }}
                >
                  Garden maintenance questions
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {faqs.map((faq) => (
                  <Box
                    key={faq.question}
                    sx={{
                      p: { xs: 1.8, md: 2.3 },
                      borderRadius: 2.5,
                      background: "#FFFFFF",
                      border: "1px solid #DDE8E0",
                    }}
                  >
                    <Typography
                      component="h3"
                      sx={{
                        color: "#103F28",
                        fontWeight: 800,
                        fontSize: "1rem",
                        mb: 0.7,
                      }}
                    >
                      {faq.question}
                    </Typography>

                    <Typography
                      sx={{
                        color: "#60736A",
                        fontSize: "0.9rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}
