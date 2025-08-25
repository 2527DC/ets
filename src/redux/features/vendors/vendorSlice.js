import { createSlice } from "@reduxjs/toolkit";

const vendorSlice= createSlice({
    name: "vendors",
    initialState: {
        vendors: [],
        selectedVendors: [],
        loading: false,
        error: null,
    },
    reducers:{
        setVendors:(state,action) => {
            state.vendors = action.payload;
        },
        addSelectedVendor:(state,action) => {
            if (!state.selectedVendors.includes(action.payload)) {
                state.selectedVendors.push(action.payload);
            }
        },
        removeSelectedVendor:(state,action) => {
            state.selectedVendors = state.selectedVendors.filter(
                (id) => id !== action.payload
            );
        },
        clearSelectedVendors:(state) => {
            state.selectedVendors = [];
        }
    }
});
export const {
    setVendors,
    addSelectedVendor,
    removeSelectedVendor,
    clearSelectedVendors
} = vendorSlice.actions;

export default vendorSlice.reducer;