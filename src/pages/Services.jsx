import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import GrassRoundedIcon from "@mui/icons-material/GrassRounded";
import YardRoundedIcon from "@mui/icons-material/YardRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import PoolRoundedIcon from "@mui/icons-material/PoolRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedServiceIndex, setExpandedServiceIndex] = useState(null);

  const services = [
    {
      title: "Garden Maintenance",
      shortTitle: "Garden\nMaintenance",
      icon: <GrassRoundedIcon />,
      color: "#E8F5E9",

      images: [
        "/images/services/munder maintenance 01.png",
        "/images/services/munder maintenance 02.png",
      ],

      heroDescription:
        "Regular care to keep your garden clean, healthy and looking good throughout the year.",

      description:
        "Munder provides regular garden maintenance services for homes, villas, offices, resorts, hotels, schools and other properties. Our team takes care of the everyday work needed to keep the garden healthy, clean and well maintained.",

      details:
        "Our maintenance work includes lawn mowing, grass cutting, plant pruning, hedge trimming, weeding, watering, fertilizing, seasonal plant care, removal of dry leaves and general garden cleaning. We also keep an eye on the condition of plants and grass so that problems such as dryness, pests or poor growth can be noticed and taken care of on time. The maintenance schedule can be planned according to the size of the garden, type of plants and requirements of the property.",
    },

    {
      title: "Landscape Development",
      shortTitle: "Landscape\nDevelopment",
      icon: <YardRoundedIcon />,
      color: "#FFF3E0",

      images: [
        "/images/services/munder devlopment 01.png",
        "/images/services/munder devlopment 02.png",
        "/images/services/munder devlopment 03.png",
      ],

      heroDescription:
        "Complete garden development and landscaping according to your space, property and requirements.",

      description:
        "Munder provides complete garden development services for homes, villas, resorts, hotels, schools, offices and other properties. We work with the available space and develop the garden according to the site conditions, property and requirements of the client.",

      details:
        "Our garden development work includes site planning, lawn development, plantation, trees and shrubs, flowering plants, hedges, ground covers, pathways, garden borders and other landscape elements. We carefully plan the placement of plants and open areas so that the garden looks balanced and remains practical to maintain. From developing a new garden on an empty site to improving and redesigning an existing garden, Munder handles the work from planning to plantation and finishing.",
    },

    {
      title: "Irrigation",
      shortTitle: "Irrigation",
      icon: <WaterDropRoundedIcon />,
      color: "#E3F2FD",

      images: [
        "/images/services/munder irrigation 01.png",
        "/images/services/munder irrigation 02.png",
        "/images/services/munder irrigation 03.png",
        "/images/services/munder irrigation 04.png",
      ],

      heroDescription:
        "Properly planned irrigation systems for lawns, plants, gardens and landscaped areas.",

      description:
        "Munder provides irrigation solutions for gardens, lawns, landscapes and other outdoor areas where regular and controlled watering is required. We plan and install irrigation systems according to the size of the garden, plant requirements, water availability and site conditions.",

      details:
        "Our work includes drip irrigation, sprinkler systems, lawn irrigation, underground pipelines, water distribution, valves, pumps and irrigation controllers. We design the system so that water reaches the required areas properly without unnecessary wastage. Whether it is a new garden or an existing landscape, we can install a suitable irrigation system and make the necessary changes to improve water distribution.",
    },

    {
      title: "Swimming Pool Construction",
      shortTitle: "Swimming Pool\nConstruction",
      icon: <PoolRoundedIcon />,
      color: "#E0F7FA",

      images: [
        "/images/services/pool01.png",
        "/images/services/pool02.png",
        "/images/services/pool03.png",
        "/images/services/pool04.png",
        "/images/services/pool05.png",
        "/images/services/pool06.png",
      ],

      heroDescription:
        "Swimming pool construction for homes, resorts, hotels and other residential and commercial properties.",

      description:
        "Munder provides swimming pool construction services for homes, resorts, hotels and commercial properties. We work according to the available space, site conditions and requirements of the property, from the initial planning of the pool to the final finishing work.",

      details:
        "Our swimming pool construction work includes pool layout and design, excavation and civil work, RCC structure, waterproofing, plumbing, filtration system installation, tiling and final finishing. We pay attention to proper levels, water circulation, drainage and construction quality so that the pool is strong, functional and practical to maintain. We can also work with an existing site plan and available space to create a pool that fits naturally with the surrounding landscape and property.",
    },
  ];

  const currentService = services[currentServiceIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((previous) => {
        return (previous + 1) % currentService.images.length;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentServiceIndex, currentService.images.length]);

  // Hero slider selection only.
  // It does NOT open service details.
  const selectService = (index) => {
    setCurrentServiceIndex(index);
    setCurrentImageIndex(0);
    setExpandedServiceIndex(null);
  };

  // Service card click.
  // Same card closes; another card opens.
  const toggleServiceDetails = (index) => {
    setCurrentServiceIndex(index);
    setCurrentImageIndex(0);

    setExpandedServiceIndex((previous) =>
      previous === index ? null : index
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "#F7FAF7",
      }}
    >
      {/* =====================================================
          SERVICE HERO
      ===================================================== */}

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {
            xs: 245,
            sm: 300,
            md: 430,
          },
          overflow: "hidden",
          background: "#123D25",
        }}
      >
        {/* IMAGE */}

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <Box
            key={currentService.images[currentImageIndex]}
            component="img"
            src={currentService.images[currentImageIndex]}
            alt={currentService.title}
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              animation: "serviceImageSlide 0.6s ease",

              "@keyframes serviceImageSlide": {
                from: {
                  opacity: 0.35,
                  transform: "translateX(18px) scale(1.01)",
                },
                to: {
                  opacity: 1,
                  transform: "translateX(0) scale(1)",
                },
              },
            }}
          />

          {/* DARK OVERLAY */}

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `
                linear-gradient(
                  90deg,
                  rgba(0,0,0,0.68) 0%,
                  rgba(0,0,0,0.48) 35%,
                  rgba(0,0,0,0.20) 68%,
                  rgba(0,0,0,0.18) 100%
                )
              `,
            }}
          />
        </Box>

        {/* HERO CONTENT */}

        <Box
          sx={{
            position: "absolute",
            left: {
              xs: 16,
              sm: 24,
              md: 45,
            },
            top: {
              xs: 72,
              sm: 90,
              md: 130,
            },
            width: {
              xs: "57%",
              sm: "52%",
              md: "48%",
            },
            zIndex: 5,
          }}
        >
          {/* LABEL */}

          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 0.8,
              py: 0.25,
              mb: {
                xs: 0.7,
                md: 1,
              },
              borderRadius: 1,
              background: "rgba(0,120,55,0.90)",
              color: "#FFFFFF",
              fontSize: {
                xs: "0.46rem",
                sm: "0.58rem",
                md: "0.72rem",
              },
              fontWeight: 700,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
            }}
          >
            Professional Gardening Services
          </Box>

          {/* TITLE */}

          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: {
                xs: "1.35rem",
                sm: "1.75rem",
                md: "3rem",
              },
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              whiteSpace: "pre-line",
              textShadow: "0 2px 6px rgba(0,0,0,.45)",
            }}
          >
            {currentService.shortTitle}
          </Typography>

          {/* DESCRIPTION */}

          <Typography
            sx={{
              mt: {
                xs: 0.6,
                md: 1,
              },
              color: "rgba(255,255,255,.96)",
              fontSize: {
                xs: "0.53rem",
                sm: "0.65rem",
                md: "0.9rem",
              },
              lineHeight: 1.4,
              maxWidth: {
                xs: 190,
                sm: 260,
                md: 430,
              },
              display: "-webkit-box",
              WebkitLineClamp: {
                xs: 3,
                sm: 4,
                md: 4,
              },
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {currentService.heroDescription}
          </Typography>

          {/* BOOK FREE VISIT */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: {
                xs: 1,
                sm: 1.4,
              },
            }}
          >
            <Button
              onClick={() =>
                navigate("/visit", {
                  state: {
                    service: currentService.title,
                  },
                })
              }
              endIcon={
                <ArrowForwardRoundedIcon
                  sx={{
                    fontSize: {
                      xs: 12,
                      sm: 15,
                      md: 18,
                    },
                  }}
                />
              }
              sx={{
                minWidth: 0,
                height: {
                  xs: 27,
                  sm: 32,
                  md: 40,
                },
                px: {
                  xs: 1.2,
                  sm: 1.6,
                  md: 2,
                },
                borderRadius: 5,
                background: "#FFFFFF",
                color: "#08783F",
                fontSize: {
                  xs: "0.48rem",
                  sm: "0.58rem",
                  md: "0.75rem",
                },
                fontWeight: 800,
                textTransform: "none",
                whiteSpace: "nowrap",
                boxShadow: "0 2px 7px rgba(0,0,0,.20)",

                "& .MuiButton-endIcon": {
                  marginLeft: {
                    xs: 0.15,
                    sm: 0.4,
                  },
                },

                "&:hover": {
                  background: "#F2FFF6",
                },
              }}
            >
              Book Free Visit
            </Button>
          </Box>
        </Box>

        {/* HERO SLIDER DOTS */}

        <Box
          sx={{
            position: "absolute",
            bottom: {
              xs: 6,
              md: 12,
            },
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            zIndex: 15,
          }}
        >
          {services.map((service, index) => (
            <Box
              key={service.title}
              onClick={() => selectService(index)}
              sx={{
                width:
                  currentServiceIndex === index
                    ? {
                        xs: 22,
                        md: 30,
                      }
                    : {
                        xs: 7,
                        md: 8,
                      },

                height: {
                  xs: 5,
                  md: 6,
                },

                borderRadius: 5,

                background:
                  currentServiceIndex === index
                    ? "#FFFFFF"
                    : "rgba(255,255,255,.55)",

                cursor: "pointer",
                transition: "width .2s ease",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* =====================================================
          DESKTOP SERVICE CARDS
      ===================================================== */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: "100%",
          background: "linear-gradient(180deg, #F7FBF7 0%, #F2F8F2 100%)",
          px: { md: 4, lg: 5 },
          py: { md: 3, lg: 4 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1400,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: { md: 2, lg: 2.5 },
          }}
        >
          {services.map((service, index) => {
            const expanded = expandedServiceIndex === index;
            const accent =
              index === 0
                ? "#176B3A"
                : index === 1
                ? "#3E7D3A"
                : index === 2
                ? "#2489A6"
                : "#2497A8";
            const iconBg =
              index === 0
                ? "#E7F4D2"
                : index === 1
                ? "#F2F2DF"
                : index === 2
                ? "#E3F3FA"
                : "#E1F5F5";

            return (
              <Box
                key={service.title}
                onClick={() => toggleServiceDetails(index)}
                sx={{
                  minWidth: 0,
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "#FFFFFF",
                  borderRadius: 4,
                  border: expanded
                    ? `2px solid ${accent}`
                    : "1px solid #DCE9DF",
                  boxShadow: expanded
                    ? "0 12px 30px rgba(20,80,45,0.14)"
                    : "0 7px 20px rgba(20,70,40,0.07)",
                  transition:
                    "transform .22s ease, box-shadow .22s ease, border-color .22s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: accent,
                    boxShadow: "0 12px 28px rgba(20,80,45,0.13)",
                  },
                }}
              >
                {/* SERVICE IMAGE */}
                <Box
                  component="img"
                  src={service.images[0]}
                  alt={service.title}
                  sx={{
                    width: "100%",
                    height: { md: 155, lg: 175 },
                    display: "block",
                    objectFit: "cover",
                  }}
                />

                {/* CARD CONTENT */}
                <Box sx={{ p: { md: 2, lg: 2.25 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                      mb: 1.25,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        minWidth: 48,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: iconBg,
                      }}
                    >
                      {React.cloneElement(service.icon, {
                        sx: {
                          fontSize: 27,
                          color: accent,
                        },
                      })}
                    </Box>

                    <Typography
                      sx={{
                        color: "#103F28",
                        fontSize: { md: "1rem", lg: "1.08rem" },
                        fontWeight: 800,
                        lineHeight: 1.18,
                      }}
                    >
                      {service.title}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      color: "#60736A",
                      fontSize: { md: "0.82rem", lg: "0.88rem" },
                      lineHeight: 1.5,
                      minHeight: { md: 58, lg: 64 },
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {service.heroDescription}
                  </Typography>

                  <Button
                    fullWidth
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleServiceDetails(index);
                    }}
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      mt: 1.5,
                      minHeight: 42,
                      borderRadius: 2.5,
                      background: expanded ? "#0D5B31" : "#116B3A",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      fontSize: { md: "0.82rem", lg: "0.88rem" },
                      textTransform: "none",
                      boxShadow: "0 6px 16px rgba(17,107,58,0.18)",
                      "&:hover": {
                        background: "#0D5B31",
                      },
                    }}
                  >
                    {expanded ? "Close Service" : "View Service"}
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* MOBILE SERVICE CARDS + INLINE DETAILS */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          px: 1.5,
          py: 2.5,
          background:
            "linear-gradient(180deg, #F7FBF7 0%, #F2F8F2 100%)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {services.map((service, index) => {
            const expanded = index === expandedServiceIndex;
            const accent =
              index === 0
                ? "#1B6B3A"
                : index === 1
                ? "#3E7D3A"
                : index === 2
                ? "#2489A6"
                : "#2497A8";
            const iconBg =
              index === 0
                ? "#E7F4D2"
                : index === 1
                ? "#F2F2DF"
                : index === 2
                ? "#E3F3FA"
                : "#E1F5F5";

            return (
              <Box
                key={service.title}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  background: "#FFFFFF",
                  border: expanded
                    ? "1.5px solid rgba(27,107,58,0.24)"
                    : "1px solid rgba(27,107,58,0.10)",
                  boxShadow: expanded
                    ? "0 10px 28px rgba(20,70,40,0.12)"
                    : "0 5px 18px rgba(20,70,40,0.07)",
                  transition: "all 0.25s ease",
                }}
              >
                {/* MOBILE SERVICE CARD */}
                <Box
                  onClick={() => toggleServiceDetails(index)}
                  sx={{
                    position: "relative",
                    width: "100%",
                    minHeight: 96,
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.4,
                    px: 1.25,
                    py: 1.25,
                    cursor: "pointer",
                    background: expanded
                      ? "linear-gradient(135deg, #F0F8E8 0%, #FFFFFF 72%)"
                      : "#FFFFFF",
                  }}
                >
                  {/* ICON */}
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      minWidth: 52,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: iconBg,
                    }}
                  >
                    {service.icon &&
                      React.cloneElement(service.icon, {
                        sx: {
                          fontSize: 28,
                          color: accent,
                        },
                      })}
                  </Box>

                  {/* TEXT */}
                  <Box sx={{ flex: 1, minWidth: 0, pr: 0.5 }}>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        color: "#103F28",
                      }}
                    >
                      {service.title}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.45,
                        fontSize: "0.77rem",
                        lineHeight: 1.42,
                        color: "#60736A",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {service.heroDescription}
                    </Typography>
                  </Box>

                  {/* SERVICE IMAGE */}
                  <Box
                    component="img"
                    src={service.images[0]}
                    alt={service.title}
                    sx={{
                      width: 82,
                      height: 64,
                      minWidth: 82,
                      objectFit: "cover",
                      borderRadius: "18px",
                      display: { xs: "block", sm: "block" },
                      boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                    }}
                  />

                  {/* ARROW */}
                  <Box
                    sx={{
                      width: 28,
                      minWidth: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: accent,
                      transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <ArrowForwardRoundedIcon sx={{ fontSize: 22 }} />
                  </Box>
                </Box>

                {/* INLINE MOBILE DETAILS */}
                {expanded && (
                  <Box
                    sx={{
                      px: 1.5,
                      pb: 1.5,
                      background: "#FFFFFF",
                    }}
                  >
                    <Box
                      sx={{
                        height: 1,
                        background: "rgba(27,107,58,0.10)",
                        mb: 1.5,
                      }}
                    />

                    <Box
                      component="img"
                      src={service.images[0]}
                      alt={service.title}
                      sx={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 2.5,
                        display: "block",
                        mb: 1.5,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        letterSpacing: 1.1,
                        textTransform: "uppercase",
                        color: accent,
                        mb: 0.45,
                      }}
                    >
                      Professional Munder Service
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1.22rem",
                        fontWeight: 850,
                        lineHeight: 1.2,
                        color: "#103F28",
                        mb: 0.7,
                      }}
                    >
                      {service.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "0.88rem",
                        lineHeight: 1.6,
                        color: "#52655D",
                        mb: 1.1,
                      }}
                    >
                      {service.description}
                    </Typography>

                    <Box
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 2.5,
                        background: "#F8FBF7",
                        border: "1px solid rgba(27,107,58,0.08)",
                        p: 1.25,
                        mb: 1.4,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.86rem",
                          lineHeight: 1.65,
                          color: "#4C5F57",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {service.details}
                      </Typography>
                    </Box>

                    <Button
                      fullWidth
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate("/visit", {
                          state: {
                            service: service.title,
                          },
                        });
                      }}
                      endIcon={<ArrowForwardRoundedIcon />}
                      sx={{
                        minHeight: 48,
                        borderRadius: 2.5,
                        background: "#116B3A",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        fontSize: "0.95rem",
                        textTransform: "none",
                        boxShadow: "0 7px 18px rgba(17,107,58,0.22)",
                        "&:hover": {
                          background: "#0D5B31",
                        },
                      }}
                    >
                      Book Free Visit
                    </Button>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
      {/* SELECTED SERVICE DETAILS */}
        {expandedServiceIndex !== null && (
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: "100%",
              maxWidth: 1200,
              mx: "auto",
              mt: { xs: 1.5, sm: 2, md: 2.5 },
              boxSizing: "border-box",

              background: "#FFFFFF",

              borderRadius: {
                xs: 3,
                md: 4,
              },

              p: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },

              border: "1px solid #DDE8E0",
              borderTop: "3px solid #006b38",

              boxShadow: "0 4px 18px rgba(0,0,0,.07)",
            }}
          >
            <Typography
              sx={{
                color: "#08783F",
                fontSize: {
                  xs: "0.62rem",
                  sm: "0.72rem",
                  md: "0.85rem",
                },
                fontWeight: 700,
                mb: 0.4,
              }}
            >
              Professional Munder Service
            </Typography>

            <Typography
              sx={{
                color: "#0E4D28",
                fontSize: {
                  xs: "1.15rem",
                  sm: "1.35rem",
                  md: "1.5rem",
                },
                fontWeight: 800,
                lineHeight: 1.25,
                mb: 1.2,
              }}
            >
              {services[expandedServiceIndex].title}
            </Typography>

            <Typography
              sx={{
                color: "#374151",
                fontSize: {
                  xs: "0.88rem",
                  sm: "0.95rem",
                  md: "1rem",
                },
                lineHeight: 1.65,
                mb: 1.2,
              }}
            >
              {services[expandedServiceIndex].description}
            </Typography>

            <Typography
              sx={{
                color: "#4B5563",
                fontSize: {
                  xs: "0.84rem",
                  sm: "0.92rem",
                  md: "0.98rem",
                },
                lineHeight: 1.7,
              }}
            >
              {services[expandedServiceIndex].details}
            </Typography>

            <Button
              fullWidth
              onClick={(event) => {
                event.stopPropagation();

                navigate("/visit", {
                  state: {
                    service:
                      services[expandedServiceIndex].title,
                  },
                });
              }}
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                mt: 2.2,
                minHeight: 48,
                borderRadius: 2.5,
                background: "#006b38",
                color: "#FFFFFF",
                fontWeight: 800,
                textTransform: "none",

                "&:hover": {
                  background: "#00552D",
                },
              }}
            >
              Book Free Visit
            </Button>
          </Box>
        )}
    </Box>
  );
}





