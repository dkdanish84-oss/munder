import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';



export default function Cart() {
  const navigate = useNavigate();

  const [months, setMonths] = useState(1);

  const plan = JSON.parse(
    localStorage.getItem('munder_selected_plan') ||
      '{"name":"Basic Care Plan","price":1499}'
  );

  const garden = JSON.parse(
    localStorage.getItem('munder_garden') ||
      '{"size":"200 sq ft"}'
  );

  const subtotal = plan.price * months;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  const increase = () => setMonths(months + 1);

  const decrease = () => {
    if (months > 1) {
      setMonths(months - 1);
    }
  };

  const proceedCheckout = () => {
    localStorage.setItem('munder_cart_total', grandTotal);
    localStorage.setItem('munder_cart_months', months);
    navigate('/checkout');
  };

  return (
    <Box p={3} pb={12}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        color="#0e4d28"
      >
        Order Summary
      </Typography>

      <Card
        sx={{
          my: 2,
          borderRadius: 3,
          boxShadow: 2
        }}
      >
        <CardContent>

          <Typography variant="h6" fontWeight="bold">
            {plan.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Garden Size : {garden.size}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>
              Duration (Months)
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                onClick={decrease}
              >
                -
              </Button>

              <Typography
                sx={{
                  width: 25,
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                {months}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={increase}
              >
                +
              </Button>
            </Stack>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Box display="flex" justifyContent="space-between">
            <Typography>Subtotal</Typography>
            <Typography>₹{subtotal}</Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            mt={1}
          >
            <Typography>GST (18%)</Typography>
            <Typography>₹{gst}</Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            mt={1}
          >
            <Typography color="success.main">
              First Visit Fee
            </Typography>

            <Typography
              color="success.main"
              fontWeight="bold"
            >
              FREE
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            display="flex"
            justifyContent="space-between"
          >
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Grand Total
            </Typography>

            <Typography
              variant="h6"
              fontWeight="bold"
              color="#0e4d28"
            >
              ₹{grandTotal}
            </Typography>
          </Box>

        </CardContent>
      </Card>

      <TextField
        disabled
        fullWidth
        size="small"
        label="Coupon Code"
        placeholder="Coming Soon"
      />

      <Typography
        variant="caption"
        color="text.secondary"
      >
        Coupons & Discounts coming soon.
      </Typography>

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          py: 1.5,
          bgcolor: '#0e4d28'
        }}
        onClick={proceedCheckout}
      >
        Proceed to Checkout →
      </Button>
    </Box>
);
}


