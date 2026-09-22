import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { employeeService } from "../../services/employeeService";

const messageFromError = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      return await employeeService.getAll();
    } catch (error) {
      return rejectWithValue(messageFromError(error, "Unable to load employees."));
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchEmployeeById",
  async (id, { rejectWithValue }) => {
    try {
      return await employeeService.getById(id);
    } catch (error) {
      return rejectWithValue({
        status: error?.response?.status,
        message: messageFromError(error, "Unable to find the employee.")
      });
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employee, { rejectWithValue }) => {
    try {
      return await employeeService.create(employee);
    } catch (error) {
      return rejectWithValue(messageFromError(error, "Unable to create employee."));
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, employee }, { rejectWithValue }) => {
    try {
      return await employeeService.update(id, employee);
    } catch (error) {
      return rejectWithValue(messageFromError(error, "Unable to update employee."));
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      await employeeService.remove(id);
      return id;
    } catch (error) {
      return rejectWithValue(messageFromError(error, "Unable to delete employee."));
    }
  }
);

const initialState = {
  items: [],
  selectedEmployee: null,
  loading: false,
  error: null,
  searchLoading: false,
  searchError: null,
  mutationLoading: false,
  mutationError: null
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearSelectedEmployee(state) {
      state.selectedEmployee = null;
      state.searchError = null;
    },
    clearMutationError(state) {
      state.mutationError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load employees.";
      })

      .addCase(fetchEmployeeById.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
        state.selectedEmployee = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError =
          action.payload?.status === 404
            ? "No employee found with that ID."
            : action.payload?.message || "Unable to search employee.";
      })

      .addCase(createEmployee.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload || "Unable to create employee.";
      })

      .addCase(updateEmployee.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false;
        const index = state.items.findIndex(
          (employee) => String(employee.id) === String(action.payload.id)
        );
        if (index !== -1) state.items[index] = action.payload;
        state.selectedEmployee = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload || "Unable to update employee.";
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.mutationLoading = true;
        state.mutationError = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.mutationLoading = false;
        state.items = state.items.filter(
          (employee) => String(employee.id) !== String(action.payload)
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.mutationLoading = false;
        state.mutationError = action.payload || "Unable to delete employee.";
      });
  }
});

export const { clearSelectedEmployee, clearMutationError } =
  employeeSlice.actions;

export const selectEmployees = (state) => state.employees.items;
export const selectEmployeeLoading = (state) => state.employees.loading;
export const selectEmployeeError = (state) => state.employees.error;
export const selectSelectedEmployee = (state) => state.employees.selectedEmployee;
export const selectSearchLoading = (state) => state.employees.searchLoading;
export const selectSearchError = (state) => state.employees.searchError;
export const selectMutationLoading = (state) => state.employees.mutationLoading;
export const selectMutationError = (state) => state.employees.mutationError;

export default employeeSlice.reducer;
