import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export default function LeadList({ leads }) {
  return (
    <Card sx={{ mt: 3, borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Lead List
        </Typography>

        {leads.length === 0 ? (
          <Typography color="text.secondary">
            No leads added yet.
          </Typography>
        ) : (
          <List>
            {leads.map((lead, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText
                    primary={lead.name}
                    secondary={`${lead.mobile} • ${lead.city}`}
                  />
                </ListItem>
                {index < leads.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}

