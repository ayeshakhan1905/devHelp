import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/Axios";
import Comments from "./Comment";
import { toast } from "react-toastify";

const SingleDoubt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [doubt, setDoubt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoubt = async () => {
      try {
        const res = await axiosInstance.get(`/doubt/${id}`);
        setDoubt(res.data.doubt);
      } catch (err) {
        console.error("Error fetching doubt:", err);
        toast.error("Failed to fetch doubt.");
      }
      setLoading(false);
    };

    fetchDoubt();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!doubt)
    return <p className="text-center mt-10 text-red-500">Doubt not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-indigo-700">📌 {doubt.title}</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-indigo-600 hover:underline"
          >
            ← Back
          </button>
        </div>
        {user?.role === "mentor" && doubt.student && (
          <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border">
            <p>
              👤 <span className="font-medium">{doubt.student.userName}</span>
            </p>
            <p>📧 {doubt.student.email}</p>
          </div>
        )}

        <p className="text-gray-700 mb-4">{doubt.description}</p>

        {doubt.image && (
          <img
            src={doubt.image}
            alt="Doubt"
            className="w-full max-h-[400px] object-contain rounded-lg shadow mb-4"
          />
        )}

        <Comments doubtId={id} />
      </div>
    </div>
  );
};

export default SingleDoubt;