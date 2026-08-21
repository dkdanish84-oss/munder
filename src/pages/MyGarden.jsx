import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

import LocalFloristRoundedIcon from "@mui/icons-material/LocalFloristRounded";
import StraightenRoundedIcon from "@mui/icons-material/StraightenRounded";

export default function MyGarden() {
  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2.5, sm: 4 },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          color: "#123D22",
          mb: 0.5,
        }}
      >
        My Garden
      </Typography>

      <Typography
        sx={{
          color: "#6B756E",
          mb: 3,
        }}
      >
        Your garden details and maintenance record
      </Typography>

      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #E4ECE5",
          mb: 2,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            mb={2}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: "14px",
                bgcolor: "#E8F5E9",
                color: "#0E4D28",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocalFloristRoundedIcon />
            </Box>

            <Box>
              <Typography fontWeight={800}>
                My Garden
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Garden information
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
          >
            <Chip
              icon={<StraightenRoundedIcon />}
              label="Garden Size — Not added"
              sx={{ width: "fit-content" }}
            />

            <Chip
              label="Plants — Not added"
              sx={{ width: "fit-content" }}
            />
          </Stack>
        </CardContent>
      </Card>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: "#123D22",
          mb: 1.5,
        }}
      >
        Work Photos
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {["Before", "After", "Last Work"].map((item) => (
          <Card
            key={item}
            elevation={0}
            sx={{
              minHeight: 150,
              borderRadius: 4,
              border: "1px dashed #C9D8CC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#FAFCFA",
            }}
          >
            <Typography
              color="text.secondary"
              fontWeight={700}
            >
              {item} image
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
