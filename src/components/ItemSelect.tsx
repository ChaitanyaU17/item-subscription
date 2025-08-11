/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { fetchItems } from "../store/itemSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { MenuItem, Select, CircularProgress } from "@mui/material";

interface Props {
  name: string;
  value: string;
  onChange: (e: any) => void;
}

export default function ItemSelect({ name, value, onChange }: Props) {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.items);
  console.log(items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  if (loading) return <CircularProgress size={20} />;

  return (
    <Select name={name} value={value} onChange={onChange} fullWidth>
      {items.map((item: any) => (
        <MenuItem key={item._id} value={item._id}>
          {item.title}
        </MenuItem>
      ))}
    </Select>
  );
}
