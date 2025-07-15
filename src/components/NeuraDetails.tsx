import React from 'react';

const NeuraDetails = () => {
  return (
    <section className="flex flex-col lg:flex-row lg:justify-evenly lg:items-center text-white px-4 py-6 sm:px-6 sm:py-8 lg:p-8 overflow-hidden">
      {/* Image Section */}
      <div className="w-full lg:flex-1 lg:max-w-md mb-6 lg:mb-0">
        <div className="relative bg-gradient-to-br rounded-lg p-3 sm:p-4 lg:p-6 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="AI-powered investment analytics dashboard" 
            className="w-full h-40 sm:h-48 lg:h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:flex-1 lg:max-w-xl lg:ml-12">
        
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
          Know Exactly Which Assets To Invest In Every Month With Trusted Recommendations From Experts & AI powered Insights.
        </h1>

        <div className="bg-[#12002A] w-full max-w-full sm:max-w-lg lg:max-w-xl rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-1">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-white leading-snug">
                Smarter Investing for Organizations and Cooperatives
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Whether you are a newbie to investing, a seasoned investor or an organization, 
                we can be your winning touch towards maximizing returns monthly!
              </p>
            </div>
          </div>
        </div>

        <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 active:scale-95">
          LEARN MORE
        </button>
      </div>
    </section>
  );
};

export default NeuraDetails;