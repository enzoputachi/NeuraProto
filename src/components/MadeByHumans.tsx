import React from "react";

const MadeByHumans = () => {
  return (
    <section id="" className="w-full p-4">
      <div className="flex flex-col lg:flex-row border rounded-lg overflow-hidden">
        {/* Image Container */}
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <img 
            src="/sales1.png" 
            alt="Stock market growth" 
            className="w-full h-48 sm:h-64 lg:h-full object-cover rounded-t-lg lg:rounded-t-none lg:rounded-l-lg" 
          />
        </div>
        
        {/* Content Container */}
        <div className="flex flex-col justify-center text-white p-4 sm:p-6 lg:p-8 w-full lg:w-1/2">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-4 sm:mb-6">
          <span className="text-red-700">Don't</span> Just Save!
            
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 text-gray-200 leading-relaxed">
            Let's get you Investing your earnings in smart securities like stocks, commodities and much more
          </p>
          
          <button className="bg-red-600 hover:bg-red-700 transition-colors duration-200 border rounded-md text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base w-full sm:w-auto sm:max-w-xs">
            Get Started
          </button>
        </div>
      </div>
      
      {/* Bottom accent bar */}
      {/* <div className="w-full bg-purple-300 h-14 rounded-b-2xl mt-4"></div> */}
    </section>
  );
};

export default MadeByHumans;