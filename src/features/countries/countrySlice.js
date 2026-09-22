import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { countryService } from "../../services/countryService";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      return await countryService.getAll();
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
        error?.message ||
        "Unable to load countries."
      );
    }
  }
);

const countrySlice = createSlice({
  name: "countries",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load countries.";
      });
  }
});

export const selectCountries = (state) => state.countries.items;
export const selectCountryLoading = (state) => state.countries.loading;
export const selectCountryError = (state) => state.countries.error;

export default countrySlice.reducer;
