import { useEffect, useMemo, useState } from "react";

import {
Button,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddProductCard from "./components/AddProductCard";
import AddedItemsTable from "./components/AddedItemsTable";

import { getCustomers } from "../customers/customerStorage";

const emptyForm = {
  customer: "",
  title: "",
  labour: 0,
  transport: 0,
  discount: 0,
  notes: "",
  items: [],
};

export default function QuotationForm({
  initialData,
  customers: customersProp,
  onSave,
  onClose,
  editMode = false,
}) {

  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {

    setCustomers(
      customersProp?.length
        ? customersProp
        : getCustomers()
    );

    if (initialData) {
      setForm({
        ...emptyForm,
        ...initialData,
        items: initialData.items || [],
      });
    }

  }, [customersProp, initialData]);

  const addItem = (item) => {

    setForm((prev) => ({
      ...prev,
      items: [...prev.items, item],
    }));

  };

  const deleteItem = (index) => {

    setForm((prev) => ({
      ...prev,
      items: prev.items.filter(
        (_, i) => i !== index
      ),
    }));

  };

  const itemsTotal = useMemo(() => {

    return form.items.reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );

  }, [form.items]);


  const grandTotal =
    itemsTotal +
    Number(form.labour || 0) +
    Number(form.transport || 0) -
    Number(form.discount || 0);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave({
      ...form,
      total: grandTotal,
    });
  };

  return (
    <Card elevation={0}>
      <CardContent>

        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 3 }}
        >
          {editMode ? "Edit Quotation" : "New Quotation"}
        </Typography>

        <Stack spacing={3}>

          <TextField
            select
            fullWidth
            label="Customer"
            value={form.customer}
            onChange={(e) =>
              updateField("customer", e.target.value)
            }
          >
            {customers.map((customer) => (
              <MenuItem
                key={customer.id}
                value={customer.name}
              >
                {customer.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Quotation Title"
            value={form.title}
            onChange={(e) =>
              updateField("title", e.target.value)
            }
          />

          <AddProductCard
            onAddItem={addItem}
          />

          <AddedItemsTable
            items={form.items}
            onDelete={deleteItem}
          />

          <Divider />

          <Stack direction="row" spacing={2}>

            <TextField
              fullWidth
              label="Labour"
              type="number"
              value={form.labour}
              onChange={(e) =>
                updateField("labour", e.target.value)
              }
            />

            <TextField
              fullWidth
              label="Transport"
              type="number"
              value={form.transport}
              onChange={(e) =>
                updateField("transport", e.target.value)
              }
            />

          </Stack>


          <Stack direction="row" spacing={2}>

            <TextField
              fullWidth
              label="Discount"
              type="number"
              value={form.discount}
              onChange={(e) =>
                updateField("discount", e.target.value)
              }
            />

            <TextField
              fullWidth
              label="Grand Total"
              value={grandTotal}
              InputProps={{
                readOnly: true,
              }}
            />

          </Stack>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Notes"
            value={form.notes}
            onChange={(e) =>
              updateField("notes", e.target.value)
            }
          />

          <Divider />

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
          >
            <TextField
              label="Items Total"
              value={itemsTotal}
              InputProps={{
                readOnly: true,
              }}
              sx={{ maxWidth: 180 }}
            />

            <TextField
              label="Grand Total"
              value={grandTotal}
              InputProps={{
                readOnly: true,
              }}
              sx={{ maxWidth: 180 }}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-end"
          >
            <Button
              variant="outlined"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSave}
            >
              {editMode
                ? "Update Quotation"
                : "Save Quotation"}
            </Button>
          </Stack>

        </Stack>

      </CardContent>
    </Card>
  );
}

