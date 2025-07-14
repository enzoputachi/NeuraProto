
const DashboardFooter = () => {
  return (
    <section id="" className="w-full p-4 justify-between">
      <div className=" flex flex-col sm:flex-row border">
        <div>
          <img src="/sales1.png" alt="" className=" rounded-lg" />
        </div>
        <div className="flex flex-col text-white p-4 md:w-3/4 pl-[5rem]">
          <p className="text-[1.5rem] md:w-3/4">
            Join <span className="text-red-700">Millions</span> Growing Their
            Wealth Monthly With The Stock Market!
          </p>
          <p className=" w-2/3 mt-5">
            Earn up to 10% or more With Our Ai-powered Daily
            Recommendations/Insights.
          </p>
          <button className="bg-red-600 border rounded-md text-white mt-[5rem] w-[15rem] p-4">
            Start Profiting Now
          </button>
        </div>
      </div>
      <div className="w-[100%] top-[195rem] bg-[#C9A4FE] h-14 rounded-b-2xl  bottom-0"></div>
    </section>
  );
}

export default DashboardFooter
