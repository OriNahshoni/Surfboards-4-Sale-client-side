import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const TableView = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Brand</TableCell>
          <TableCell>Model</TableCell>
          <TableCell>Condition</TableCell>
          <TableCell>Size</TableCell>
          <TableCell>Liters</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row._id}>
            <TableCell>{row.brand}</TableCell>
            <TableCell>{row.model}</TableCell>
            <TableCell>{row.condition}</TableCell>
            <TableCell>{row.size}</TableCell>
            <TableCell>{row.liters}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableView;
