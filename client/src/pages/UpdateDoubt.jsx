import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDoubtThunk, readDoubtThunk } from "../features/doubts/doubtSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateDoubt = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleDoubt, loading } = useSelector((state) => state.doubt);
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
  });

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (user?.role !== "student") {
      navigate("/mentor-dashboard");
      return;
    }
    dispatch(readDoubtThunk(id));
  }, [dispatch, id, user, navigate]);

  useEffect(() => {
    if (singleDoubt) {
      setForm({
        title: singleDoubt.title || "",
        description: singleDoubt.description || "",
        status: singleDoubt.status || "open",
      });
      setCurrentImage(singleDoubt.image || null);
    }
  }, [singleDoubt]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("status", form.status);
    if (image) formData.append("image", image);

    dispatch(updateDoubtThunk({ id, updatedData: formData })).then(() => {
      toast.success("Doubt updated successfully!");
      navigate("/dashboard");
    });
  };

  if (loading) return <p className="text-center mt-10 text-blue-500">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          ✏️ Update Your Doubt
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Enter doubt title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Describe your doubt"
            value={form.description}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />

          {(image || currentImage) && (
            <img
              src={image ? URL.createObjectURL(image) : currentImage}
              alt="Doubt preview"
              className="w-full max-h-60 object-contain mt-2 rounded border"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
          >
            Update Doubt
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDoubt;