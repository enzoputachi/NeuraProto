,
import React, { useState } from 'react';
import Login from '@/components/auth/Login';
import Signup from '@/components/auth/Signup';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-elegant p-8">
          {/* {isLoginMode ? (
            <Login onToggleMode={toggleMode} />
          ) : (
            <Signup onToggleMode={toggleMode} />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Auth;