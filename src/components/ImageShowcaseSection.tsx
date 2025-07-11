import React from "react";

const VideoShowcaseSection = () => {
  return (
    <section className="w-full pt-0 pb-8 sm:pb-12 bg-white" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-gray-900 mb-3 sm:mb-4">
            {/* Experience the Future Today */}
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            {/* Our cutting-edge humanoid robot is designed to transform how we interact 
            with technology in everyday environments. */}
          </p>
        </div>
        
        <div className="flex flex-col items-center rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">
          <div className="w-full overflow-hidden rounded-xl">
            <video 
              src="/growth.mp4" 
              autoPlay
              loop
              playsInline
              controls
              className="w-full bg-black border rounded-2xl mt-10 max-h-[500px] object-contain"
              poster="/growth.mp4"
            >
              <source src="/growth.mp4" type="video/mp4" />
            </video>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;