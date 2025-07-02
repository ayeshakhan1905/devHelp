import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteComment, getAllComments, postComment } from "./commentThunks"


export const getAllCommentsThunk = createAsyncThunk('comment/getAllComments' , getAllComments)
export const postCommentThunk = createAsyncThunk('comment/postComment' , postComment)
export const deleteCommentThunk = createAsyncThunk(
  "comment/deleteComment",
  async (id, thunkAPI) => {
    try {
      await deleteComment(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue( err.message ||"Failed to delete comment");
    }
  }
);


const commentSlice = createSlice({
    name : 'comment',
    initialState : {
        comments : [],
        loading : false,
        error : null
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder
        .addCase(getAllCommentsThunk.pending , (state , action)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(getAllCommentsThunk.fulfilled , (state , action)=>{
            state.loading = false,
            state.comments = action.payload
        })
        .addCase(getAllCommentsThunk.rejected , (state , action)=>{
            state.loading = false,
            state.error = action.error.message
        })
        .addCase(postCommentThunk.pending , (state , action)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(postCommentThunk.fulfilled , (state , action)=>{
            state.loading = false,
            state.comments.push(action.payload)
        })
        .addCase(postCommentThunk.rejected , (state , action)=>{
            state.loading = false,
            state.error = action.error.message
        })
        .addCase(deleteCommentThunk.fulfilled, (state, action) => {
            state.comments = state.comments.filter((c) => c._id !== action.payload);
        })

    }
})

export default commentSlice.reducer;