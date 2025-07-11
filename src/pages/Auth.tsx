import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Login from '@/components/auth/Login';
import Signup from '@/components/auth/Signup';
import Navbar from '@/components/Navbar';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Home Icon */}
      <button
        onClick={handleHomeClick}
        className="absolute top-6 left-6 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 group"
        aria-label="Go to home page"
      >
        <Home 
          size={24} 
          className="text-white group-hover:text-gray-200 transition-colors duration-200" 
        />
      </button>

      <div className="max-w-md w-full space-y-8">
        {/* <Navbar /> */}
        <div className="bg-black text-white rounded-2xl shadow-elegant p-8">
          {isLoginMode ? (
            <Login onToggleMode={toggleMode} />
          ) : (
            <Signup onToggleMode={toggleMode} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;