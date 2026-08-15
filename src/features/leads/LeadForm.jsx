import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

export default function LeadForm({ onSave }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [gardenSize, setGardenSize] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSave = () => {
    if (!name.trim() || !mobile.trim()) return;

    onSave({
      name,
      mobile,
      city,
      gardenSize,
      remarks,
    });

    setName("");
    setMobile("");
    setCity("");
    setGardenSize("");
    setRemarks("");
  };

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Add New Lead
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          <TextField
            label="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            fullWidth
          />

          <TextField
            label="City / Area"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
          />

          <TextField
            label="Garden Size"
            value={gardenSize}
            onChange={(e) => setGardenSize(e.target.value)}
            fullWidth
          />

          <TextField
            label="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />

          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleSave}
          >
            Save Lead
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
