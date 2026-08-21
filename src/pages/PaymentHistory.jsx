import React from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";

export default function PaymentHistory() {
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 3, sm: 4 },
        pb: 12,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 24, sm: 30 },
          fontWeight: 800,
          color: "#183B2A",
        }}
      >
        Payments
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: "#66756C",
          mb: 3,
        }}
      >
        View your payment history
      </Typography>

      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #E5EAE6",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 2.5,
                bgcolor: "#EAF4EB",
                color: "#2E7D32",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ReceiptLongRoundedIcon />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "#183B2A",
                }}
              >
                Basic Care Plan
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#7A857F", mt: 0.3 }}
              >
                01 August 2026
              </Typography>
            </Box>

            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "#183B2A",
                }}
              >
                ₹1,178
              </Typography>

              <Chip
                label="Paid"
                size="small"
                sx={{
                  mt: 0.5,
                  bgcolor: "#E8F5E9",
                  color: "#2E7D32",
                  fontWeight: 700,
                }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
