import { useAppSelector } from "../hooks/useAppDispatch";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import type { SubscriptionData } from "../store/subscription";

export default function DataTable() {
  const data = useAppSelector(
    (state) => state.subscription.submitted
  ) as SubscriptionData | null;

  if (!data) return <div>No subscription data yet</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Base Amount</TableCell>
          <TableCell>Total Amount</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Discount (%)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{data.title}</TableCell>
          <TableCell>₹{data.amount?.toFixed(2)}</TableCell>
          <TableCell>₹{data.totalAmount?.toFixed(2)}</TableCell>
          <TableCell>
            {data.items?.length
              ? data.items.map((it) => it.quantity).join(", ")
              : "-"}
          </TableCell>
          <TableCell>{data.discount ?? "-"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
