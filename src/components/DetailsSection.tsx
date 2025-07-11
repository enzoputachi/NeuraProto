import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useInView } from "react-intersection-observer";


const sections = [
  {
    title: "Stocks",
    text:
      "Stocks are parts of a company that you can own. When you buy a stock, you own a small piece of that company.",
  },
  {
    title: "Gold",
    text:
      "Gold is a valuable metal used to protect money from losing value. People invest in it during tough economic times.",
  },
  {
    title: "ETFs (Exchange-Traded Funds)",
    text:
      "ETFs are bundles of assets like stocks or bonds that you can buy and sell like a single stock. They help spread risk.",
  },
  {
    title: "Bonds",
    text:
      "Bonds are loans to companies or governments. In return, they pay you interest over time and give your money back later.",
  },
  {
    title: "Commodities",
    text:
      "Commodities are raw materials like oil, gas, and wheat. Investing in them can protect against inflation and market changes.",
  },
];



  
  const FadeInBlock = ({ title, text }) => {
    const { ref, inView } = useInView({
    triggerOnce: false,     // Only animate the first time
    threshold: 0.1,         // Trigger when 10% of it is in view
    });

    return (<section id="details" className="p-4 sm:p-6 lg:p-8">
        <div
          ref={ref}
          className={`h-[15rem] w-[25rem] mx-auto flex flex-col justify-between p-4  transition-all duration-700 ease-in-out transform
        ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <h2 className="text-4xl font-semibold mb-2 ">{title}</h2>
          <p className="text-2xl">{text}</p>
        </div>
      </section>);
  }


const DetailsSection = () => {


  return ( 
    <section id="details" className="flex p-4 sm:p-6 lg:p-8 text-white overflow-y-hidden"  style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
      {sections.map((item, idx) => (
        <FadeInBlock key={idx} title={item.title} text={item.text} />
      ))}
    </section>
  );
};

export default DetailsSection;
