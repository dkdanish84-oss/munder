import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import QuotationForm from "../features/quotations/QuotationForm";
import QuotationItems from "../features/quotations/QuotationItems";

import {
  getQuotations,
  saveQuotation,
  updateQuotation,
  deleteQuotation,
} from "../features/quotations/quotationStorage";

import { getCustomers } from "../features/customers/customerStorage";

export default function Quotations() {
  const [quotations, setQuotations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const refreshQuotations = () => {
    setQuotations(getQuotations());
    setCustomers(getCustomers());
  };

  useEffect(() => {
    refreshQuotations();
  }, []);

  const filteredQuotations = useMemo(() => {
    return quotations.filter((q) => {
      const text = search.toLowerCase();

      return (
        q.customer?.toLowerCase().includes(text) ||
        q.mobile?.toLowerCase().includes(text) ||
        q.title?.toLowerCase().includes(text) ||
        q.quotationNo?.toLowerCase().includes(text)
      );
    });
  }, [quotations, search]);


  const handleSave = (data) => {
    saveQuotation(data);
    refreshQuotations();
    setOpenForm(false);
  };

  const handleUpdate = (data) => {
    updateQuotation(editingQuotation.id, data);
    refreshQuotations();
    setEditingQuotation(null);
  };

  const handleDelete = () => {
    if (!selectedQuotation) return;

    deleteQuotation(selectedQuotation.id);
    refreshQuotations();
    setSelectedQuotation(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">
          Quotations
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
        >
          New Quotation
        </Button>
      </Stack>

      <TextField
        fullWidth
        label="Search quotation"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Stack spacing={2}>
        {filteredQuotations.map((quotation) => (
          <Card key={quotation.id}>
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h6">
                    {quotation.title}
                  </Typography>

                  <Typography variant="body2">
                    {quotation.customer}
                  </Typography>

                  <Typography variant="body2">
                    {quotation.mobile}
                  </Typography>
                </Box>

                <QuotationItems
                  items={quotation.items}
                  readOnly
                />

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setSelectedQuotation(quotation)}
                  >
                    View
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setEditingQuotation({ ...quotation })}
                  >
                    Edit
                  </Button>

                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    onClick={() => setSelectedQuotation(quotation)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <QuotationForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
        customers={customers}
      />

      <Dialog
        open={Boolean(editingQuotation)}
        onClose={() => setEditingQuotation(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Quotation</DialogTitle>

        <DialogContent>
          {editingQuotation && (
            <QuotationForm
              editMode
              initialData={editingQuotation}
              customers={customers}
              embedded
              onSave={handleUpdate}
              onClose={() => setEditingQuotation(null)}
            />
          )}
        </DialogContent>
      </Dialog>


      <Dialog
        open={Boolean(selectedQuotation)}
        onClose={() => setSelectedQuotation(null)}
      >
        <DialogTitle>Delete Quotation</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this quotation?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setSelectedQuotation(null)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>


    </Container>
  );
}



