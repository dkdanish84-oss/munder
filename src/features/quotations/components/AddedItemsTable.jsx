import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function AddedItemsTable({
  items = [],
  onDelete,
}) {
  const total = items.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return (
    <Card variant="outlined">
      <CardContent>

        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ mb: 2 }}
        >
          Added Products
        </Typography>

        <TableContainer>

          <Table size="small">

            <TableHead>

              <TableRow>

                <TableCell>Product</TableCell>

                <TableCell align="center">
                  Qty
                </TableCell>

                <TableCell align="right">
                  Rate
                </TableCell>

                <TableCell align="right">
                  Amount
                </TableCell>

                <TableCell align="center">
                  Action
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {items.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                  >
                    No products added.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => (
                  <TableRow key={index} hover>

                    <TableCell>
                      {item.product}
                    </TableCell>

                    <TableCell align="center">
                      {item.qty}
                    </TableCell>

                    <TableCell align="right">
                      ₹ {Number(item.rate).toLocaleString()}
                    </TableCell>

                    <TableCell align="right">
                      ₹ {Number(item.amount).toLocaleString()}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => onDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>

                  </TableRow>
                ))
              )}

            </TableBody>

          </Table>

        </TableContainer>

        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ mt: 2 }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Items Total : ₹ {total.toLocaleString()}
          </Typography>
        </Stack>


      </CardContent>
    </Card>
  );
}


