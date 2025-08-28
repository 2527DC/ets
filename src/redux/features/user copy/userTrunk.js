import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_CLIENT } from "../../../Api/API_Client";

 export const createEmployee=createAsyncThunk("user/createEmployee", async (employeeData, { rejectWithValue }) => {
    try {
        const response = await API_CLIENT.post('/users/employe', employeeData, )
        if (response.status === 201) {
            return response.data;
        } else {
            return rejectWithValue("Failed to create employee");
        }
    } catch (error) {
        return rejectWithValue(error.message);
    }
})