import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { submitSubscription } from "../store/subscriptionSlice";
import { useMemo, useState } from "react";
import ItemSelect from "./ItemSelect";

export default function SubscriptionForm() {
  const dispatch = useAppDispatch();
  const [showTotal, setShowTotal] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      discount: 0,
      manualTotalAmount: "",
      items: [{ item: "", amount: 0, quantity: 1 }],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      discount: Yup.number().min(0).max(100),
      manualTotalAmount: Yup.number().min(0).nullable(),
    }),
    onSubmit: (values) => {
      if (values.items.some((i) => !i.item)) {
        alert("Please select all items before submitting");
        return;
      }
      const amount = values.items.reduce(
        (acc, curr) => acc + curr.amount * curr.quantity,
        0
      );
      const totalAmount =
        values.manualTotalAmount !== "" && values.manualTotalAmount !== null
          ? Number(values.manualTotalAmount)
          : amount - amount * (values.discount / 100);
      dispatch(submitSubscription({ ...values, amount, totalAmount }));
    },
  });

  const totalAmount = useMemo(() => {
    const base = formik.values.items.reduce(
      (sum, i) => sum + i.amount * i.quantity,
      0
    );
    return base - base * (formik.values.discount / 100);
  }, [formik.values]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 3 }}>
      <TextField
        name="title"
        label="Title"
        fullWidth
        sx={{ mb: 2 }}
        value={formik.values.title}
        onChange={formik.handleChange}
        error={!!formik.errors.title}
        helperText={formik.errors.title}
      />
      <TextField
        name="discount"
        label="Discount (%)"
        type="number"
        fullWidth
        sx={{ mb: 2 }}
        value={formik.values.discount}
        onChange={formik.handleChange}
        error={!!formik.errors.discount}
        helperText={formik.errors.discount}
        disabled={formik.values.manualTotalAmount !== ""}
      />

      <TextField
        name="manualTotalAmount"
        label="Total Amount"
        type="number"
        fullWidth
        sx={{ mb: 2 }}
        value={formik.values.manualTotalAmount}
        onChange={formik.handleChange}
        error={!!formik.errors.manualTotalAmount}
        helperText={formik.errors.manualTotalAmount}
        disabled={formik.values.discount > 0}
      />

      {formik.values.items.map((item, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <ItemSelect
              name={`items[${index}].item`}
              value={formik.values.items[index].item}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Base Amount"
              name={`items[${index}].amount`}
              type="number"
              value={item.amount}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Quantity"
              name={`items[${index}].quantity`}
              type="number"
              value={item.quantity}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      ))}

      {/* <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() =>
          formik.setFieldValue("items", [
            ...formik.values.items,
            { item: "", amount: 0, quantity: 1 },
          ])
        }
      >
        Add Item
      </Button> */}

      <Grid container spacing={2}>
        <Grid item>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={() => setShowTotal(true)}>
            Show Total
          </Button>
        </Grid>
      </Grid>

      {showTotal && (
        <Typography mt={2}>
          Total Amount: ₹ 
          {
            formik.values.manualTotalAmount !== ""
            ? Number(formik.values.manualTotalAmount).toFixed(2)
            : totalAmount.toFixed(2)
          }
        </Typography>
      )}
    </Box>
  );
}
