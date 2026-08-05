import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Paper,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build";
import GrassIcon from "@mui/icons-material/Grass";
import VerifiedIcon from "@mui/icons-material/Verified";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SEO from "../components/SEO";

export default function GardenMaintenance() {
  const navigate = useNavigate();

  const whatsapp = () => {
    window.open(
      "https://wa.me/917987468974?text=Hi%20Munder,%20I%20want%20Garden%20Maintenance%20Service%20in%20Bhopal",
      "_blank"
    );
  };



return (
  <div style={{ padding: "20px" }}>
    <h1>Garden Maintenance Test</h1>
  </div>
);
      <Box sx={{ bgcolor: "#f7f9f6", minHeight: "100vh" }}>

        <Box
          sx={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)),url('/images/Maintenance01.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            py: 10,
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">

            <Typography
              variant="h3"
              fontWeight="900"
              sx={{ mb: 2 }}
            >
              Garden Maintenance Services in Bhopal
            </Typography>

            <Typography
              variant="h6"
              sx={{
                maxWidth: 700,
                mx: "auto",
                mb: 4,
                color: "#f1f1f1",
              }}
            >
              Keep your garden healthy, green and beautiful throughout
              the year with Munder's professional maintenance team.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/visit")}
              sx={{
                bgcolor: "#25D366",
                px: 5,
                py: 1.5,
                borderRadius: 4,
                mr: 2,
              }}
            >
              Book Free Visit
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={whatsapp}
              sx={{
                color: "#fff",
                borderColor: "#fff",
                px: 5,
                py: 1.5,
                borderRadius: 4,
              }}
            >
              WhatsApp
            </Button>

          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 6 }}>

          <Typography
            variant="h4"
            fontWeight="900"
            textAlign="center"
            sx={{ mb: 5, color: "#0e4d28" }}
          >
            Why Choose Munder?
          </Typography>

          <Grid container spacing={3} sx={{ mb: 7 }}>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 4, borderRadius: 4, textAlign: "center", height: "100%" }}>
                <VerifiedIcon sx={{ fontSize: 50, color: "#0e4d28", mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">
                  Professional Garden Experts
                </Typography>
                <Typography mt={2}>
                  Our experienced team provides complete garden
                  maintenance using professional tools and proven
                  gardening techniques.
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 4, borderRadius: 4, textAlign: "center", height: "100%" }}>
                <GrassIcon sx={{ fontSize: 50, color: "#0e4d28", mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">
                  Healthy & Beautiful Gardens
                </Typography>
                <Typography mt={2}>
                  From lawn care to seasonal pruning, we keep your
                  garden fresh, green and healthy throughout the year.
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 4, borderRadius: 4, textAlign: "center", height: "100%" }}>
                <BuildIcon sx={{ fontSize: 50, color: "#0e4d28", mb: 2 }} />
                <Typography variant="h6" fontWeight="bold">
                  Customized Maintenance Plans
                </Typography>
                <Typography mt={2}>
                  Weekly and monthly maintenance plans according to
                  your garden size and requirements.
                </Typography>
              </Paper>
            </Grid>

          </Grid>

          <Typography
            variant="h4"
            fontWeight="900"
            textAlign="center"
            sx={{ mb: 4, color: "#0e4d28" }}
          >
            Our Garden Maintenance Services
          </Typography>

          <Grid container spacing={3}>

            {[
              "Lawn Mowing",
              "Plant Pruning",
              "Weed Removal",
              "Fertilizer Application",
              "Garden Cleaning",
              "Seasonal Plant Care",
              "Pest & Disease Inspection",
              "Watering & Plant Health"
            ].map((item) => (

              <Grid key={item} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    textAlign: "center",
                    height: "100%"
                  }}
                >
                  <GrassIcon
                    sx={{
                      fontSize: 42,
                      color: "#0e4d28",
                      mb: 2
                    }}
                  />

                  <Typography fontWeight="bold">
                    {item}
                  </Typography>

                </Paper>
              </Grid>

            ))}

          </Grid>

          <Box sx={{ mt: 8 }}>

            <Typography
              variant="h4"
              fontWeight="900"
              sx={{ mb: 3, color: "#0e4d28" }}
            >
              Professional Garden Maintenance in Bhopal
            </Typography>

            <Typography paragraph>
              Munder provides professional garden maintenance services in
              Bhopal for homes, villas, farmhouses, offices, schools,
              hospitals and commercial landscapes. Our experienced
              gardeners ensure that your garden remains healthy, green and
              attractive throughout the year.
            </Typography>

            <Typography paragraph>
              Our maintenance services include lawn mowing, hedge trimming,
              plant pruning, fertilizer application, weed removal, seasonal
              planting, garden cleaning, irrigation inspection and complete
              plant health management.
            </Typography>

            <Typography paragraph>
              Whether you need a one-time garden cleaning or a monthly
              maintenance package, Munder offers customized plans according
              to your garden size and requirements.
            </Typography>

          </Box>

          <Box sx={{ mt: 8 }}>

            <Typography
              variant="h4"
              fontWeight="900"
              sx={{ mb: 4, color: "#0e4d28" }}
            >
              Frequently Asked Questions
            </Typography>

            <Paper sx={{ p: 3, mb: 2, borderRadius: 4 }}>
              <Typography fontWeight="bold">
                Do you provide free garden inspection?
              </Typography>

              <Typography mt={1}>
                Yes. Our team provides a free site visit in Bhopal before
                suggesting any maintenance plan.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, mb: 2, borderRadius: 4 }}>
              <Typography fontWeight="bold">
                Do you offer monthly maintenance?
              </Typography>

              <Typography mt={1}>
                Yes. We provide weekly, fortnightly and monthly garden
                maintenance plans.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography fontWeight="bold">
                Which areas do you cover?
              </Typography>

              <Typography mt={1}>
                Currently our garden maintenance service is available
                across Bhopal.
              </Typography>
            </Paper>

          </Box>

          <Paper
            sx={{
              mt: 8,
              p: 5,
              borderRadius: 5,
              bgcolor: "#0e4d28",
              color: "#fff",
              textAlign: "center",
            }}
          >

            <Typography variant="h4" fontWeight="900">
              Need Garden Maintenance?
            </Typography>

            <Typography sx={{ mt: 2, mb: 4 }}>
              Book a FREE garden inspection today and let our experts
              maintain your garden professionally.
            </Typography>

            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              onClick={whatsapp}
              sx={{
                bgcolor: "#25D366",
                px: 5,
                py: 1.5,
                borderRadius: 4,
                mr: 2,
              }}
            >
              WhatsApp Now
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/visit")}
              sx={{
                bgcolor: "#fff",
                color: "#0e4d28",
                px: 5,
                py: 1.5,
                borderRadius: 4,
              }}
            >
              Book Free Visit
            </Button>

          </Paper>
        </Container>

      </Box>

    </>
  );
}

