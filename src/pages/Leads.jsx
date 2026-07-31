import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import LeadForm from "../features/leads/LeadForm";
import LeadList from "../features/leads/LeadList";
import { getLeads, saveLeads } from "../features/leads/leadStorage";

export default function Leads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const storedLeads = getLeads();
    setLeads(storedLeads);
  }, []);

  const addLead = (lead) => {
    const newLead = {
      id: Date.now(),
      ...lead,
    };

    setLeads((prev) => {
      const updated = [...prev, newLead];
      saveLeads(updated);
      return updated;
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        👥 Lead Management
      </Typography>

      <LeadForm onSave={addLead} />

      <LeadList leads={leads} />
    </Box>
  );
}
