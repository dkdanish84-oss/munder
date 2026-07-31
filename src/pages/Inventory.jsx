import { useEffect, useState } from "react";

import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Button,
} from "@mui/material";

import { getProducts } from "../features/products/productStorage";

import {
  getInventory,
  addStock,
  removeStock,
} from "../features/inventory/inventoryStorage";

import StockDialog from "../components/inventory/StockDialog";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockMode, setStockMode] = useState("");

  const refreshInventory = () => {
    setProducts(getProducts());
    setInventory(getInventory());
  };

  useEffect(() => {
    refreshInventory();
  }, []);

  const getStock = (productId) => {
    const item = inventory.find((i) => i.productId === productId);
    return item ? item.stock : 0;
  };

  const handleStockSave = (qty) => {
    if (!selectedProduct) return;

    if (stockMode === "in") {
      addStock(selectedProduct.id, qty);
    } else {
      removeStock(selectedProduct.id, qty);
    }

    refreshInventory();

    setSelectedProduct(null);
    setStockMode("");
  };

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        Inventory
      </Typography>

      <TextField
        fullWidth
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <List>
        {filtered.map((product) => {
          const stock = getStock(product.id);

          return (
            <ListItem
              key={product.id}
              divider
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <ListItemText
                primary={product.name}
                secondary={`Category: ${product.category} | Stock: ${stock}`}
                primaryTypographyProps={{
                  color: stock <= 5 ? "error" : "inherit",
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1 }}
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    setSelectedProduct(product);
                    setStockMode("in");
                  }}
                >
                  Stock In
                </Button>

                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    setSelectedProduct(product);
                    setStockMode("out");
                  }}
                >
                  Stock Out
                </Button>
              </Stack>
            </ListItem>
          );
        })}
      </List>

      <StockDialog
        open={Boolean(selectedProduct)}
        title={
          stockMode === "in"
            ? "Add Stock"
            : "Remove Stock"
        }
        onClose={() => {
          setSelectedProduct(null);
          setStockMode("");
        }}
        onSave={handleStockSave}
      />
    </Paper>
  );
}

