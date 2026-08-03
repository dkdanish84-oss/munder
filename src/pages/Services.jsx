import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Chip
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import GrassRoundedIcon from "@mui/icons-material/GrassRounded";
import YardRoundedIcon from "@mui/icons-material/YardRounded";
import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import LocalFloristRoundedIcon from "@mui/icons-material/LocalFloristRounded";
import PestControlRoundedIcon from "@mui/icons-material/PestControlRounded";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Garden Maintenance",
      icon: <GrassRoundedIcon sx={{ fontSize: 40 }} />,
      price: "Starting ₹999",
      rating: "4.9",
      desc: "Monthly maintenance, pruning, lawn care and plant health.",
      color: "#E8F5E9"
    },
    {
      title: "Landscape Development",
      icon: <YardRoundedIcon sx={{ fontSize: 40 }} />,
      price: "Starting ₹4999",
      rating: "4.8",
      desc: "Landscape design, lawn setup and complete garden makeover.",
      color: "#FFF3E0"
    },
    {
      title: "Drip Irrigation",
      icon: <WaterDropRoundedIcon sx={{ fontSize: 40 }} />,
      price: "Starting ₹1999",
      rating: "4.8",
      desc: "Automatic irrigation systems for every garden.",
      color: "#E3F2FD"
    }
  ];

  const extras = [
    {
      title: "Tree Plantation",
      icon: <ParkRoundedIcon color="success" />
    },
    {
      title: "Seasonal Flowers",
      icon: <LocalFloristRoundedIcon color="error" />
    },
    {
      title: "Pest Control",
      icon: <PestControlRoundedIcon color="warning" />
    }
  ];

  return (
    <Box
      sx={{
        background: "#F7FAF7",
        minHeight: "100vh",
        pb: 12
      }}
    >
      <Box
        sx={{
          px: 3,
          pt: 3,
          pb: 2
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#0E4D28"
        >
          Our Services
        </Typography>
        <Typography
          color="text.secondary"
          mt={1}
        >
          Professional Gardening & Landscaping Solutions
        </Typography>
        <TextField
          fullWidth
          placeholder="Search Services..."
          sx={{ mt: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />

        <Box mt={3}>
          <Chip
            label="Most Popular"
            color="success"
          />
        </Box>
      </Box>

      <Grid
        container
        spacing={2}
        sx={{
          px: 2
        }}
      >
        {services.map((item, index) => (
          <Grid
            item
            xs={12}
            key={index}
          >
            <Card
              sx={{
                borderRadius: 5,
                boxShadow: "0 6px 18px rgba(0,0,0,.08)"
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: item.color
                      }}
                    >
                      {item.icon}
                    </Box>
                  </Box>
                  <Box textAlign="right">
                    <Typography
                      fontWeight="bold"
                      color="#0E4D28"
                    >
                      ⭐ {item.rating}
                    </Typography>
                    <Typography
                      fontWeight="bold"
                    >
                      {item.price}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mt={2}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={1}
                >
                  {item.desc}
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    bgcolor: "#0E4D28",
                    borderRadius: 3,
                    py: 1.4
                  }}
                  onClick={() => navigate("/visit")}
                >
                  Book Service
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ px: 3, mt: 4 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="#0E4D28"
          mb={2}
        >
          More Services
        </Typography>
        <Grid container spacing={2}>
          {extras.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Card
                sx={{
                  borderRadius: 4,
                  textAlign: "center",
                  py: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,.06)",
                  transition: ".25s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)"
                  }
                }}
              >
                <Box>{item.icon}</Box>
                <Typography
                  mt={1}
                  fontWeight="600"
                >
                  {item.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card
          sx={{
            mt: 5,
            borderRadius: 5,
            bgcolor: "#0E4D28",
            color: "#fff",
            p: 3
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Need a Custom Garden Solution?
          </Typography>
          <Typography
            mt={1}
            sx={{ opacity: .9 }}
          >
            Book a professional inspection. Our expert will visit your garden, understand your requirements and provide the best quotation.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/visit")}
            sx={{
              mt: 3,
              bgcolor: "#fff",
              color: "#0E4D28",
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 3,
              "&:hover": {
                bgcolor: "#f5f5f5"
              }
            }}
          >
            Schedule Inspection
          </Button>
        </Card>

        <Box
          sx={{
            textAlign: "center",
            mt: 5,
            mb: 2
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Trusted by hundreds of homeowners for
          </Typography>
          <Typography
            fontWeight="bold"
            color="#0E4D28"
            mt={0.5}
          >
            Garden Maintenance • Landscaping • Irrigation
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}


