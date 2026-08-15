import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import GrassRoundedIcon from "@mui/icons-material/GrassRounded";
import YardRoundedIcon from "@mui/icons-material/YardRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";       
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded"; 

import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // =========================================================
  // SERVICES DATA
  // ========================================================= 
 
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
        "Professional garden maintenance with planned visits, lawn care, pruning, trimming, cleaning and plant health management.",      
 
      description:
        "Keep your garden healthy, clean and beautiful throughout the year with professional garden maintenance. Our team takes care of lawn mowing, grass trimming, pruning, hedge shaping, weed removal, plant care, seasonal maintenance and regular garden cleaning. We follow a planned maintenance schedule according to your garden size, plant requirements and seasonal needs.",

      details:
        "Our garden maintenance service is designed for homes, offices, institutions, resorts and other outdoor spaces. Regular maintenance helps plants remain healthy, lawns stay neat and the entire garden look fresh throughout the year.",
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
        "Professional landscape design, lawn development, plantation, hardscape and complete garden makeover.", 

      description:
        "Transform your outdoor space with professional landscape development by Munder. We provide complete landscaping solutions including garden planning, lawn development, plantation, trees and shrubs, flower beds, hedges, pathways, decorative elements and complete garden makeovers. Our team combines practical planning with attractive design to create a green, functional and visually appealing landscape.",

      details:
        "Our landscape development service covers the complete journey from planning to execution. Whether you need a new garden, lawn development, plantation, garden makeover or improvement of an existing landscape, our team can develop a solution according to your space and requirements.",
    },

    {
      title: "Drip Irrigation", 

      shortTitle: "Drip Irrigation", 

      icon: <WaterDropRoundedIcon />,

      color: "#E3F2FD", 

      images: [
        "/images/services/munder irrigation 01.png",
        "/images/services/munder irrigation 02.png",
        "/images/services/munder irrigation 03.png", 
        "/images/services/munder irrigation 04.png",
      ],

      heroDescription:
        "Automatic irrigation systems for every garden with efficient water distribution and smart garden watering.",

      description: 
        "Save water and maintain your garden efficiently with a professionally designed drip irrigation system. Munder provides customized irrigation solutions for lawns, plants, hedges, trees and landscape areas. Our systems deliver water directly to the plant root zone, helping reduce water wastage and maintain consistent moisture. We also provide installation, system planning, testing and maintenance support.",

      details:
        "A properly designed drip irrigation system can make garden watering easier and more efficient. We plan the irrigation layout according to plant type, garden area and water requirements, followed by installation and testing to ensure proper water distribution.",    
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
// =========================================================
  // SELECT SERVICE 
  // =========================================================

  const selectService = (index) => {
    setCurrentServiceIndex(index);
    setCurrentImageIndex(0);
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

        {/* ===================================================
            ONLY MAIN IMAGE CHANGES 
            NOTHING ELSE IS INSIDE THIS IMAGE LAYER
        =================================================== */} 

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

          {/* DARK IMAGE OVERLAY */}

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


        {/* ===================================================
            LEFT CONTENT
            FIXED POSITION
        =================================================== */}

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

              background:
                "rgba(0,120,55,0.90)",

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
            ÃƒÂ°Ã…Â¸Ã…â€™Ã‚Â¿ Professional Gardening Services 
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
 
              letterSpacing:
                "-0.025em",

              whiteSpace:
                "pre-line", 

              textShadow:
                "0 2px 6px rgba(0,0,0,.45)",
            }}
          >
            {currentService.shortTitle}
          </Typography>

 
          {/* HERO DESCRIPTION */}

          <Typography
            sx={{
              mt: {
                xs: 0.6,
                md: 1,
              }, 
 
              color:
                "rgba(255,255,255,.96)", 

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

              display: 
                "-webkit-box", 

              WebkitLineClamp: {
                xs: 3,
                sm: 4,
                md: 4, 
              }, 

              WebkitBoxOrient:
                "vertical",

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
 
                boxShadow:
                  "0 2px 7px rgba(0,0,0,.20)",

                "& .MuiButton-endIcon": {
                  marginLeft: {
                    xs: 0.15, 
                    sm: 0.4,
                  }, 
                },

                "&:hover": {
                  background: 
                    "#F2FFF6",
                },
              }}
            >
              Book Free Visit
            </Button>

          </Box>

        </Box>


        {/* ===================================================
            FIXED SERVICE CARDS 

            IMPORTANT: 
            NO transform
            NO translateX 
            NO scale
            NO sliding animation

            Cards remain in exactly the same position.
        =================================================== */}

        <Box
          sx={{
            position: "absolute",

            right: { 
              xs: 4,
              sm: 10,
              md: 20,
            },

            top: {
              xs: 40,
              sm: 55, 
              md: 90,
            },

            width: {
              xs: 105,
              sm: 140,
              md: 205,
            },  

            zIndex: 10,
 
            display: "flex",
  
            flexDirection: "column",

            gap: {
              xs: 0.55,
              sm: 0.8,
              md: 1, 
            },
          }}  
        >

          {services.map((service, index) => {
            const selected =
              index === currentServiceIndex;

            return (
              <Box
                key={service.title} 
                onClick={() =>
                  selectService(index)
                }
                sx={{
                  position: "relative",
 
                  width: "100%",

                  minHeight: {
                    xs: 48,
                    sm: 58,
                    md: 78,
                  },

                  flexShrink: 0,

                  borderRadius: "11px", 

                  background: 
                    "rgba(255,255,255,.96)",  

                  border: selected
                    ? "2px solid #08783F"
                    : "1px solid rgba(255,255,255,.65)",

                  boxShadow: selected
                    ? "0 5px 16px rgba(0,90,45,.25)"
                    : "0 5px 14px rgba(0,0,0,.20)",

                  display: "flex",

                  alignItems: "center", 

                  gap: {
                    xs: 0.6, 
                    sm: 0.8,
                    md: 1,
                  },

                  px: {
                    xs: 0.6,  
                    sm: 0.8, 
                    md: 1,
                  },
 
                  cursor: "pointer",

                  /*
                    VERY IMPORTANT:
                    No transform here. 
                    Cards NEVER move.
                  */ 

                  transition: 
                    "border-color .2s ease, box-shadow .2s ease",

                  "&:hover": {
                  }, 
 
                  "&:active": {
                  }, 
                }}
              >

                {/* CARD ICON */}

                <Box
                  sx={{
                    width: {
                      xs: 28, 
                      sm: 34, 
                      md: 44,
                    },

                    height: {
                      xs: 28,
                      sm: 34, 
                      md: 44, 
                    },

                    minWidth: {
                      xs: 28,
                      sm: 34,
                      md: 44,
                    },

                    borderRadius: "50%",

                    background:
                      service.color, 

                    display: "flex",

                    alignItems:
                      "center", 

                    justifyContent:
                      "center",

                    color: "#08783F",
                  }}
                > 
                  {React.cloneElement(
                    service.icon, 
                    {
                      sx: {
                        fontSize: {
                          xs: 16,
                          sm: 19,
                          md: 24,
                        },
                      }, 
                    }
                  )} 
                </Box> 


                {/* CARD TEXT */}

                <Box
                  sx={{ 
                    minWidth: 0,
                    flex: 1,
                  }} 
                >
 
                  <Typography
                    sx={{ 
                      color:
                        "#0E4D28",

                      fontSize: { 
                        xs: "0.58rem",
                        sm: "0.67rem",
                        md: "0.85rem",
                      },

                      fontWeight: 800,
 
                      lineHeight: 1.1,
 
                      whiteSpace:
                        "pre-line", 
                    }}
                  >
                    {service.shortTitle}
                  </Typography> 

 
                  <Typography
                    sx={{
                      mt: 0.25,

                      color:
                        "#858585",

                      fontSize: {
                        xs: "0.39rem", 
                        sm: "0.46rem",
                        md: "0.58rem",
                      }, 

                      lineHeight: 1.2,

                      display:
                        "-webkit-box",

                      WebkitLineClamp: 2, 

                      WebkitBoxOrient:
                        "vertical",

                      overflow: "hidden", 
                    }}
                  >
                    {service.heroDescription} 
                  </Typography> 

                </Box>
 
              </Box>
            );
          })}

        </Box> 


        {/* ===================================================
            SLIDER DOTS
            FIXED POSITION
        =================================================== */}

        <Box
          sx={{
            position: "absolute",

            bottom: { 
              xs: 6, 
              md: 12, 
            },

            left: "50%",

            display: "flex",

            alignItems: "center",

            gap: 0.6, 

            zIndex: 15,
          }}
        >

          {services.map( 
            (service, index) => (
              <Box  
                key={service.title}

                onClick={() => 
                  selectService(index)
                }

                sx={{
                  width:
                    currentServiceIndex ===
                    index 
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
                    currentServiceIndex ===
                    index
                      ? "#FFFFFF"
                      : "rgba(255,255,255,.55)", 

                  cursor:
                    "pointer", 

                  transition: 
                    "width .2s ease",
                }}
              /> 
            )
          )}

        </Box>

      </Box> 

 
      {/* =====================================================
          SELECTED SERVICE DETAILS
      ===================================================== */} 

      <Box
        id="service-details"
        sx={{
          px: {
            xs: 1.5,
            sm: 2,
            md: 4,  
          },

          py: {
            xs: 1.8, 
            md: 3,
          },

          background: 
            "#F7FAF7",
        }}
      >

        <Box
          sx={{
            maxWidth: 1000,

            mx: "auto",

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

            boxShadow: 
              "0 4px 18px rgba(0,0,0,.07)",
          }}
        >

          {/* LABEL */}

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


          {/* TITLE */} 

          <Typography
            sx={{ 
              color: "#0E4D28",

              fontSize: {
                xs: "1.25rem",
                sm: "1.45rem",
                md: "1.9rem",
              },
 
              fontWeight: 800, 

              lineHeight: 1.15,
            }}
          > 
            {currentService.title} 
          </Typography> 


          {/* FULL DESCRIPTION */}

          <Typography
            sx={{
              mt: 1,

              color: "#4B5563",

              fontSize: {
                xs: "0.76rem",  
                sm: "0.88rem",
                md: "1rem",
              },

              lineHeight: 1.7,
            }}
          >
            {currentService.description}
          </Typography>


          {/* DETAILS */}

          <Typography 
            sx={{ 
              mt: 1.1,

              color: "#6B7280",

              fontSize: { 
                xs: "0.74rem",
                sm: "0.84rem", 
                md: "0.95rem",
              },
 
              lineHeight: 1.65, 
            }}
          > 
            {currentService.details} 
          </Typography>


          {/* BOOK FREE VISIT */}
 
          <Button
            fullWidth 

            onClick={() =>
              navigate("/visit", {
                state: {
                  service: currentService.title,
                },
              })
            }

            sx={{
              mt: 1.8,

              height: {
                xs: 40,  
                md: 48,
              }, 

              borderRadius: 3,

              background:
                "#0E4D28",

              color: "#FFFFFF",

              fontSize: {
                xs: "0.75rem", 
                md: "0.9rem",
              },

              fontWeight: 800,

              textTransform: "none",

              "&:hover": { 
                background:
                  "#08783F",
              },
            }}
          >
            Book Free Visit
          </Button>

        </Box>

      </Box>

    </Box> 
  );
}
