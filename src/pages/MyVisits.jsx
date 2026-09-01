import React, { useEffect, useMemo, useState } from "react";
import { getAuth } from "firebase/auth";

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

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://munder.in";

function formatDate(value) {
  if (!value) return "Not scheduled";

  const date = new Date(
    String(value).length === 10
      ? `${value}T00:00:00`
      : value
  );

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(value) {
  if (!value) return "Time not assigned";

  const raw = String(value).trim();

  if (
    raw.toLowerCase() === "morning" ||
    raw.toLowerCase() === "afternoon" ||
    raw.toLowerCase() === "evening"
  ) {
    return raw;
  }

  const date = new Date(
    raw.includes("T") ? raw : `1970-01-01T${raw}`
  );

  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return raw;
}

function getVisitTimestamp(visit) {
  if (!visit?.visitDate) return Number.MAX_SAFE_INTEGER;

  const value = new Date(
    `${visit.visitDate}T00:00:00`
  ).getTime();

  return Number.isNaN(value)
    ? Number.MAX_SAFE_INTEGER
    : value;
}

function isCompletedVisit(visit) {
  const status = String(visit?.status || "")
    .trim()
    .toLowerCase();

  return [
    "completed",
    "complete",
    "done",
    "finished",
  ].includes(status);
}

function getIncludedVisits(plan) {
  const possibleValues = [
    plan?.visits,
    plan?.includedVisits,
    plan?.visitsPerMonth,
    plan?.monthlyVisits,
    plan?.visitCount,
  ];

  for (const value of possibleValues) {
    const number = Number(value);

    if (Number.isFinite(number) && number >= 0) {
      return number;
    }
  }

  const name = String(plan?.name || "")
    .trim()
    .toLowerCase();

  if (
    name === "basic care plan" ||
    name.includes("basic care")
  ) {
    return 2;
  }

  return 0;
}

function getGardenerName(visit) {
  if (!visit) return "Not assigned";

  if (typeof visit.assignedGardener === "string") {
    return visit.assignedGardener || "Not assigned";
  }

  if (visit.assignedGardener?.name) {
    return visit.assignedGardener.name;
  }

  if (visit.gardener?.name) {
    return visit.gardener.name;
  }

  if (visit.gardenerName) {
    return visit.gardenerName;
  }

  return "Not assigned";
}

function getWorkItems(visit) {
  if (Array.isArray(visit?.work) && visit.work.length > 0) {
    return visit.work;
  }

  if (Array.isArray(visit?.tasks) && visit.tasks.length > 0) {
    return visit.tasks;
  }

  if (
    Array.isArray(visit?.targetWork) &&
    visit.targetWork.length > 0
  ) {
    return visit.targetWork;
  }

  return [
    "Lawn mowing",
    "Plant pruning",
    "Fertilizer spray",
  ];
}

function getWorkLabel(work) {
  if (typeof work === "string") {
    return work;
  }

  return (
    work?.name ||
    work?.title ||
    work?.label ||
    "Service work"
  );
}

function getVerificationValue(visit, work) {
  const verification =
    visit?.workVerification ||
    visit?.verification ||
    visit?.completedWork;

  if (!verification) {
    return isCompletedVisit(visit) ? "Yes" : "Pending";
  }

  if (Array.isArray(verification)) {
    const label = getWorkLabel(work).toLowerCase();

    const found = verification.find((item) => {
      const itemLabel = getWorkLabel(item).toLowerCase();
      return itemLabel === label;
    });

    if (found) {
      if (
        found.completed === true ||
        found.done === true ||
        found.value === true
      ) {
        return "Yes";
      }

      if (
        found.completed === false ||
        found.done === false ||
        found.value === false
      ) {
        return "No";
      }
    }
  }

  if (typeof verification === "object") {
    const label = getWorkLabel(work);

    const value =
      verification[label] ??
      verification[label.toLowerCase()];

    if (value === true) return "Yes";
    if (value === false) return "No";
  }

  return isCompletedVisit(visit) ? "Yes" : "Pending";
}

function getRating(visit) {
  const value = Number(
    visit?.rating ??
      visit?.gardenerRating ??
      visit?.review?.rating
  );

  if (
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 5
  ) {
    return value;
  }

  return 0;
}

export default function MyVisits() {
  const [customer, setCustomer] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadVisits() {
      try {
        setLoading(true);
        setError("");

        const auth = getAuth();
        const firebaseUser = auth.currentUser;

        if (!firebaseUser) {
          throw new Error(
            "Please login to view your visits."
          );
        }

        const token = await firebaseUser.getIdToken();

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          customerResponse,
          visitsResponse,
        ] = await Promise.all([
          fetch(
            `${API_BASE}/api/v1/customer/me`,
            { headers }
          ),

          fetch(
            `${API_BASE}/api/v1/customer/visits`,
            { headers }
          ),
        ]);

        const customerData =
          await customerResponse.json();

        const visitsData =
          await visitsResponse.json();

        if (
          !customerResponse.ok ||
          !customerData.success
        ) {
          throw new Error(
            customerData.message ||
              "Unable to load customer account."
          );
        }

        if (
          !visitsResponse.ok ||
          !visitsData.success
        ) {
          throw new Error(
            visitsData.message ||
              "Unable to load customer visits."
          );
        }

        if (!cancelled) {
          setCustomer(
            customerData.customer || null
          );

          setVisits(
            Array.isArray(visitsData.visits)
              ? visitsData.visits
              : []
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message ||
              "Unable to load visits."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadVisits();

    return () => {
      cancelled = true;
    };
  }, []);

  const plan = customer?.plan || customer?.subscription || {};

  const includedVisits = useMemo(
    () => getIncludedVisits(plan),
    [plan]
  );

  const completedVisits = useMemo(
    () =>
      visits.filter((visit) =>
        isCompletedVisit(visit)
      ),
    [visits]
  );

  const upcomingVisits = useMemo(() => {
    const now = new Date();

    return visits
      .filter((visit) => {
        if (!visit?.visitDate) return false;

        const date = new Date(
          `${visit.visitDate}T23:59:59`
        );

        return (
          !Number.isNaN(date.getTime()) &&
          date >= now &&
          !isCompletedVisit(visit)
        );
      })
      .sort(
        (a, b) =>
          getVisitTimestamp(a) -
          getVisitTimestamp(b)
      );
  }, [visits]);

  const nextVisit =
    upcomingVisits[0] || null;

  const lastVisit = useMemo(() => {
    return (
      completedVisits
        .slice()
        .sort(
          (a, b) =>
            getVisitTimestamp(b) -
            getVisitTimestamp(a)
        )[0] || null
    );
  }, [completedVisits]);

  const remainingVisits = Math.max(
    0,
    includedVisits - completedVisits.length
  );

  const planName =
    plan?.name ||
    "Current Plan";

  const nextWork =
    getWorkItems(nextVisit);

  const lastWork =
    getWorkItems(lastVisit);

  const rating =
    getRating(lastVisit);

  if (loading) {
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
          }}
        >
          Loading your visit information...
        </Typography>
      </Box>
    );
  }

  if (error) {
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

        <Card
          sx={{
            mt: 3,
            borderRadius: 4,
            border: "1px solid #E1E9E2",
          }}
        >
          <CardContent>
            <Typography
              color="error"
              fontWeight={700}
            >
              {error}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

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
        <CardContent
          sx={{ p: { xs: 2.5, sm: 3 } }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: "#718078",
              fontWeight: 700,
            }}
          >
            {String(planName).toUpperCase()}
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
            <Stat
              label="Included"
              value={includedVisits}
            />

            <Stat
              label="Completed"
              value={completedVisits.length}
            />

            <Stat
              label="Remaining"
              value={remainingVisits}
            />
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
        <CardContent
          sx={{ p: { xs: 2.5, sm: 3 } }}
        >
          {nextVisit ? (
            <>
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
                    {nextVisit.service ||
                      "Garden Maintenance"}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <CalendarDays
                      size={16}
                      color="#66756C"
                    />

                    <Typography
                      fontSize={13}
                      color="#66756C"
                    >
                      {formatDate(
                        nextVisit.visitDate
                      )}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mt: 0.7 }}
                  >
                    <Clock3
                      size={16}
                      color="#66756C"
                    />

                    <Typography
                      fontSize={13}
                      color="#66756C"
                    >
                      {formatTime(
                        nextVisit.visitTime
                      )}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mt: 0.7 }}
                  >
                    <UserRound
                      size={16}
                      color="#66756C"
                    />

                    <Typography
                      fontSize={13}
                      color="#66756C"
                    >
                      Gardener:{" "}
                      {getGardenerName(
                        nextVisit
                      )}
                    </Typography>
                  </Stack>
                </Box>

                <Chip
                  label={
                    nextVisit.status ||
                    "Pending"
                  }
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

              {nextWork.map((work, index) => (
                <Stack
                  key={`${getWorkLabel(
                    work
                  )}-${index}`}
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

                  <Typography
                    fontSize={14}
                    color="#4F5D55"
                  >
                    {getWorkLabel(work)}
                  </Typography>
                </Stack>
              ))}

              <Box
                sx={{
                  mt: 2,
                  p: 1.8,
                  borderRadius: 3,
                  bgcolor: "#FFF9E8",
                  border:
                    "1px solid #F2E4B4",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="flex-start"
                >
                  <AlertTriangle
                    size={18}
                    color="#A47700"
                  />

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
                      Follow the preparation
                      instructions shown for the
                      selected work before the visit.
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                endIcon={
                  <ArrowRight size={17} />
                }
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
            </>
          ) : (
            <Box>
              <Typography
                fontWeight={800}
                color="#183B2A"
              >
                No visit scheduled
              </Typography>

              <Typography
                fontSize={13}
                color="#6B756E"
                sx={{ mt: 0.5 }}
              >
                Your next visit will appear here
                once it is scheduled.
              </Typography>
            </Box>
          )}
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
        <CardContent
          sx={{ p: { xs: 2.5, sm: 3 } }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                fontWeight={800}
                color="#183B2A"
              >
                {remainingVisits}{" "}
                {remainingVisits === 1
                  ? "Visit"
                  : "Visits"}{" "}
                Remaining
              </Typography>

              <Typography
                fontSize={13}
                color="#6B756E"
              >
                Available in your current plan
              </Typography>
            </Box>

            <Chip
              label={
                remainingVisits > 0
                  ? "Available"
                  : "Used"
              }
              size="small"
              sx={{
                bgcolor:
                  remainingVisits > 0
                    ? "#E8F5E9"
                    : "#F1F3F1",
                color:
                  remainingVisits > 0
                    ? "#2E7D32"
                    : "#66756C",
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
        <CardContent
          sx={{ p: { xs: 2.5, sm: 3 } }}
        >
          {lastVisit ? (
            <>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
              >
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
                  <Typography
                    fontWeight={800}
                    color="#183B2A"
                  >
                    {lastVisit.service ||
                      "Routine Maintenance"}
                  </Typography>

                  <Typography
                    fontSize={13}
                    color="#6B756E"
                  >
                    {formatDate(
                      lastVisit.visitDate
                    )}{" "}
                    •{" "}
                    {formatTime(
                      lastVisit.visitTime
                    )}
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
                <UserRound
                  size={17}
                  color="#66756C"
                />

                <Typography
                  fontSize={14}
                  color="#4F5D55"
                >
                  Gardener:{" "}
                  {getGardenerName(
                    lastVisit
                  )}
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

              {lastWork.map((work, index) => {
                const verification =
                  getVerificationValue(
                    lastVisit,
                    work
                  );

                return (
                  <Stack
                    key={`${getWorkLabel(
                      work
                    )}-${index}`}
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 0.8 }}
                  >
                    <Typography
                      fontSize={14}
                      color="#4F5D55"
                    >
                      {getWorkLabel(work)}
                    </Typography>

                    <Chip
                      label={verification}
                      size="small"
                      icon={
                        verification ===
                        "Yes" ? (
                          <CheckCircle2
                            size={14}
                          />
                        ) : undefined
                      }
                      sx={{
                        bgcolor:
                          verification ===
                          "Yes"
                            ? "#E8F5E9"
                            : "#FFF9E8",
                        color:
                          verification ===
                          "Yes"
                            ? "#2E7D32"
                            : "#755900",
                        fontWeight: 700,
                      }}
                    />
                  </Stack>
                );
              })}

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

              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
              >
                {[1, 2, 3, 4, 5].map(
                  (item) => (
                    <Star
                      key={item}
                      size={20}
                      fill={
                        item <= rating
                          ? "#F5B82E"
                          : "none"
                      }
                      color="#F5B82E"
                    />
                  )
                )}

                <Typography
                  fontSize={13}
                  color="#66756C"
                  sx={{ ml: 0.8 }}
                >
                  {rating > 0
                    ? rating.toFixed(1)
                    : "Not rated"}
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
            </>
          ) : (
            <Box>
              <Typography
                fontWeight={800}
                color="#183B2A"
              >
                No completed visit yet
              </Typography>

              <Typography
                fontSize={13}
                color="#6B756E"
                sx={{ mt: 0.5 }}
              >
                Your completed visit record will
                appear here.
              </Typography>
            </Box>
          )}
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

