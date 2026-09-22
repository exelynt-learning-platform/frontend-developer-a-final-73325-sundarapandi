import { useState } from "react";
import {
  Alert, Box, Button, CircularProgress, Paper, Stack, TextField, Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function EmployeeSearch({
  loading,
  employee,
  error,
  onSearch,
  onClear
}) {
  const [id, setId] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!id.trim()) return;
    onSearch(id.trim());
  };

  return (
    <Paper component="section" sx={{ p: { xs: 2, md: 2.5 }, mb: 3 }} elevation={0} variant="outlined">
      <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1 }}>
        Search Employee by ID
      </Typography>
      <Box component="form" onSubmit={submit}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <TextField
            label="Employee ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            size="small"
            inputProps={{ "aria-label": "Employee ID" }}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SearchIcon />}
            disabled={loading || !id.trim()}
          >
            Search
          </Button>
          {(employee || error) && (
            <Button type="button" variant="outlined" startIcon={<ClearIcon />} onClick={() => {
              setId("");
              onClear();
            }}>
              Clear
            </Button>
          )}
        </Stack>
      </Box>

      {error && <Alert severity="info" sx={{ mt: 2 }}>{error}</Alert>}

      {employee && (
        <Box sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: "action.hover" }}>
          <Typography variant="subtitle2" fontWeight={800}>Employee found</Typography>
          <Typography>{employee.name} • {employee.email}</Typography>
          <Typography color="text.secondary">
            {employee.mobile} • {employee.country}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
