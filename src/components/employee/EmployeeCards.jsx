import {
  Box, Card, CardActions, CardContent, Chip, IconButton, Stack, Typography, Tooltip
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

export default function EmployeeCards({ employees, onEdit, onDelete }) {
  return (
    <Stack spacing={1.5} sx={{ display: { xs: "flex", md: "none" } }}>
      {employees.map((employee) => (
        <Card key={employee.id} variant="outlined">
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h6" fontWeight={800}>{employee.name || "Unnamed"}</Typography>
                <Typography color="text.secondary">ID: {employee.id}</Typography>
              </Box>
              <Chip label={employee.country || "Unknown"} size="small" />
            </Stack>
            <Stack spacing={0.75} sx={{ mt: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailOutlinedIcon fontSize="small" />
                <Typography>{employee.email || "—"}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneOutlinedIcon fontSize="small" />
                <Typography>{employee.mobile || "—"}</Typography>
              </Stack>
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 1.5 }}>
            <Tooltip title="Edit">
              <IconButton aria-label={`Edit ${employee.name}`} onClick={() => onEdit(employee)}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label={`Delete ${employee.name}`} color="error" onClick={() => onDelete(employee)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );
}
