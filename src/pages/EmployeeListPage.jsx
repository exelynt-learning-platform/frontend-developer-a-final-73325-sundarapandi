import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

import AppHeader from "../components/layout/AppHeader";
import PageContainer from "../components/layout/PageContainer";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Toast from "../components/common/Toast";

import EmployeeSearch from "../components/employee/EmployeeSearch";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeCards from "../components/employee/EmployeeCards";

import {
  clearSelectedEmployee,
  deleteEmployee,
  fetchEmployeeById,
  fetchEmployees,
  selectEmployeeError,
  selectEmployeeLoading,
  selectEmployees,
  selectMutationLoading,
  selectSearchError,
  selectSearchLoading,
  selectSelectedEmployee,
} from "../features/employees/employeeSlice";

import {
  fetchCountries,
  selectCountries,
  selectCountryError,
} from "../features/countries/countrySlice";

export default function EmployeeListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector(selectEmployees);
  const loading = useSelector(selectEmployeeLoading);
  const error = useSelector(selectEmployeeError);

  const countries = useSelector(selectCountries);
  const countryError = useSelector(selectCountryError);

  const searchLoading = useSelector(selectSearchLoading);
  const searchError = useSelector(selectSearchError);
  const selectedEmployee = useSelector(selectSelectedEmployee);

  const mutationLoading = useSelector(selectMutationLoading);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchCountries());
  }, [dispatch]);

  const countryCount = useMemo(
    () =>
      new Set(
        employees
          .map((employee) => employee.country)
          .filter(Boolean)
      ).size,
    [employees]
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await dispatch(deleteEmployee(deleteTarget.id)).unwrap();

      setDeleteTarget(null);

      setToast({
        open: true,
        message: "Employee deleted successfully.",
        severity: "success",
      });
    } catch (err) {
      setToast({
        open: true,
        message: String(err),
        severity: "error",
      });
    }
  };

  return (
    <>
      <AppHeader />

      <PageContainer>
        {/* Page Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ sm: "center" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="h4">
              Employees
            </Typography>

            <Typography color="text.secondary">
              View and manage your employee directory.
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => navigate("/employees/add")}
          >
            Add Employee
          </Button>
        </Stack>

        {/* Statistics */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <StatCard
            icon={<PeopleOutlineIcon />}
            label="Total Employees"
            value={employees.length}
          />

          <StatCard
            icon={<PublicOutlinedIcon />}
            label="Countries Represented"
            value={countryCount}
          />
        </Grid>

        {/* Employee Search */}
        <EmployeeSearch
          loading={searchLoading}
          employee={selectedEmployee}
          error={searchError}
          onSearch={(id) => dispatch(fetchEmployeeById(id))}
          onClear={() => dispatch(clearSelectedEmployee())}
        />

        {/* Country API Warning */}
        {countryError && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {countryError}
          </Alert>
        )}

        {/* Employee Data States */}
        {loading ? (
          <Paper variant="outlined">
            <LoadingState message="Loading employees..." />
          </Paper>
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => dispatch(fetchEmployees())}
          />
        ) : employees.length === 0 ? (
          <Paper variant="outlined">
            <EmptyState
              onAdd={() => navigate("/employees/add")}
            />
          </Paper>
        ) : (
          <>
            {/* Desktop Table */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <EmployeeTable
                employees={employees}
                onEdit={(employee) =>
                  navigate(`/employees/${employee.id}/edit`)
                }
                onDelete={setDeleteTarget}
              />
            </Box>

            {/* Mobile Cards */}
            <EmployeeCards
              employees={employees}
              onEdit={(employee) =>
                navigate(`/employees/${employee.id}/edit`)
              }
              onDelete={setDeleteTarget}
            />
          </>
        )}
      </PageContainer>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Employee?"
        message={
          deleteTarget
            ? `Are you sure you want to delete "${deleteTarget.name || "this employee"}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        loading={mutationLoading}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      {/* Toast Notification */}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() =>
          setToast((currentToast) => ({
            ...currentToast,
            open: false,
          }))
        }
      />
    </>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <Grid item xs={12} sm={6}>
      <Paper
        variant="outlined"
        sx={{
          p: 2.25,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: "primary.50",
            color: "primary.main",
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography variant="h5">
            {value}
          </Typography>

          <Typography color="text.secondary">
            {label}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}