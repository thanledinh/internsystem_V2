import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequestParams } from "@services/api";

//fetch list intern
export const fetchListIntern = createAsyncThunk(
  "intern/fetchListIntern",
  async ({ pageNumber, pageSize }) => {
    const params = {
      pageNumber,
      pageSize,
    };
    const response = await getRequestParams("/intern/get-all", params);
    return response.data;
  }
);

const internSlice = createSlice({
  name: "intern",
  initialState: {
    listIntern: [],
    totalIntern: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListIntern.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListIntern.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listIntern = action.payload.data.items;
        state.totalIntern = action.payload.total;
      })
      .addCase(fetchListIntern.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {} = internSlice.actions;

export default internSlice.reducer;
