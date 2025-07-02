import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { getMe } from "./features/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import StudentDashboard from "./pages/StudentDashboard";
import CreateDoubt from "./pages/CreateDoubt";
import UpdateDoubt from "./pages/UpdateDoubt";
import MentorDashboard from "./pages/MentorDashboard";
import SingleDoubt from "./pages/SingleDoubts";
import Comments from "./pages/Comment";

const App = () => {
  console.log("App component loaded 🚀");
  const dispatch = useDispatch();
  const { user, checkingUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (checkingUser) return <p>Loading...</p>; 
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-doubt" element={
          <ProtectedRoutes>
            <CreateDoubt />
          </ProtectedRoutes>
        }/>
        <Route path="/update-doubt/:id" element={
          <ProtectedRoutes>
            <UpdateDoubt />
          </ProtectedRoutes>
        }/>
        <Route path="/mentor-dashboard" element={
          <ProtectedRoutes>
            <MentorDashboard />
          </ProtectedRoutes>
        }/>
        <Route path="/dashboard" element={ 
          <ProtectedRoutes>
              <StudentDashboard />
          </ProtectedRoutes>
        }/>
        <Route path="/doubts/:id" element={ 
          <ProtectedRoutes>
              <Comments />
          </ProtectedRoutes>
        }/>
        import SingleDoubt from "./pages/SingleDoubt";

<Route path="/doubt/:id" element={<ProtectedRoutes><SingleDoubt /></ProtectedRoutes>} />



      </Routes>
    </div>
  );
};

export default App;
