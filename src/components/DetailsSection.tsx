import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const sections = [
  {
    title: "Stocks",
    text:
      "Stocks are parts of a company that you can own. When you buy a stock, you own a small piece of that company.",
    bgImage: "/stocks.jpeg",
  },
  {
    title: "Gold",
    text:
      "Gold is a valuable metal used to protect money from losing value. People invest in it during tough economic times.",
    bgImage: "/gold.jpeg",
  },
  {
    title: "ETFs (Exchange-Traded Funds)",
    text:
      "ETFs are bundles of assets like stocks or bonds that you can buy and sell like a single stock. They help spread risk.",
    bgImage: "/ETFS.jpeg",
  },
  {
    title: "Bonds",
    text:
      "Bonds are loans to companies or governments. In return, they pay you interest over time and give your money back later.",
    bgImage: "/Bonds.jpeg",
  },
  {
    title: "/Commodities",
    text:
      "Commodities are raw materials like oil, gas, and wheat. Investing in them can protect against inflation and market changes.",
    bgImage: "/Seeds.jpg",
  },
];

const FadeInBlock = ({ title, text, bgImage }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`h-[15rem] w-[25rem] flex-shrink-0 text-white bg-white border rounded-lg flex flex-col justify-end p-4 transition-all duration-700 ease-in-out transform relative overflow-hidden
        ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-52"}`}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl font-semibold mb-2 text-white drop-shadow-lg">{title}</h2>
        <p className="text-white drop-shadow-md">{text}</p>
      </div>
    </div>
  );
};

const DetailsSection = () => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    let scrollAmount = 0;
    const scrollStep = 0.5; // Reduced for smoother animation

    const scroll = () => {
      if (!container || isPaused) return;
      
      container.scrollLeft += scrollStep;
      scrollAmount += scrollStep;

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
        scrollAmount = 0;
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  return (
    <section 
      className="flex p-4 sm:p-6 lg:p-8 text-white overflow-hidden bg-gradient-to-r" //  from-blue-900 to-purple-900
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={containerRef}
        className="flex overflow-x-auto space-x-6 px-4 py-6"
        style={{ 
          scrollBehavior: "auto", // Changed from "smooth" to prevent conflicts
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch"
        }}
      >
        {sections.map((item, idx) => (
          <FadeInBlock key={idx} title={item.title} text={item.text} bgImage={item.bgImage} />
        ))}
        {/* Duplicate cards for seamless loop */}
        {sections.map((item, idx) => (
          <FadeInBlock key={`duplicate-${idx}`} title={item.title} text={item.text} bgImage={item.bgImage} />
        ))}
      </div>
    </section>
  );
};

export default DetailsSection;