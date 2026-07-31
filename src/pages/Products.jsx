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

import ProductDialog from "../components/products/ProductDialog";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/products/productStorage";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadData = () => {
    setProducts(getProducts());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = (data) => {
    if (data.id) {
      updateProduct(data);
    } else {
      addProduct(data);
    }

    loadData();
  };

  const filtered = products.filter((item) =>
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
        <Typography variant="h4">
          Products
        </Typography>

        <Button
          variant="contained"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Add Product
        </Button>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search product..."
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
                    deleteProduct(item.id);
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
              secondary={`${item.category} • ${item.unit} • Stock: ${item.stock} • ₹${item.sellingPrice}`}
            />
          </ListItem>
        ))}
      </List>

      <ProductDialog
        open={open}
        onClose={() => setOpen(false)}
        initialData={editing}
        onSave={handleSave}
      />
    </Paper>
  );
}

