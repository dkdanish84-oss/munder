import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import { getCategories } from "../../utils/categoryStorage";

const units = [
  "Nos",
  "Kg",
  "Bag",
  "Pot",
  "Tray",
  "Litre",
  "Meter",
];

const emptyForm = {
  name: "",
  category: "",
  sku: "",
  unit: "Nos",
  sellingPrice: "",
  purchasePrice: "",
  stock: "",
  description: "",
};

export default function ProductDialog({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(getCategories());

    if (initialData) {
      setForm(initialData);
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;

    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Edit Product" : "Add Product"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>

          <TextField
            label="Product Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Category"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            fullWidth
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="SKU"
            value={form.sku}
            onChange={(e) => handleChange("sku", e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Unit"
            value={form.unit}
            onChange={(e) => handleChange("unit", e.target.value)}
            fullWidth
          >
            {units.map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Selling Price"
            type="number"
            value={form.sellingPrice}
            onChange={(e) =>
              handleChange("sellingPrice", e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Purchase Price"
            type="number"
            value={form.purchasePrice}
            onChange={(e) =>
              handleChange("purchasePrice", e.target.value)
            }
            fullWidth
          />

          <TextField
            label="Opening Stock"
            type="number"
            value={form.stock}
            onChange={(e) => handleChange("stock", e.target.value)}
            fullWidth
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) =>
              handleChange("description", e.target.value)
            }
            fullWidth
          />

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

