import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCommentsThunk,
  postCommentThunk,
  deleteCommentThunk,
} from "../features/comments/commentSlice";
import { toast } from "react-toastify";

const Comments = ({ doubtId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getAllCommentsThunk(doubtId));
  }, [dispatch, doubtId]);

  const handlePost = async () => {
    if (!text.trim()) return toast.error("Comment cannot be empty");

    try {
      await dispatch(postCommentThunk({ id: doubtId, text })).unwrap();
      toast.success("Comment posted");
      setText("");
    } catch (err) {
      toast.error("Failed to post comment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCommentThunk(id)).unwrap();
      toast.success("Comment deleted");
    } catch (err) {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">💬 Comments</h3>

      {loading && <p className="text-sm text-gray-500">Loading comments...</p>}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <div className="space-y-4 mb-6">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">No comments yet.</p>
        ) : (
          comments.map((c) => (
            <div
              key={c._id}
              className="bg-gray-50 border rounded-lg p-3 flex justify-between items-start"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {c.userId?.userName}
                  {c.userId?.role === "mentor" && (
                    <span className="ml-2 text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                      Mentor
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-700 mt-1">{c.text}</p>
              </div>

              {user?._id === c.userId?._id && (
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-500 text-xs hover:underline ml-3"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handlePost}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Comments;