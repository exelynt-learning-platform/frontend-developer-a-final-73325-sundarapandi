import { useEffect, useState } from "react";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/layout/AppHeader";
import PageContainer from "../components/layout/PageContainer";
import EmployeeForm from "../components/employee/EmployeeForm";
import Toast from "../components/common/Toast";
import {
  createEmployee, selectMutationError, selectMutationLoading
} from "../features/employees/employeeSlice";
import {
  fetchCountries, selectCountries, selectCountryLoading
} from "../features/countries/countrySlice";

export default function AddEmployeePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(selectCountries);
  const countryLoading = useSelector(selectCountryLoading);
  const loading = useSelector(selectMutationLoading);
  const error = useSelector(selectMutationError);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!countries.length) dispatch(fetchCountries());
  }, [dispatch, countries.length]);

  const submit = async (data) => {
    try {
      await dispatch(createEmployee(data)).unwrap();
      setToast(true);
      setTimeout(() => navigate("/employees"), 700);
    } catch {}
  };

  return (
    <>
      <AppHeader />
      <PageContainer>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component="button" underline="hover" onClick={() => navigate("/employees")}>Employees</Link>
          <Typography color="text.primary">Add Employee</Typography>
        </Breadcrumbs>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4">Add Employee</Typography>
          <Typography color="text.secondary">Create a new employee record.</Typography>
        </Box>
        <EmployeeForm
          countries={countries}
          loading={loading || countryLoading}
          error={error}
          submitLabel="Add Employee"
          onSubmit={submit}
          onCancel={() => navigate("/employees")}
        />
      </PageContainer>
      <Toast open={toast} message="Employee created successfully." onClose={() => setToast(false)} />
    </>
  );
}
