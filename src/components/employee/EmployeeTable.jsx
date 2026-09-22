import {
  Box, IconButton, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Tooltip, Typography
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper} variant="outlined" elevation={0}>
      <Table sx={{ minWidth: 760 }} aria-label="employee table">
        <TableHead>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Mobile</b></TableCell>
            <TableCell><b>Country</b></TableCell>
            <TableCell align="right"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow hover key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>
                <Typography fontWeight={700}>{employee.name || "—"}</Typography>
              </TableCell>
              <TableCell>{employee.email || "—"}</TableCell>
              <TableCell>{employee.mobile || "—"}</TableCell>
              <TableCell>{employee.country || "—"}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton aria-label={`Edit ${employee.name}`} onClick={() => onEdit(employee)}>
                    <EditOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    aria-label={`Delete ${employee.name}`}
                    color="error"
                    onClick={() => onDelete(employee)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
