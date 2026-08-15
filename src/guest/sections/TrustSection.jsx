import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

const items = [
  {
    icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 40, color: "#2E7D32" }} />,
    title: "Trusted Professionals",
    text: "Experienced team for homes, villas and commercial gardens.",
  },
  {
    icon: <AssignmentTurnedInIcon sx={{ fontSize: 40, color: "#2E7D32" }} />,
    title: "Quality Service",
    text: "Reliable garden maintenance with professional standards.",
  },
  {
    icon: <PeopleOutlinedIcon sx={{ fontSize: 40, color: "#2E7D32" }} />,
    title: "Customer First",
    text: "Focused on long-term relationships and customer satisfaction.",
  },
];

export default function TrustSection() {
  return (
    <Box sx={{ py: 8, bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid key={item.title} size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: "1px solid #E8F5E9",
                  height: "100%",
                  textAlign: "center",
                }}
              >
                {item.icon}

                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ mt: 2 }}
                >
                  {item.title}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {item.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
