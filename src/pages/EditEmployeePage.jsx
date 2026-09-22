import { useEffect, useState } from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppHeader from "../components/layout/AppHeader";
import PageContainer from "../components/layout/PageContainer";
import EmployeeForm from "../components/employee/EmployeeForm";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import Toast from "../components/common/Toast";
import {
  fetchEmployeeById, updateEmployee,
  selectSelectedEmployee, selectSearchError, selectSearchLoading,
  selectMutationError, selectMutationLoading
} from "../features/employees/employeeSlice";
import {
  fetchCountries, selectCountries, selectCountryLoading
} from "../features/countries/countrySlice";

export default function EditEmployeePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employee = useSelector(selectSelectedEmployee);
  const searchLoading = useSelector(selectSearchLoading);
  const searchError = useSelector(selectSearchError);
  const mutationLoading = useSelector(selectMutationLoading);
  const mutationError = useSelector(selectMutationError);
  const countries = useSelector(selectCountries);
  const countryLoading = useSelector(selectCountryLoading);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
    if (!countries.length) dispatch(fetchCountries());
  }, [dispatch, id, countries.length]);

  const submit = async (data) => {
    try {
      await dispatch(updateEmployee({ id, employee: data })).unwrap();
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
          <Typography color="text.primary">Edit Employee</Typography>
        </Breadcrumbs>
        <Typography variant="h4" sx={{ mb: 0.5 }}>Edit Employee</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>Update employee information.</Typography>

        {searchLoading ? (
          <LoadingState message="Loading employee details..." />
        ) : searchError ? (
          <ErrorState message={searchError} onRetry={() => dispatch(fetchEmployeeById(id))} />
        ) : employee ? (
          <EmployeeForm
            initialValues={employee}
            countries={countries}
            loading={mutationLoading || countryLoading}
            error={mutationError}
            submitLabel="Update Employee"
            onSubmit={submit}
            onCancel={() => navigate("/employees")}
          />
        ) : null}
      </PageContainer>
      <Toast open={toast} message="Employee updated successfully." onClose={() => setToast(false)} />
    </>
  );
}
