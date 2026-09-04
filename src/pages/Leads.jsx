import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const API_URL = "https://munder-p9yk.onrender.com";

export default function Leads() {
  const token = sessionStorage.getItem("munder-admin-token");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/admin/leads`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      if (!response.ok) {
        throw new Error("Leads data could not be loaded");
      }

      const result = await response.json();

      setLeads(
        Array.isArray(result.leads)
          ? result.leads
          : []
      );

    } catch (err) {
      console.error("LEADS LOAD ERROR:", err);

      setError(
        "Lead data load nahi ho saka. Server aur login check karein."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Leads
          </Typography>

          <Typography color="text.secondary">
            Visit booking aur enquiry users jinhone abhi purchase nahi kiya
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={loadLeads}
          disabled={loading}
          sx={{
            bgcolor: "#1B5E20",
            textTransform: "none",
          }}
        >
          Refresh
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 2,
        }}
      >
        {loading ? (
          <Box
            sx={{
              minHeight: 250,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : leads.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="text.secondary">
              Abhi koi active lead available nahi hai.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                  <TableCell><b>Service</b></TableCell>
                  <TableCell><b>Visit Date</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {leads.map((lead, index) => (
                  <TableRow
                    key={
                      lead.id ||
                      lead.visitId ||
                      lead.uid ||
                      index
                    }
                  >
                    <TableCell>
                      <Typography fontWeight={700}>
                        {lead.name ||
                          lead.customerName ||
                          "Unknown"}
                      </Typography>

                      {lead.email && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {lead.email}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell>
                      {lead.mobile || lead.phone || "-"}
                    </TableCell>

                    <TableCell>
                      {lead.service ||
                        lead.serviceName ||
                        lead.planName ||
                        "Garden Visit"}
                    </TableCell>

                    <TableCell>
                      {lead.visitDate
                        ? new Date(
                            lead.visitDate
                          ).toLocaleDateString()
                        : lead.createdAt
                        ? new Date(
                            lead.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </TableCell>

                    <TableCell>
                      {lead.status || "PENDING"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
