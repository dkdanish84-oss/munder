import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function CustomerList({
  customers,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const text =
        `${customer.name} ${customer.mobile} ${customer.city}`
          .toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [customers, search]);

  return (
    <Card sx={{ mt: 3, borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Customer List
        </Typography>

        <TextField
          fullWidth
          label="Search Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />

        {filteredCustomers.length === 0 ? (
          <Typography color="text.secondary">
            No customers found.
          </Typography>
        ) : (
          <List>
            {filteredCustomers.map((customer) => (
              <div key={customer.id}>
                <ListItem
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        component="a"
                        href={`tel:${customer.mobile}`}
                        color="primary"
                      >
                        <CallIcon />
                      </IconButton>

                      <IconButton
                        component="a"
                        href={`https://wa.me/91${customer.mobile}`}
                        target="_blank"
                        color="success"
                      >
                        <WhatsAppIcon />
                      </IconButton>

                      <IconButton
                        color="warning"
                        onClick={() => onEdit(customer)}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        color="error"



onClick={() => setSelectedCustomer(customer)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={customer.name}
                    secondary={`${customer.mobile} • ${customer.city} • ${customer.plan}`}
                  />
                </ListItem>

                <Divider />
              </div>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
