import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Login from '@/components/auth/Login';
import Signup from '@/components/auth/Signup';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_APP_URL;

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${baseUrl}/users/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        return { valid: true, user: data.user };
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('authToken');
        return { valid: false };
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Remove invalid token
      // localStorage.removeItem('authToken');
      return { valid: false };
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      setIsVerifying(true);
      
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setIsVerifying(false);
        return;
      }

      const verification = await verifyToken(token);
      
      if (verification.valid) {
        setIsAuthenticated(true);
        // Optionally store user data in context/state
        // setUser(verification.user);
        navigate('/dashboard');
      } else {
        setIsAuthenticated(false);
      }
      
      setIsVerifying(false);
    };

    checkAuth();
  }, [navigate]);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  // Show loading spinner while verifying token
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="mt-4 text-sm">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Don't render auth forms if already authenticated
  if (isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Home Icon */}
      <button
        onClick={handleHomeClick}
        className="absolute top-6 left-6 p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200 group"
        aria-label="Go to home page"
      >
        <Home 
          size={14} 
          className="text-white group-hover:text-gray-200 transition-colors duration-200" 
        />
      </button>

      <div className="max-w-md w-full space-y-8">
        <div className="bg-black text-white rounded-2xl shadow-elegant md:p-8">
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