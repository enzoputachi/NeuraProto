import React from "react";

const VideoShowcaseSection = () => {
  return (
    <section className="w-full pb-8 sm:pb-12" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
        </div>
        
        <div className="flex flex-col items-center rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">
          {/* Header Text */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mb-6 sm:mb-8 lg:mb-9">
            <p className="text-white border border-gray-600 rounded-lg p-3 sm:p-4 text-center text-sm sm:text-base lg:text-lg">
              What <span className="text-red-600 font-semibold">Growth</span> Could Be Like
            </p>
          </div>
          
          {/* Video Container */}
          <div className="w-full border border-gray-600 overflow-hidden rounded-xl mb-6 sm:mb-8">
            <video 
              src="/growth2.mp4" 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto max-h-[250px] sm:max-h-[300px] lg:max-h-[400px] object-contain bg-black"
              poster="/image.png"
            >
              <source src="/growth.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Footer Text */}
          <div className="w-full max-w-2xl px-4 sm:px-6 text-center mb-4 sm:mb-6">
            <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed">
              <span className="text-red-600 font-semibold">Saving</span> is the foundation, investing is the growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;