import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getRequest } from '@services/api'

export const fetchJobs = createAsyncThunk("job/fetchJobs", async() => {
    const response = await getRequest("/job/get-all");
    return response.data;
});

const jobSlice = createSlice({
    name: "job",
    initialState:{
        jobs: [],
        status: "idle",
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.jobs = action.payload.data;
                state.status = "succeeded";
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const {} = jobSlice.actions;

export default jobSlice.reducer;

