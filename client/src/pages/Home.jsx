import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white flex flex-col justify-center items-center px-6 py-12">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
          Welcome to <span className="text-yellow-300">Doubt Resolver</span> 🚀
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-gray-200">
          Got coding doubts? Don’t let them block your progress.
          Get instant help from mentors and peers — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link to="/login">
            <button className="bg-white text-indigo-700 hover:bg-gray-100 font-semibold px-6 py-2 rounded-full transition shadow">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full transition shadow">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;