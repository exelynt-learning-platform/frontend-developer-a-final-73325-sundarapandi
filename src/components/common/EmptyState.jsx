import { Box, Button, Typography } from "@mui/material";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";

export default function EmptyState({ title = "No Employees Found", message, onAdd }) {
  return (
    <Box sx={{ py: 8, textAlign: "center" }}>
      <PersonOffOutlinedIcon sx={{ fontSize: 56, color: "text.disabled" }} />
      <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>{title}</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {message || "There are currently no employees to display."}
      </Typography>
      {onAdd && <Button variant="contained" onClick={onAdd}>Add Employee</Button>}
    </Box>
  );
}
