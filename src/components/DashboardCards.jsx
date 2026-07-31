import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import EngineeringIcon from "@mui/icons-material/Engineering";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const cards = [
  {
    title: "Total Leads",
    value: "24",
    color: "#2E7D32",
    icon: <TrendingUpIcon fontSize="large" />,
  },
  {
    title: "Customers",
    value: "18",
    color: "#1976D2",
    icon: <PeopleIcon fontSize="large" />,
  },
  {
    title: "Projects",
    value: "7",
    color: "#F57C00",
    icon: <EngineeringIcon fontSize="large" />,
  },
  {
    title: "Revenue",
    value: "₹1.25L",
    color: "#8E24AA",
    icon: <CurrencyRupeeIcon fontSize="large" />,
  },
];

export default function DashboardCards() {
  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} key={card.title}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography color="text.secondary">
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                  >
                    {card.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    bgcolor: card.color,
                    color: "#fff",
                    p: 1.5,
                    borderRadius: 2,
                  }}
                >
                  {card.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
