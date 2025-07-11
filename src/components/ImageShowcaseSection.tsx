import React from "react";

const VideoShowcaseSection = () => {
  return (
    <section className="w-full pb-8 sm:pb-12" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
        </div>
        
        <div className="flex flex-col items-center  rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">
          <div className="w-full overflow-hidden rounded-xl">
            <video 
              src="/growth.mp4" 
              autoPlay
              loop
              muted
              playsInline
              className="w-full bg-black mt-10 max-h-[400px] object-contain"
              poster="/image.png"
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