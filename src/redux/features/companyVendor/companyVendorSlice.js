import { createSlice } from "@reduxjs/toolkit";
import {
  fetchVendorsByCompanyThunk,
  assignVendorsToCompanyThunk,
  fetchCompaniesByVendorThunk,
  assignCompaniesToVendorThunk,
} from "./companyVendorThunks";

const initialState = {
  vendorsByCompany: {},    // { [companyId]: [vendors] }
  companiesByVendor: {},   // { [vendorId]: [companies] }
  loading: false,
  assigning: false,
  error: null,
};

const companyVendorSlice = createSlice({
  name: "companyVendor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ---------------- Fetch vendors by company ----------------
    builder
      .addCase(fetchVendorsByCompanyThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorsByCompanyThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { companyId, data } = action.payload;
        state.vendorsByCompany[companyId] = Array.isArray(data)
          ? data
          : data?.vendors || [];
      })
      .addCase(fetchVendorsByCompanyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (action.meta.arg) state.vendorsByCompany[action.meta.arg] = [];
      });

    // ---------------- Assign vendors to company ----------------
    builder
      .addCase(assignVendorsToCompanyThunk.pending, (state) => {
        state.assigning = true;
        state.error = null;
      })
      .addCase(assignVendorsToCompanyThunk.fulfilled, (state, action) => {
        state.assigning = false;
        const { companyId, data } = action.payload;

        // Use full vendor objects from API response
        state.vendorsByCompany[companyId] = Array.isArray(data?.vendors)
          ? data.vendors
          : [];
      })
      .addCase(assignVendorsToCompanyThunk.rejected, (state, action) => {
        state.assigning = false;
        state.error = action.payload;
      });

    // ---------------- Fetch companies by vendor ----------------
    builder
         .addCase(fetchCompaniesByVendorThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompaniesByVendorThunk.fulfilled, (state, action) => {
        const { vendorId, data } = action.payload;
        state.companiesByVendor[vendorId] = data; // ✅ This is key
        state.loading = false;
      })
      .addCase(fetchCompaniesByVendorThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch companies';
      })

    // ---------------- Assign companies to vendor ----------------
    builder
      .addCase(assignCompaniesToVendorThunk.pending, (state) => {
        state.assigning = true;
        state.error = null;
      })
      .addCase(assignCompaniesToVendorThunk.fulfilled, (state, action) => {
        state.assigning = false;
        const { vendorId, data } = action.payload;

        // ✅ Use full company objects returned by API
        state.companiesByVendor[vendorId] = Array.isArray(data?.companies)
          ? data.companies
          : [];
      })
      .addCase(assignCompaniesToVendorThunk.rejected, (state, action) => {
        state.assigning = false;
        state.error = action.payload;
      });
  },
});

export default companyVendorSlice.reducer;
