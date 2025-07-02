import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDoubtThunk, getMyDoubtsThunk } from '../features/doubts/doubtSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateDoubt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'student') {
      navigate('/mentor-dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error('Please fill in all fields');
      return;
    }

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    if (image) payload.append('image', image);

    try {
      await dispatch(createDoubtThunk(payload)).unwrap();
      toast.success('Doubt created successfully');
      dispatch(getMyDoubtsThunk());
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to create doubt');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex justify-center items-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">📝 Create New Doubt</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="title"
            placeholder="Enter doubt title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Describe your doubt"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full border rounded px-4 py-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 w-full"
          />

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full max-h-60 object-contain rounded mb-4 border"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Submit Doubt
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDoubt;