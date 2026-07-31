import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@mui/material";

export default function Login() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F8F5",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            color="#1B5E20"
          >
            MUNDER
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Landscape • Maintenance • Plants
          </Typography>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              bgcolor: "#1B5E20",
            }}
          >
            Login
          </Button>
        </Card>
      </Container>
    </Box>
  );
}
