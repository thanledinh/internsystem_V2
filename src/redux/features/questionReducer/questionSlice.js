import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteRequestParams, deleteRequestParamsV2, getRequest, postRequest, putRequest } from "@services/api";
import { message } from "antd";

//fetchQuestion
export const fetchQuestions = createAsyncThunk(
  "question/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest("/question/get-all-questions");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//fetchQuestionsRank
export const getQuestionsRank = createAsyncThunk(
  "questions/fetchQuestionsRank",
  async () => {
    const response = await getRequest("question/get-all-question-ranks");
    return response.data.data;
  }
);

//fetchPosition
export const fetchPosition = createAsyncThunk(
  "positions/fetchPosition",
  async () => {
    const response = await getRequest("position/get-all-position");
    return response.data.data;
  }
);

//createQuestion
export const createQuestion = createAsyncThunk(
  "question/createQuestions",
  async (newQuestion, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        "/question/create-question",
        newQuestion
      );
      fetchQuestions();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//updateQuestion 
// Thunk để sửa câu hỏi
export const updateQuestion = createAsyncThunk(
  "question/updateQuestion",
  async (updatedQuestion, { rejectWithValue }) => {
    try {
      const response = await putRequest(`/question/update-question/${updatedQuestion.questionId}`, updatedQuestion);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//deleteQuestion
export const deleteQuestion = createAsyncThunk(
  "question/deleteQuestion",
  async (questionId, { rejectWithValue }) => {
    try {
      const response = await deleteRequestParamsV2(
        "question/delete-question",
        questionId
      )
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Slice cho question
const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
    questionRanks: [],
    positions: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý fetch questions
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload.data; // Giả sử API trả về data trong payload
        state.isLoading = false;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        message.error(action.payload?.message || "Fetch questions failed");
      })
      // Xử lý cho getQuestionsRank
      .addCase(getQuestionsRank.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionsRank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questionRanks = action.payload; // Cập nhật state cho ranks
      })
      .addCase(getQuestionsRank.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      //Xử lý cho getAllposition
      .addCase(fetchPosition.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions = action.payload; // Cập nhật state cho ranks
      })
      .addCase(fetchPosition.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // Xử lý thêm câu hỏi
      .addCase(createQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload.data);
        state.isLoading = false;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        message.error(action.payload?.message || "Create question failed");
      })

      // Xử lý xóa câu hỏi
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter(
          (q) => q.questionId !== action.payload
        );
        state.isLoading = false;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        message.error(action.payload?.message || "Delete question failed");
      });
  },
});

// export const { logout } = questionSlice.actions;
export default questionSlice.reducer;
