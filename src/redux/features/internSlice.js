import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequestParams,
  postRequest,
  putRequest,
  deleteRequest,
  getRequest,
} from "@services/api";

// Fetch list of interns
export const fetchListIntern = createAsyncThunk(
  "intern/fetchListIntern",
  async ({ pageNumber, pageSize }) => {
    const params = { pageNumber, pageSize };
    const response = await getRequestParams("/intern/get-all", params);
    return response.data;
  }
);

// add
export const addIntern = createAsyncThunk(
  "intern/addIntern",
  async (newInternData, { rejectWithValue }) => {
    try {
      const response = await postRequest("/intern/create", newInternData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update
export const updateIntern = createAsyncThunk(
  "intern/updateIntern",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await putRequest(`/intern/update/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// delete
export const deleteIntern = createAsyncThunk(
  "intern/deleteIntern",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(`/intern/delete/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//chỗ này get tạm, sau merge dev xoá
//get list school
export const fetchListSchool = createAsyncThunk(
  "intern/fetchListSchool",
  async () => {
    const response = await getRequest("/school/get-all");
    return response.data;
  }
);

//get list internship
export const fetchListInternship = createAsyncThunk(
  "intern/fetchListInternship",
  async () => {
    const response = await getRequest("/internship/get-all-internship");
    return response.data;
  }
);

const internSlice = createSlice({
  name: "intern",
  initialState: {
    listIntern: [],
    listSchool: [],
    listInternship: [],
    totalIntern: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchListIntern.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListIntern.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listIntern = action.payload.data.items;
        state.totalIntern = action.payload.data.totalCount;
        state.pageNumber = action.payload.data.pageNumber;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchListIntern.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // add
      .addCase(addIntern.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addIntern.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listIntern.push(action.payload);
      })
      .addCase(addIntern.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // update
      .addCase(updateIntern.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateIntern.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.listIntern.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.listIntern[index] = action.payload;
        }
      })
      .addCase(updateIntern.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // delete
      .addCase(deleteIntern.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteIntern.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listIntern = state.listIntern.filter(
          (intern) => intern.id !== action.payload
        );
      })
      .addCase(deleteIntern.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //list school
      .addCase(fetchListSchool.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListSchool.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listSchool = action.payload.data.items;
      })
      .addCase(fetchListSchool.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //list internship
      .addCase(fetchListInternship.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListInternship.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listInternship = action.payload.data.items;
      })
      .addCase(fetchListInternship.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {} = internSlice.actions;

export default internSlice.reducer;