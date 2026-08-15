import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function QuotationItems({
  items = [],
  setItems,
  products = [],
  readOnly = false,
}) {
  const emptyItem = {
    productId: "",
    product: "",
    qty: 1,
    rate: 0,
    amount: 0,
  };

  const [draft, setDraft] = useState(emptyItem);

  const handleProduct = (e) => {
    const id = e.target.value;

    const product =
      products.find((p) => String(p.id) === String(id)) || {};

    const rate = Number(
      product.price ??
        product.rate ??
        product.salePrice ??
        0
    );

    setDraft({
      productId: id,
      product: product.name || "",
      qty: 1,
      rate,
      amount: rate,
    });
  };

  const handleQty = (e) => {
    const qty = Number(e.target.value || 1);

    setDraft((prev) => ({
      ...prev,
      qty,
      amount: qty * Number(prev.rate),
    }));
  };

  const handleRate = (e) => {
    const rate = Number(e.target.value || 0);

    setDraft((prev) => ({
      ...prev,
      rate,
      amount: rate * Number(prev.qty),
    }));
  };

  const addItem = () => {
    if (!draft.product) return;

    setItems([
      ...items,
      {
        ...draft,
      },
    ]);

    setDraft(emptyItem);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
  }, [items]);

  return (
    <Stack spacing={3}>

      {!readOnly && (
        <>
          <Paper variant="outlined" sx={{ p: 2 }}>

            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              Add Product
            </Typography>

            <Stack spacing={2}>


              <TextField
                select
                fullWidth
                label="Product"
                value={draft.productId}
                onChange={handleProduct}
              >
                {products.map((product) => (
                  <MenuItem
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </MenuItem>
                ))}
              </TextField>

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  label="Qty"
                  type="number"
                  value={draft.qty}
                  onChange={handleQty}
                />

                <TextField
                  fullWidth
                  label="Rate"
                  type="number"
                  value={draft.rate}
                  onChange={handleRate}
                />
              </Stack>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={addItem}
              >
                Add Product
              </Button>
            </Stack>
          </Paper>

          <Divider />
        </>
      )}

      <Typography variant="h6" fontWeight={700}>
        Added Products
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Amount</TableCell>

              {!readOnly && (
                <TableCell align="center">
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={readOnly ? 4 : 5}
                  align="center"
                >
                  No products added.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.product}</TableCell>
                  <TableCell align="center">{item.qty}</TableCell>
                  <TableCell align="right">
                    ₹ {Number(item.rate).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    ₹ {Number(item.amount).toLocaleString()}
                  </TableCell>

                  {!readOnly && (
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => deleteItem(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end">
        <Typography variant="h6" fontWeight={700}>
          Items Total : ₹ {total.toLocaleString()}
        </Typography>
      </Box>
    </Stack>
  );
}


