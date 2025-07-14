import React from "react";

const VideoShowcaseSection = () => {
  return (
    <section className="w-full pb-8 sm:pb-12" id="showcase">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
        </div>
        
        <div className="flex flex-col items-center rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll">
          <p className="text-white border p-3 w-[25rem] text-center mb-9">What <span className="text-red-600">Growth</span> Could Be Like</p>
          <div className="w-full border overflow-hidden rounded-xl">
            <video 
              src="/growth2.mp4" 
              autoPlay
              loop
              muted
              playsInline
              className="w-full  mt-10 max-h-[400px] object-contain"
              poster="/image.png"
            >
              <source src="/growth.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="text-white"> <span className="text-red-600">Saving</span> is the foundation, investing is the growth.</p>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;