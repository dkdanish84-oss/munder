import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function CategoryDialog({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData, open]);

  const handleSave = () => {
    if (!name.trim()) return;

    onSave({
      ...initialData,
      name: name.trim(),
      description: description.trim(),
    });

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {initialData ? "Edit Category" : "Add Category"}
      </DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          multiline
          rows={3}
          label="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />
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

