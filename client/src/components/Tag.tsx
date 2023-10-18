import { Chip } from "@mui/material";
import React from "react";
import { getCategoryNameById } from "../utils/categoryUtils";

const Tag = ({ id }: { id: number }) => {
  return (
    <Chip
      color="primary"
      variant="outlined"
      size="small"
      label={getCategoryNameById(id)}
    />
  );
};

export default Tag;
