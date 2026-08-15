import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Divider,
  Grid,
  Paper,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";


import PrintIcon from "@mui/icons-material/Print";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import QuotationForm from "../features/quotations/QuotationForm";
import QuotationItems from "../features/quotations/QuotationItems";

import {
  getQuotations,
  saveQuotation,
  updateQuotation,
  deleteQuotation,
} from "../features/quotations/quotationStorage";

import {
  getCustomers,
} from "../features/customers/customerStorage";

export default function Quotations() {

  const [quotations, setQuotations] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [editingQuotation, setEditingQuotation] = useState(null);

  const [viewQuotation, setViewQuotation] = useState(null);

  const [deleteQuotationData, setDeleteQuotationData] =
    useState(null);


const handlePrint = () => {
  window.print();
};


const handleWhatsApp = () => {
  if (!viewQuotation) return;

  const items = viewQuotation.items || [];

  const productList =
    items.length > 0
      ? items
          .map(
            (item, index) =>
              `${index + 1}. ${item.product}
Qty: ${item.qty} × ₹${item.rate} = ₹${item.amount}`
          )
          .join("\n\n")
      : "No products added.";

  const productTotal = items.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const message = `📄 *QUOTATION*

🏢 *${viewQuotation.title || "Quotation"}*

Quotation No: ${viewQuotation.quotationNo || "-"}
Date: ${viewQuotation.date || "-"}

👤 *Customer*
${viewQuotation.customer || "-"}
📞 ${viewQuotation.mobile || "-"}

━━━━━━━━━━━━━━

🛒 *Products*

${productList}

━━━━━━━━━━━━━━

💰 *Summary*

Product Total : ₹${productTotal}
Labour : ₹${Number(viewQuotation.labour || 0)}
Transport : ₹${Number(viewQuotation.transport || 0)}
Discount : ₹${Number(viewQuotation.discount || 0)}

━━━━━━━━━━━━━━

✅ *Grand Total : ₹${Number(viewQuotation.total || 0)}*

${
  viewQuotation.notes
    ? `📝 Notes:
${viewQuotation.notes}

`
    : ""
}Thank you 🙏
*Munder OS*`;

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

  const refreshData = () => {
    setQuotations(getQuotations());
    setCustomers(getCustomers());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const filteredQuotations = useMemo(() => {

    const keyword = search.toLowerCase();

    return quotations.filter((q) => {

      return (
        q.customer?.toLowerCase().includes(keyword) ||
        q.mobile?.toLowerCase().includes(keyword) ||
        q.title?.toLowerCase().includes(keyword) ||
        q.quotationNo?.toLowerCase().includes(keyword)
      );

    });

  }, [quotations, search]);

  const handleCreate = (data) => {

    saveQuotation(data);

    refreshData();

    setOpenForm(false);

  };

  const handleUpdate = (data) => {

    updateQuotation(editingQuotation.id, data);

    refreshData();

    setEditingQuotation(null);

  };

  const handleDelete = () => {

    if (!deleteQuotationData) return;

    deleteQuotation(deleteQuotationData.id);

    refreshData();

    setDeleteQuotationData(null);

  };

  return (

    <Container maxWidth="lg" sx={{ py: 3 }}>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >

        <Typography variant="h4" fontWeight={700}>
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
      >
      </TextField>

      <Stack spacing={2}>

        {filteredQuotations.map((quotation) => (

          <Card
            key={quotation.id}
            elevation={2}
            sx={{ borderRadius: 3 }}
          >

            <CardContent>

              <Stack spacing={2}>

                <Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {quotation.title || "Untitled Quotation"}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Customer : {quotation.customer}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Mobile : {quotation.mobile}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Quotation No :
                    {" "}
                    {quotation.quotationNo || "-"}
                  </Typography>

                </Box>

                <Divider />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >

                  <Typography
                    variant="body1"
                    fontWeight={600}
                  >
                    Grand Total
                  </Typography>

                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight={700}
                  >
                    ₹ {Number(
                      quotation.total || 0
                    ).toLocaleString()}
                  </Typography>

                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                >

                  <Button
                    variant="contained"
                    onClick={() =>
                      setViewQuotation(quotation)
                    }
                  >
                    View
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() =>
                      setEditingQuotation(quotation)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() =>
                      setDeleteQuotationData(
                        quotation
                      )
                    }
                  >
                    Delete
                  </Button>

                </Stack>

              </Stack>

            </CardContent>

          </Card>

        ))}

      </Stack>

      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          New Quotation
        </DialogTitle>

        <DialogContent>

          <QuotationForm
            embedded
            customers={customers}
            onSave={handleCreate}
            onClose={() => setOpenForm(false)}
          />

        </DialogContent>

      </Dialog>



      <Dialog
        open={Boolean(viewQuotation)}
        onClose={() => setViewQuotation(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Quotation Details
        </DialogTitle>

        <DialogContent>

          {viewQuotation && (

            <Stack spacing={3} sx={{ mt: 1 }}>

              <Paper variant="outlined" sx={{ p: 2 }}>

                <Typography variant="h6" fontWeight={700}>
                  {viewQuotation.title}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography fontWeight={600}>
                      Customer
                    </Typography>
                    <Typography>
                      {viewQuotation.customer}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography fontWeight={600}>
                      Mobile
                    </Typography>
                    <Typography>
                      {viewQuotation.mobile}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography fontWeight={600}>
                      Quotation No.
                    </Typography>
                    <Typography>
                      {viewQuotation.quotationNo || "-"}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography fontWeight={600}>
                      Date
                    </Typography>
                    <Typography>
                      {viewQuotation.date || "-"}
                    </Typography>
                  </Grid>

                </Grid>

              </Paper>

              <QuotationItems
                items={viewQuotation.items || []}
                readOnly
              />

              <Paper variant="outlined" sx={{ p: 2 }}>

                <Stack spacing={1}>

                  <Typography>
                    Product Total :
                    ₹ {Number(
                      (
                        viewQuotation.items || []
                      ).reduce(
                        (sum, item) =>
                          sum + Number(item.amount || 0),
                        0
                      )
                    ).toLocaleString()}
                  </Typography>

                  <Typography>
                    Labour :
                    ₹ {Number(
                      viewQuotation.labour || 0
                    ).toLocaleString()}
                  </Typography>

                  <Typography>
                    Transport :
                    ₹ {Number(
                      viewQuotation.transport || 0
                    ).toLocaleString()}
                  </Typography>

                  <Typography>
                    Discount :
                    ₹ {Number(
                      viewQuotation.discount || 0
                    ).toLocaleString()}
                  </Typography>

                  <Divider />

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Grand Total :
                    ₹ {Number(
                      viewQuotation.total || 0
                    ).toLocaleString()}
                  </Typography>

                  {viewQuotation.notes && (
                    <>
                      <Divider />
                      <Typography fontWeight={600}>
                        Notes
                      </Typography>
                      <Typography>
                        {viewQuotation.notes}
                      </Typography>
                    </>
                  )}

                </Stack>

              </Paper>

            </Stack>

          )}

        </DialogContent>

<DialogActions
  sx={{
    px: 3,
    pb: 3,
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 1,
  }}
>
  <Button
    variant="outlined"
    startIcon={<PrintIcon />}
    onClick={handlePrint}
  >
    Print
  </Button>

  <Button
    variant="contained"
    color="success"
    startIcon={<WhatsAppIcon />}
    onClick={handleWhatsApp}
  >
    WhatsApp
  </Button>

  <Button
    onClick={() => setViewQuotation(null)}
  >
    Close
  </Button>
</DialogActions>



      </Dialog>


      <Dialog
        open={Boolean(editingQuotation)}
        onClose={() => setEditingQuotation(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Edit Quotation
        </DialogTitle>

        <DialogContent>

          {editingQuotation && (
            <QuotationForm
              editMode
              embedded
              initialData={editingQuotation}
              customers={customers}
              onSave={handleUpdate}
              onClose={() => setEditingQuotation(null)}
            />
          )}

        </DialogContent>

      </Dialog>

      <Dialog
        open={Boolean(deleteQuotationData)}
        onClose={() => setDeleteQuotationData(null)}
      >

        <DialogTitle>
          Delete Quotation
        </DialogTitle>

        <DialogContent>

          <DialogContentText>
            Are you sure you want to delete this quotation?
          </DialogContentText>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => setDeleteQuotationData(null)}
          >
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


