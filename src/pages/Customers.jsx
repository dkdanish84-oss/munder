import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
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

const API_URL = "";

export default function Customers() {
  const token = useAuthStore((state) => state.token);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/admin/customers`,
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      if (!response.ok) {
        throw new Error("Customers data could not be loaded");
      }

      const data = await response.json();

      setCustomers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("CUSTOMERS LOAD ERROR:", err);
      setError(
        "Customer data load nahi ho saka. Server aur login check karein."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
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
            Customers
          </Typography>

          <Typography color="text.secondary">
            Plan ya paid service purchase karne wale customers
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={loadCustomers}
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

      <Paper elevation={0} sx={{ border: "1px solid #e5e7eb" }}>
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
        ) : customers.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="text.secondary">
              Abhi koi purchased customer available nahi hai.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Customer</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                  <TableCell><b>Plan / Service</b></TableCell>
                  <TableCell><b>Payment</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Renewal Date</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.uid || customer.customerId}>
                    <TableCell>
                      <Typography fontWeight={700}>
                        {customer.name || "Unknown Customer"}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {customer.email || "-"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      {customer.phone || "-"}
                    </TableCell>

                    <TableCell>
                      {customer.plan?.name ||
                        customer.lastPayment?.plan ||
                        "Purchased Service"}
                    </TableCell>

                    <TableCell>
                      {customer.lastPayment
                        ? `₹${customer.lastPayment.amount || 0}`
                        : "-"}
                    </TableCell>

                    <TableCell>
                      {customer.status || "CUSTOMER"}
                    </TableCell>

                    <TableCell>
                      {customer.plan?.renewalDate
                        ? new Date(
                            customer.plan.renewalDate
                          ).toLocaleDateString()
                        : "-"}
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



