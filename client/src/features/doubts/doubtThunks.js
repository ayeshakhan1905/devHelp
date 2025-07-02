import axiosInstance from "../../utils/Axios";

// Create Doubt
export const createDoubt = async (doubtData, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/doubt/', doubtData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("Create Doubt Response →", res.data.doubt);
    return res.data.doubt;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response?.data?.message || "Create Doubt Failed"
    );
  }
};

// Read Single Doubt
export const readDoubt = async (id, thunkAPI) => {
    try {
        const res = await axiosInstance.get(`/doubt/${id}`);
        return res.data.doubt;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Read Doubt Failed");
    }
};

// Update Doubt
export const updateDoubt = async ({ id, updatedData }, thunkAPI) => {
    try {
        const res = await axiosInstance.put(`/doubt/${id}`, updatedData);
        return res.data.doubt;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Update Failed");
    }
};

// Delete Doubt
export const deleteDoubt = async (id, thunkAPI) => {
    try {
        const res = await axiosInstance.delete(`/doubt/${id}`);
        return res.data;  // Assuming backend returns { deletedDoubtId: id, message: "Deleted" }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete Failed");
    }
};

// Get All Doubts (Mentor View)
export const getAllDoubts = async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get('/doubt/all-doubts');
        return res.data.doubts;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetching All Doubts Failed");
    }
};

// Get My Doubts (Student View)
export const getMyDoubts = async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get('/doubt/');
        return res.data.doubts;  // Expecting backend response: { doubts: [...] }
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetching My Doubts Failed");
    }
};

export const updateDoubtStatus = async ({ id, status }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/doubt/status/${id}`, { status });
    return res.data.updatedDoubt;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Update Status Failed");
  }
};
