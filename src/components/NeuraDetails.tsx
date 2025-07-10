import React from 'react';
import { motion } from 'framer-motion';

const lineVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const NeuraDetails = () => {
  const lines = [
    "Let AI Help You Select,",
    "Analyze & Track Your",
    "Preferred Assets With",
    "Ease!"
  ];

  return (
    <section className="flex flex-col lg:flex-row lg:justify-evenly lg:items-center text-white p-4 sm:p-6 lg:p-8 min-h-screen">
      
      {/* Image Section */}
      <div className="w-full lg:flex-1 lg:max-w-md mb-8 lg:mb-0">
        <div className="relative bg-gradient-to-br rounded-lg p-4 sm:p-6 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="AI-powered investment analytics dashboard" 
            className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Content Section */}
      <motion.div 
        className="w-full lg:flex-1 lg:max-w-xl lg:ml-12"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
            >
              {line}
            </motion.div>
          ))}
        </h1>

        <motion.p 
          className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          We leverage AI to help you select, track and optimize investments across 
          various commodities, agriculture, and cryptocurrencies. Our technology 
          delivers daily insights, performance reports and market updates, 
          empowering you to make smarter financial decisions with ease.
        </motion.p>

        <motion.div 
          className="bg-white rounded-lg p-4 sm:p-6 mb-6 sm:mb-8"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="bg-green-600 p-2 rounded-lg flex-shrink-0">
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white rounded grid grid-cols-2 gap-1 p-1"></div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
                Smarter Investing for Organizations and Cooperatives
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Whether you're a cooperative, business or financial 
                group, our platform analyzes market trends, delivers 
                real-time reports and optimizes portfolio performance - 
                helping you achieve investment goals.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.button 
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          LEARN MORE
        </motion.button>
      </motion.div>
    </section>
  );
};

export default NeuraDetails;
