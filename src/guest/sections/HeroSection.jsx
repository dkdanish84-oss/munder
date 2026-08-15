import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Chip,
  Paper,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SpaIcon from "@mui/icons-material/Spa";
import ParkIcon from "@mui/icons-material/Park";
import OpacityIcon from "@mui/icons-material/Opacity";

export default function HeroSection() {
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/917987468974?text=Hi Munder,%0A%0AI want to book a FREE Garden Visit.",
      "_blank"
    );
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg,#F5FBF4 0%,#ECF8EE 45%,#E5F6E8 100%)",
        py: { xs: 8, md: 12 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">

          <Grid size={{ xs: 12, md: 6 }}>

            <Chip
              label="🌿 MUNDER GARDEN CARE"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
                mb: 3,
              }}
            />

            <Typography
              sx={{
                fontWeight: 900,
                lineHeight: 1.1,
                fontSize: {
                  xs: "2.6rem",
                  md: "4.4rem",
                },
              }}
            >
              Beautiful Gardens.
              <br />
              <Box
                component="span"
                sx={{ color: "#2E7D32" }}
              >
                Expert Care.
              </Box>
              <br />
              Every Season.
            </Typography>

            <Typography
              sx={{
                mt: 3,
                mb: 5,
                color: "#555",
                maxWidth: 560,
                lineHeight: 1.8,
              }}
            >
              Professional Garden Maintenance,
              Landscaping, Irrigation,
              Plant Selling and Garden Care
              Services across Bhopal.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
            >

              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "#2E7D32",
                  px: 4,
                  py: 1.6,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  "&:hover": {
                    bgcolor: "#1B5E20",
                  },
                }}
              >
                Book Free Visit
              </Button>

              <Button
                variant="outlined"
                startIcon={<WhatsAppIcon />}
                onClick={openWhatsApp}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.6,
                  textTransform: "none",
                  borderColor: "#2E7D32",
                  color: "#2E7D32",
                  fontWeight: 700,
                }}
              >
                WhatsApp
              </Button>

            </Stack>

            <Stack
              direction="row"
              spacing={2}
              flexWrap="wrap"
              mt={5}
            >

              <Chip
                icon={<SpaIcon />}
                label="Free Site Visit"
              />

              <Chip
                icon={<VerifiedUserIcon />}
                label="Verified Gardeners"
              />

              <Chip
                icon={<ParkIcon />}
                label="Premium Service"
              />

            </Stack>

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <Box
              component="img"
              src="/images/hero-gardener.png"
              alt="Munder"
              sx={{
                width: "100%",
                maxWidth: 620,
                display: "block",
                mx: "auto",
              }}
            />

            <Grid container spacing={2} mt={2}>

              <Grid size={{ xs: 6 }}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  🌿 Garden Maintenance
                </Paper>
              </Grid>

              <Grid size={{ xs: 6 }}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  💧 Irrigation
                </Paper>
              </Grid>

              <Grid size={{ xs: 6 }}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  🪴 Plant Selling
                </Paper>
              </Grid>

              <Grid size={{ xs: 6 }}>
                <Paper sx={{ p: 2, borderRadius: 3 }}>
                  🌳 Landscaping
                </Paper>
              </Grid>

            </Grid>

          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
