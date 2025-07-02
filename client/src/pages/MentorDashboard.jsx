import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDoubtsThunk,
  updateDoubtStatusThunk,
} from "../features/doubts/doubtSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authThunks";
import { toast } from "react-toastify";

const MentorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doubts, loading, error } = useSelector((state) => state.doubt);
  const { user } = useSelector((state) => state.auth);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user || user.role !== "mentor") {
      navigate("/dashboard");
    } else {
      dispatch(getAllDoubtsThunk());
    }
  }, [dispatch, user, navigate]);

  const handleStatusToggle = (id, currentStatus) => {
    const newStatus = currentStatus === "open" ? "resolved" : "open";
    dispatch(updateDoubtStatusThunk({ id, status: newStatus })).then(() => {
      toast.success(`Marked as ${newStatus}`);
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.info("Logged out successfully");
  };

  const filteredDoubts =
    filter === "all"
      ? doubts
      : doubts.filter((d) => d.status.toLowerCase() === filter);

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          👨‍🏫 Mentor Dashboard
        </h1>

        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
          </select>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-center text-gray-600 mt-10">Loading...</p>
      )}
      {error && (
        <p className="text-center text-red-500 mt-10">Error: {error}</p>
      )}

      {!loading && filteredDoubts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No doubts in this category.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoubts.map((doubt) => (
            <div
              key={doubt._id}
              className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-indigo-700 mb-1">
                  {doubt.title}
                </h2>
                <p className="text-sm text-gray-700 mb-2 line-clamp-3">
                  {doubt.description}
                </p>
                <p className="text-xs text-gray-600 italic mb-4">
                  Status:{" "}
                  <span
                    className={`capitalize font-medium ${
                      doubt.status === "open"
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    {doubt.status}
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 items-center mt-2">
                <button
                  onClick={() => handleStatusToggle(doubt._id, doubt.status)}
                  className={`text-white text-sm px-3 py-1 rounded ${
                    doubt.status === "open"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  {doubt.status === "open" ? "Mark Resolved" : "Reopen"}
                </button>

                <button
                  onClick={() => navigate(`/doubt/${doubt._id}`)}
                  className="text-indigo-600 text-sm font-medium hover:underline ml-auto"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;