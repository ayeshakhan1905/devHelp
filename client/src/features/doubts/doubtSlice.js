import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDoubt,
  readDoubt,
  updateDoubt,
  deleteDoubt,
  getAllDoubts,
  getMyDoubts,
  updateDoubtStatus,
} from "./doubtThunks";

// Thunks
export const createDoubtThunk = createAsyncThunk("doubt/create", createDoubt);
export const readDoubtThunk = createAsyncThunk("doubt/read", readDoubt);
export const updateDoubtThunk = createAsyncThunk("doubt/update", updateDoubt);
export const deleteDoubtThunk = createAsyncThunk("doubt/delete", deleteDoubt);
export const getAllDoubtsThunk = createAsyncThunk("doubt/getAll", getAllDoubts);
export const getMyDoubtsThunk = createAsyncThunk(
  "doubt/getMyDoubts",
  getMyDoubts
);
export const updateDoubtStatusThunk = createAsyncThunk(
  "doubt/updateStatus",
  updateDoubtStatus
);

const doubtSlice = createSlice({
  name: "doubt",
  initialState: {
    doubts: [],
    singleDoubt: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Doubt
      .addCase(createDoubtThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoubtThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.doubts.push(action.payload); // Add the new doubt
      })
      .addCase(createDoubtThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Doubts (Mentor)
      .addCase(getAllDoubtsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDoubtsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.doubts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAllDoubtsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get My Doubts (Student)
      .addCase(getMyDoubtsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyDoubtsThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log("My Doubts Fetched →", action.payload);
        state.doubts = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getMyDoubtsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Read Single Doubt
      .addCase(readDoubtThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readDoubtThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDoubt = action.payload;
      })
      .addCase(readDoubtThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Doubt
      .addCase(updateDoubtThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoubtThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.doubts.findIndex(
          (d) => d._id === action.payload._id
        );
        if (index !== -1) {
          state.doubts[index] = action.payload;
        }
      })
      .addCase(updateDoubtThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Doubt
      .addCase(deleteDoubtThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoubtThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.doubts = state.doubts.filter(
          (d) => d._id !== action.payload.deletedDoubtId
        );
      })
      .addCase(deleteDoubtThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateDoubtStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoubtStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.doubts.findIndex(
          (d) => d._id === action.payload._id
        );
        if (index !== -1) {
          state.doubts[index] = action.payload;
        }
      })
      .addCase(updateDoubtStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default doubtSlice.reducer;
