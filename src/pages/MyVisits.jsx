import React from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Stack,
  Button,
} from "@mui/material";

import {
  CalendarDays,
  Clock3,
  UserRound,
  CheckCircle2,
  AlertTriangle,
  Star,
  ArrowRight,
} from "lucide-react";

export default function MyVisits() {
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
        pb: 12,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 25, sm: 30 },
          fontWeight: 800,
          color: "#123D22",
        }}
      >
        My Visits
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          color: "#6B756E",
          mb: 3,
        }}
      >
        Track your visits, remaining service and work records
      </Typography>

      {/* VISIT SUMMARY */}

      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #DCEBDD",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#718078",
              fontWeight: 700,
            }}
          >
            BASIC CARE PLAN
          </Typography>

          <Typography
            sx={{
              fontSize: 21,
              fontWeight: 800,
              color: "#183B2A",
              mt: 0.3,
            }}
          >
            Visit Usage
          </Typography>

          <Stack
            direction="row"
            spacing={{ xs: 3, sm: 6 }}
            sx={{ mt: 2 }}
          >
            <Stat label="Included" value="2" />
            <Stat label="Completed" value="1" />
            <Stat label="Remaining" value="1" />
          </Stack>
        </CardContent>
      </Card>

      {/* NEXT VISIT */}

      <Typography
        sx={{
          fontSize: 19,
          fontWeight: 800,
          color: "#123D22",
          mb: 1.5,
        }}
      >
        Next Visit
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #E1E9E2",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            gap={2}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: "#183B2A",
                }}
              >
                Routine Garden Maintenance
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mt: 1 }}
              >
                <CalendarDays size={16} color="#66756C" />
                <Typography fontSize={13} color="#66756C">
                  18 August 2026
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mt: 0.7 }}
              >
                <Clock3 size={16} color="#66756C" />
                <Typography fontSize={13} color="#66756C">
                  10:00 AM
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mt: 0.7 }}
              >
                <UserRound size={16} color="#66756C" />
                <Typography fontSize={13} color="#66756C">
                  Gardener: Assigned
                </Typography>
              </Stack>
            </Box>

            <Chip
              label="Confirmed"
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
              }}
            />
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography
            sx={{
              fontWeight: 800,
              color: "#183B2A",
              mb: 1,
            }}
          >
            Target Work
          </Typography>

          {[
            "Lawn mowing",
            "Plant pruning",
            "Fertilizer spray",
          ].map((work) => (
            <Stack
              key={work}
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 0.7 }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  bgcolor: "#2E7D32",
                }}
              />
              <Typography fontSize={14} color="#4F5D55">
                {work}
              </Typography>
            </Stack>
          ))}

          <Box
            sx={{
              mt: 2,
              p: 1.8,
              borderRadius: 3,
              bgcolor: "#FFF9E8",
              border: "1px solid #F2E4B4",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <AlertTriangle size={18} color="#A47700" />

              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#755900",
                    fontSize: 13,
                  }}
                >
                  Preparation & Safety
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 12,
                    color: "#756A4A",
                  }}
                >
                  Follow the preparation instructions shown for the
                  selected work before the visit.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            endIcon={<ArrowRight size={17} />}
            sx={{
              mt: 2,
              borderColor: "#2E7D32",
              color: "#2E7D32",
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            View Visit Details
          </Button>
        </CardContent>
      </Card>

      {/* REMAINING */}

      <Typography
        sx={{
          fontSize: 19,
          fontWeight: 800,
          color: "#123D22",
          mb: 1.5,
        }}
      >
        Remaining Visits
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #E1E9E2",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography fontWeight={800} color="#183B2A">
                1 Visit Remaining
              </Typography>

              <Typography fontSize={13} color="#6B756E">
                Available in your current plan
              </Typography>
            </Box>

            <Chip
              label="Available"
              size="small"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* LAST VISIT */}

      <Typography
        sx={{
          fontSize: 19,
          fontWeight: 800,
          color: "#123D22",
          mb: 1.5,
        }}
      >
        Last Visit
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid #E1E9E2",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle2 size={22} />
            </Box>

            <Box>
              <Typography fontWeight={800} color="#183B2A">
                Routine Maintenance
              </Typography>

              <Typography fontSize={13} color="#6B756E">
                12 August 2026 • 10:15 AM
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mb: 1.5 }}
          >
            <UserRound size={17} color="#66756C" />

            <Typography fontSize={14} color="#4F5D55">
              Gardener: Arif Khan
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontWeight: 800,
              color: "#183B2A",
              mb: 1,
            }}
          >
            Work Verification
          </Typography>

          {[
            "Lawn mowing",
            "Plant pruning",
            "Fertilizer spray",
          ].map((work) => (
            <Stack
              key={work}
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 0.8 }}
            >
              <Typography fontSize={14} color="#4F5D55">
                {work}
              </Typography>

              <Chip
                label="Yes"
                size="small"
                icon={<CheckCircle2 size={14} />}
                sx={{
                  bgcolor: "#E8F5E9",
                  color: "#2E7D32",
                  fontWeight: 700,
                }}
              />
            </Stack>
          ))}

          <Divider sx={{ my: 2 }} />

          <Typography
            sx={{
              fontWeight: 800,
              color: "#183B2A",
              mb: 1,
            }}
          >
            Gardener Rating
          </Typography>

          <Stack direction="row" spacing={0.5} alignItems="center">
            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                size={20}
                fill="#F5B82E"
                color="#F5B82E"
              />
            ))}

            <Typography
              fontSize={13}
              color="#66756C"
              sx={{ ml: 0.8 }}
            >
              5.0
            </Typography>
          </Stack>

          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              borderColor: "#2E7D32",
              color: "#2E7D32",
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            View Full Visit Record
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

function Stat({ label, value }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 12,
          color: "#7A857F",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 800,
          color: "#183B2A",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
