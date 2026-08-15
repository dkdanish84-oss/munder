import { useMemo, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { getProducts } from "../../products/productStorage";

export default function AddProductCard({ onAddItem }) {

  const products = useMemo(() => getProducts(), []);

  const [form, setForm] = useState({
    product: "",
    qty: 1,
    rate: 0,
  });

  const updateField = (field, value) => {

    const next = {
      ...form,
      [field]: value,
    };

    if (field === "product") {

      const selected = products.find(
        (p) => p.name === value
      );






if (selected) {
  next.rate = Number(
    selected.sellingPrice ??
    selected.price ??
    selected.rate ??
    0
  );
}    }

    setForm(next);
  };

  const handleAdd = () => {

    if (!form.product) return;



onAddItem({
  ...form,
  qty: Number(form.qty),
  rate: Number(form.rate),
  amount:
    Number(form.qty) *
    Number(form.rate),
});

    setForm({
      product: "",
      qty: 1,
      rate: 0,
    });
  };

  return (

    <Card variant="outlined">
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ mb: 2 }}
        >
          Add Product
        </Typography>

        <Stack spacing={2}>

          <TextField
            select
            fullWidth
            label="Product"
            value={form.product}
            onChange={(e) =>
              updateField("product", e.target.value)
            }
          >
            {products.map((product) => (
              <MenuItem
                key={product.id}
                value={product.name}
              >
                {product.name}
              </MenuItem>
            ))}
          </TextField>

          <Grid container spacing={2}>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={form.qty}
                onChange={(e) =>
                  updateField("qty", e.target.value)
                }
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                label="Rate"
                type="number"
                value={form.rate}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

          </Grid>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            size="large"
          >
            Add Item
          </Button>

        </Stack>

      </CardContent>
    </Card>

    );
}


