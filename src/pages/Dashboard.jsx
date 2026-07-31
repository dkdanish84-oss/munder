import { Box, Typography, Card, CardContent, Grid } from "@mui/material";

import DashboardCards from "../components/DashboardCards";

export default function Dashboard() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight="bold">
        👋 Good Evening
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Welcome to Munder Landscape Management System
      </Typography>

      <DashboardCards />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                📅 Today's Visits
              </Typography>

              <Typography sx={{ mt: 2 }}>
                🏡 Sharma Villa — 10:00 AM
              </Typography>

              <Typography>🌳 Green Valley — 2:30 PM</Typography>

              <Typography>🌼 Rose Garden — 5:00 PM</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                ⚡ Quick Actions
              </Typography>

              <Typography sx={{ mt: 2 }}>➕ Add Lead</Typography>
              <Typography>👤 Add Customer</Typography>
              <Typography>📄 Create Quotation</Typography>
              <Typography>📅 Schedule Visit</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
