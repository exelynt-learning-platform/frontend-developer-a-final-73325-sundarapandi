import { useEffect } from "react";
import {
  Alert, Button, CircularProgress, Grid, MenuItem, Paper, Stack, TextField, Typography
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeSchema } from "../../validation/employeeSchema";

const emptyEmployee = {
  name: "",
  email: "",
  mobile: "",
  country: "",
  state: "",
  district: ""
};

export default function EmployeeForm({
  initialValues = emptyEmployee,
  countries = [],
  loading = false,
  error = null,
  submitLabel = "Save Employee",
  onSubmit,
  onCancel
}) {
  const {
    control, handleSubmit, reset, formState: { errors }
  } = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: initialValues || emptyEmployee,
    mode: "onBlur"
  });

  useEffect(() => {
    reset({ ...emptyEmployee, ...initialValues });
  }, [initialValues, reset]);

  const submit = async (data) => {
    await onSubmit(data);
  };

  return (
    <Paper component="section" variant="outlined" elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Stack spacing={2.5} component="form" onSubmit={handleSubmit(submit)} noValidate>
        <Grid container spacing={2}>
          <FormField name="name" label="Name" control={control} error={errors.name} />
          <FormField name="email" label="Email" type="email" control={control} error={errors.email} />
          <FormField name="mobile" label="Mobile" control={control} error={errors.mobile} />
          <Grid item xs={12} md={6}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Country"
                  required
                  error={!!errors.country}
                  helperText={errors.country?.message || "Select the employee's country"}
                >
                  {countries.length === 0 ? (
                    <MenuItem value="">No countries available</MenuItem>
                  ) : countries.map((country) => {
                    const value = country.name || country.country || country.title || country.id;
                    return <MenuItem key={country.id ?? value} value={value}>{value}</MenuItem>;
                  })}
                </TextField>
              )}
            />
          </Grid>
          <FormField name="state" label="State" control={control} error={errors.state} />
          <FormField name="district" label="District" control={control} error={errors.district} />
        </Grid>

        <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={1.5} justifyContent="flex-end">
          <Button variant="outlined" onClick={onCancel} disabled={loading}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          >
            {loading ? "Saving..." : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

function FormField({ name, label, type = "text", control, error }) {
  return (
    <Grid item xs={12} md={6}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            required
            error={!!error}
            helperText={error?.message}
            inputProps={name === "mobile" ? { inputMode: "numeric", maxLength: 15 } : undefined}
          />
        )}
      />
    </Grid>
  );
}
