import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

export default function StockDialog({
  open,
  onClose,
  onSave,
  title,
}) {
  const [qty, setQty] = useState("");

  const handleSave = () => {
    const value = Number(qty);

    if (!value || value <= 0) return;

    onSave(value);

    setQty("");

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Stack sx={{ mt: 2 }}>
          <TextField
            label="Quantity"
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

