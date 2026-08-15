import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CategoryDialog from "../components/categories/CategoryDialog";

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../utils/categoryStorage";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadData = () => {
    setCategories(getCategories());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = (data) => {
    if (data.id) {
      updateCategory(data);
    } else {
      addCategory(data);
    }

    loadData();
  };

  const filtered = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Categories
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Add Category
        </Button>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <List>
        {filtered.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <>
                <IconButton
                  onClick={() => {
                    setEditing(item);
                    setOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => {
                    deleteCategory(item.id);
                    loadData();
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={item.name}
              secondary={item.description}
            />
          </ListItem>
        ))}
      </List>

      <CategoryDialog
        open={open}
        onClose={() => setOpen(false)}
        initialData={editing}
        onSave={handleSave}
      />

    </Paper>

);


}

