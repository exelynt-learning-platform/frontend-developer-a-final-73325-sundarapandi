import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingState({ message = "Loading..." }) {
  return (
    <Box sx={{ py: 8, textAlign: "center" }} role="status">
      <CircularProgress />
      <Typography sx={{ mt: 2 }} color="text.secondary">{message}</Typography>
    </Box>
  );
}
