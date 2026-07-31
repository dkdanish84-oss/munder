import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import CustomerForm from "../features/customers/CustomerForm";
import CustomerList from "../features/customers/CustomerList";
import {
  getCustomers,
  saveCustomers,
} from "../features/customers/customerStorage";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    setCustomers(getCustomers());
  }, []);

  const saveAll = (updated) => {
    setCustomers(updated);
    saveCustomers(updated);
  };

  const handleSave = (customer) => {
    if (editingCustomer) {
      const updated = customers.map((c) =>
        c.id === editingCustomer.id
          ? { ...customer, id: editingCustomer.id }
          : c
      );

      saveAll(updated);
      setEditingCustomer(null);
    } else {
      const updated = [
        ...customers,
        {
          id: Date.now(),
          ...customer,
        },
      ];

      saveAll(updated);
    }
  };

  const handleDelete = (id) => {
    const updated = customers.filter((c) => c.id !== id);
    saveAll(updated);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        👥 Customer Management
      </Typography>

      <CustomerForm
        onSave={handleSave}
        editingCustomer={editingCustomer}
      />

      <CustomerList
        customers={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Box>
  );
}
