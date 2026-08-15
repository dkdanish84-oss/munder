import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Divider,
  Avatar,
} from "@mui/material";

import {
  CalendarDays,
  Leaf,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  MapPin,
  Clock3,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  return (
    <Box
      sx={{
        maxWidth: 1400,
        mx: "auto",
        pt: {
          xs: 6,
          sm: 6,
          md: 5,
        },
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: 24,
                sm: 30,
              },
              fontWeight: 800,
              color: "#183B2A",
            }}
          >
            Good Evening 👋
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: "#66756C",
              fontSize: 14,
            }}
          >
            Welcome back to your MUNDER garden.
          </Typography>
        </Box>

        <Avatar
          sx={{
            width: 46,
            height: 46,
            bgcolor: "#E8F3EA",
            color: "#2E7D32",
            fontWeight: 700,
          }}
        >
          M
        </Avatar>
      </Box>

      {/* ACTIVE PLAN */}

      <Card
        sx={{
          borderRadius: 4,
          mb: 3,
          overflow: "hidden",
          border: "1px solid #DCEBDD",
          boxShadow: "0 8px 30px rgba(31, 80, 45, 0.08)",
        }}
      >
        <CardContent
          sx={{
            pt: {
          xs: 6,
          sm: 6,
          md: 5,
        },
        px: {
              xs: 2.5,
              sm: 3,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                sm: "center",
              },
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#718078",
                  mb: 0.5,
                }}
              >
                YOUR ACTIVE PLAN
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#183B2A",
                }}
              >
                Basic Care Plan
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 14,
                  color: "#66756C",
                }}
              >
                2 gardener visits per month
              </Typography>
            </Box>

            <Chip
              label="Active"
              sx={{
                bgcolor: "#E8F5E9",
                color: "#2E7D32",
                fontWeight: 700,
                borderRadius: 2,
              }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#7A857F",
                }}
              >
                Next renewal
              </Typography>

              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#26382D",
                }}
              >
                14 September 2026
              </Typography>
            </Box>

            <Button
              variant="outlined"
              endIcon={<ArrowRight size={17} />}
              sx={{
                borderColor: "#2E7D32",
                color: "#2E7D32",
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              View Plan
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* SUMMARY CARDS */}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            icon={<CalendarDays size={21} />}
            title="Next Visit"
            value="18 Aug"
            subtitle="10:00 AM"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            icon={<Leaf size={21} />}
            title="My Garden"
            value="1 Garden"
            subtitle="Maintenance active"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            icon={<CreditCard size={21} />}
            title="Last Payment"
            value="₹1,178"
            subtitle="Paid successfully"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            icon={<ShoppingBag size={21} />}
            title="Orders"
            value="2 Orders"
            subtitle="1 recent order"
          />
        </Grid>
      </Grid>

      {/* MAIN CONTENT */}

      <Grid container spacing={3}>
        {/* UPCOMING VISIT */}

        <Grid size={{ xs: 12, md: 7 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 4,
              border: "1px solid #E5EAE6",
              boxShadow: "0 5px 20px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <SectionTitle
                icon={<CalendarDays size={20} />}
                title="Upcoming Visit"
              />

              <Box
                sx={{
                  mt: 2.5,
                  p: 2.2,
                  borderRadius: 3,
                  bgcolor: "#F5FAF5",
                  border: "1px solid #E2EEE3",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: 18,
                        color: "#183B2A",
                      }}
                    >
                      Garden Maintenance
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                        mt: 1,
                        color: "#66756C",
                      }}
                    >
                      <CalendarDays size={16} />

                      <Typography fontSize={13}>
                        18 August 2026
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                        mt: 0.7,
                        color: "#66756C",
                      }}
                    >
                      <Clock3 size={16} />

                      <Typography fontSize={13}>
                        10:00 AM
                      </Typography>
                    </Box>
                  </Box>

                  <Chip
                    label="Confirmed"
                    sx={{
                      alignSelf: "flex-start",
                      bgcolor: "#E8F5E9",
                      color: "#2E7D32",
                      fontWeight: 700,
                    }}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "#66756C",
                  }}
                >
                  <MapPin size={17} />

                  <Typography fontSize={13}>
                    Your registered garden
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowRight size={17} />}
                  sx={{
                    mt: 2,
                    bgcolor: "#2E7D32",
                    "&:hover": {
                      bgcolor: "#256628",
                    },
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 700,
                    py: 1.2,
                  }}
                >
                  View Visit Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* QUICK ACTIONS */}

        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 4,
              border: "1px solid #E5EAE6",
              boxShadow: "0 5px 20px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <SectionTitle
                icon={<Sparkles size={20} />}
                title="Quick Actions"
              />

              <Box sx={{ mt: 2 }}>
                <QuickAction
                  icon={<CalendarDays size={19} />}
                  title="Book a Visit"
                  subtitle="Schedule garden maintenance"
                />

                <QuickAction
                  icon={<Leaf size={19} />}
                  title="My Garden"
                  subtitle="View your garden details"
                />

                <QuickAction
                  icon={<ShoppingBag size={19} />}
                  title="Shop Plants"
                  subtitle="Explore plants and products"
                />

                <QuickAction
                  icon={<CreditCard size={19} />}
                  title="Payments"
                  subtitle="View payment history"
                  last
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* RECENT ACTIVITY */}

        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              borderRadius: 4,
              border: "1px solid #E5EAE6",
              boxShadow: "0 5px 20px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <SectionTitle
                icon={<Clock3 size={20} />}
                title="Recent Activity"
              />

              <Box sx={{ mt: 2 }}>
                <Activity
                  title="Maintenance visit confirmed"
                  date="14 Aug 2026"
                  status="Confirmed"
                />

                <Activity
                  title="Basic Care Plan renewed"
                  date="01 Aug 2026"
                  status="Paid"
                />

                <Activity
                  title="Plant order delivered"
                  date="28 Jul 2026"
                  status="Completed"
                  last
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
}) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3.5,
        border: "1px solid #E5EAE6",
        boxShadow: "0 4px 16px rgba(0,0,0,0.035)",
      }}
    >
      <CardContent sx={{ p: 2.3 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2.5,
            bgcolor: "#EAF4EB",
            color: "#2E7D32",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1.5,
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            fontSize: 12,
            color: "#77827C",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 19,
            fontWeight: 800,
            color: "#183B2A",
            mt: 0.3,
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: "#7B8780",
            mt: 0.3,
          }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  icon,
  title,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2.5,
          bgcolor: "#EAF4EB",
          color: "#2E7D32",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      <Typography
        sx={{
          fontWeight: 800,
          color: "#183B2A",
          fontSize: 18,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon,
  title,
  subtitle,
  last,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 1.5,
        borderBottom: last
          ? "none"
          : "1px solid #EEF1EF",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2,
          bgcolor: "#F1F7F1",
          color: "#2E7D32",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 14,
            color: "#26382D",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: "#7A857F",
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <ArrowRight
        size={17}
        color="#8A968F"
      />
    </Box>
  );
}

/* =========================================================
   ACTIVITY
========================================================= */

function Activity({
  title,
  date,
  status,
  last,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        py: 1.5,
        borderBottom: last
          ? "none"
          : "1px solid #EEF1EF",
      }}
    >
      <Box
        sx={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          bgcolor: "#2E7D32",
          flexShrink: 0,
        }}
      />

      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontWeight: 650,
            fontSize: 14,
            color: "#26382D",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: "#7A857F",
            mt: 0.2,
          }}
        >
          {date}
        </Typography>
      </Box>

      <Chip
        label={status}
        size="small"
        sx={{
          bgcolor: "#F1F7F1",
          color: "#2E7D32",
          fontWeight: 700,
          fontSize: 11,
        }}
      />
    </Box>
  );
}

