import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const emptyCustomer = {
  name: "",
  mobile: "",
  email: "",
  city: "",
  address: "",
  gardenSize: "",
  plan: "Basic",
  notes: "",
};

export default function CustomerForm({
  onSave,
  editingCustomer,
}) {

  const [customer, setCustomer] = useState(emptyCustomer);

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
  });

  useEffect(() => {

    if (editingCustomer) {
      setCustomer(editingCustomer);
    } else {
      setCustomer(emptyCustomer);
    }

    setErrors({
      name: "",
      mobile: "",
    });

  }, [editingCustomer]);




  const handleChange = (field) => (event) => {
    setCustomer((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!customer.name.trim()) {
      newErrors.name = "Customer name is required";
    }

    if (!customer.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(customer.mobile)) {
      newErrors.mobile = "Enter a valid 10 digit mobile number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave(customer);

    if (!editingCustomer) {
      setCustomer(emptyCustomer);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
      }}
    >
      <CardContent>

        <Typography
          variant="h5"
          fontWeight="bold"
        >
          {editingCustomer
            ? "Edit Customer"
            : "Add Customer"}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Fill customer information below.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Customer Name"
              value={customer.name}
              onChange={handleChange("name")}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Mobile Number"
              value={customer.mobile}
              onChange={handleChange("mobile")}
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              value={customer.email}
              onChange={handleChange("email")}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="City"
              value={customer.city}
              onChange={handleChange("city")}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Address"
              value={customer.address}
              onChange={handleChange("address")}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Garden Size"
              placeholder="Example: 1000 sq.ft"
              value={customer.gardenSize}
              onChange={handleChange("gardenSize")}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              label="Maintenance Plan"
              value={customer.plan}
              onChange={handleChange("plan")}
            >
              <MenuItem value="Basic">Basic</MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
              <MenuItem value="Annual">Annual</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes"
              value={customer.notes}
              onChange={handleChange("notes")}
              placeholder="Write customer requirements..."
            />
          </Grid>

        </Grid>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
        >

          {editingCustomer && (
            <Button
              variant="outlined"
              onClick={() => setCustomer(emptyCustomer)}
            >
              Cancel
            </Button>
          )}

          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleSubmit}
          >
            {editingCustomer
              ? "Update Customer"
              : "Save Customer"}
          </Button>

        </Stack>

      </CardContent>

    </Card>
  );
}
