import React, { useState, useEffect } from 'react';

const SpecsSection = () => {
  const [selectedCommodity, setSelectedCommodity] = useState('cocoa');
  const [rotation, setRotation] = useState(0);

  const commodities = [
    {
      id: 'cocoa',
      name: 'Cocoa',
      icon: '/cocoa.jpg',
    },
    {
      id: 'maize',
      name: 'Maize',
      icon: '/maize.jpg',
    },
    {
      id: 'sorghum',
      name: 'Sorghum',
      icon: '/sorghum.jpg',
    },
    {
      id: 'redoil',
      name: 'Red Oil',
      icon: '/redoil.jpg',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hidden md:block w-full lg:pl-16 bg-black text-white relative py-16 overflow-hidden">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6  flex lg:pl-8">
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold leading-snug max-w-2xl">
              AI and{" "}
              <span className="text-red-500 font-bold">
                Satellite intelligence
              </span>{" "}
              that provides insights helping you make the right choices weather
              stocks or agro-commodities!
            </h1>
            <div className="flex flex-col lg:mt-10 lg:ml-8 lg:flex-row justify-between items-center max-w-7xl mx-auto px-6 gap-10">
              {/* Left - Commodity List */}
              <div className="flex flex-col gap-8 lg:max-w-2/3">
                {commodities.map((commodity) => (
                  <div
                    key={commodity.id}
                    onClick={() => setSelectedCommodity(commodity.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-tl-xl shadow-md transition-all duration-200 cursor-pointer
                  ${
                    selectedCommodity === commodity.id
                    // ? "bg-gray-300 text-black border-cyan-400"
                    // : "bg-[#B2B4B3] text-black border-transparent"
                  }`}
                  >
                    <span className="text-base font-medium border w-full p-4 bg-white rounded-tl-xl text-black">
                      {commodity.name}
                    </span>
                    <img
                      src={commodity.icon}
                      alt={commodity.name}
                      className="w-20 h-20 object-cover rounded-full absolute left-[16rem]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right - Rotating Globe */}
          <div className="relative lg:w-2/3 flex justify-center items-center">
            <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
              <video
                src="/satelite2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-xl"
              ></video>
            </div>
          </div>
        </div>
        {/* Content */}
        {/* Bottom - Elevation Heat Map */}
        <div className="w-full overflow-hidden rounded-xl relative ml-16">
          <img
            src="/thermal3.jpg"
            alt="Elevation Heat Map"
            className="w-full h-1/2 object-contain"
          />
        </div>
      </section>

      <section className="md:hidden w-full bg-black text-white relative py-16 overflow-hidden">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <h1 className="text-xl lg:text-2xl font-semibold leading-snug max-w-2xl">
            AI and{" "}
            <span className="text-red-500 font-bold">
              Satellite intelligence
            </span>{" "}
            that provides insights helping you make the right choices weather
            stocks or agro-commodities!
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center max-w-7xl mx-auto  px-6 gap-10">
          {/* Left - Commodity List */}
          <div className="flex flex-col gap-5 w-full lg:w-1/3">
            {commodities.map((commodity) => (
              <div
                key={commodity.id}
                onClick={() => setSelectedCommodity(commodity.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-full shadow-md transition-all duration-200 cursor-pointer border
                      ${
                        selectedCommodity === commodity.id
                          ? "bg-white text-black border-cyan-400 scale-105"
                          : "bg-gray-800 text-white border-transparent"
                      }`}
              >
                <span className="text-base font-medium">{commodity.name}</span>
                <img
                  src={commodity.icon}
                  alt={commodity.name}
                  className="w-8 h-8 object-cover rounded-full"
                />
              </div>
            ))}
          </div>

          {/* Right - Rotating Globe */}
          <div className="relative lg:w-2/3 flex justify-center items-center">
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] c:\Users\Enzoputachi\Downloads\Satellite Globe Video (1).mp4">
              <video
                src="/satelite2.mp4"
                autoPlay
                loop
                muted
                playsInline
              ></video>
            </div>
          </div>
        </div>

        {/* Bottom - Elevation Heat Map */}
        <div className=" w-full h-40 overflow-hidden rounded-xl relative">
          <img
            src="/thermalc.jpg"
            alt="Elevation Heat Map"
            className="w-full h-full object-contain"
          />
        </div>
      </section>
    </>
  );
};

export default SpecsSection;
