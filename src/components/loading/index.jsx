import React from "react";
import { Box, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
