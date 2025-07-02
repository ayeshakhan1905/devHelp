import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDoubtThunk,
  getMyDoubtsThunk,
} from "../features/doubts/doubtSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authThunks";
import { toast } from "react-toastify";

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { doubts, loading, error } = useSelector((state) => state.doubt);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role !== "student") {
      navigate("/mentor-dashboard");
      return;
    }
    dispatch(getMyDoubtsThunk());
  }, [dispatch, user, navigate]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this doubt?")) {
      dispatch(deleteDoubtThunk(id))
        .then(() => {
          dispatch(getMyDoubtsThunk());
          toast.success("Doubt deleted");
        })
        .catch(() => {
          toast.error("Error deleting doubt");
        });
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-doubt/${id}`);
  };

  const handleCreate = () => {
    navigate("/create-doubt");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">
          📚 My Doubts Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleCreate}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full shadow-md"
        >
          + Create New Doubt
        </button>
      </div>

      {loading && (
        <p className="text-center text-blue-500 text-sm">Loading your doubts...</p>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {doubts?.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {doubts.map((doubt) => (
            <div
              key={doubt._id}
              className="bg-white rounded-xl shadow p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">
                  {doubt.title}
                </h2>
                <p className="text-sm text-gray-700 mb-2">{doubt.description}</p>
                <p className="text-xs text-gray-500 italic mb-2">
                  Status:{" "}
                  <span
                    className={`capitalize font-medium ${
                      doubt.status === "open"
                        ? "text-blue-600"
                        : doubt.status === "resolved"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {doubt.status}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => handleUpdate(doubt._id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 text-sm rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(doubt._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/doubt/${doubt._id}`)}
                  className="text-indigo-600 text-sm underline ml-auto"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500 mt-10">
            You have no doubts yet. Create one to get started!
          </p>
        )
      )}
    </div>
  );
};

export default StudentDashboard;