
// Refactored Dashboard.jsx
import React, { useState } from 'react';
import { TrendingUp, Activity, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import DashboardFooter from '@/components/dashboard/DashboardFooter';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import MetricCard from '@/components/dashboard/MetricCard';
import MarketSectors from '@/components/dashboard/MarketSectors';
import StockTable from '@/components/dashboard/StockTable';
import AIInsights from '@/components/dashboard/AIInsights';
import { useVolatileData } from '@/hooks/useVolatileData';
import { marketSectors, topGainersData, insightsData } from '@/data/mockData';
import ChatInterface from '@/components/dashboard/ChartInterface';
import SatelliteMap from '@/components/dashboard/SatelliteMap';

const Dashboard = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('1M');
  const navigate = useNavigate();
  const portfolioData = useVolatileData();

  const handleChooseAPlan = () => {
    navigate('/plan');
  };

  return (
    <div className="min-h-screen bg-[#0E1116] text-white">
      <DashboardNavbar />
      <div className="px-3 py-4 sm:px-6 sm:py-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Market Intelligence
                </h1>
                <p className="text-sm sm:text-base text-[#B0B0B0]">
                  Recent market activities powered by AI
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handleChooseAPlan}
                  className="bg-red-600 hover:bg-red-700 transition-colors duration-200 border rounded-md text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base sm:w-auto sm:max-w-xs"
                >
                  Choose A Plan
                </button>
              </div>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            <MetricCard
              title="Current Top Gainers"
              value="5"
              badge="1D"
              iconBgColor="bg-[#2979FF]/10"
              iconColor="text-[#2979FF]"
            />
            <MetricCard
              title="Avg % Growth - Top Gainers"
              value={
                <span className="text-[#21C96E] text-xs sm:text-sm flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +163.4%
                </span>
              }
              icon={TrendingUp}
              iconBgColor="bg-[#21C96E]/10"
              iconColor="text-[#21C96E]"
              valueColor="text-[#21C96E]"
            />
            <MetricCard
              title="Volume Of Trades"
              value="$4,898"
              subtitle="previous market open"
              icon={Activity}
              iconBgColor="bg-[#2979FF]/10"
              iconColor="text-[#2979FF]"
            />
          </div>

          {/* Main Content */}
          <div className="space-y-4 sm:space-y-6 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-y-0">
            <div className="space-y-4 sm:space-y-5 lg:col-span-2">
              <ChatInterface/>

              <div className="space-y-4 sm:space-y-6 lg:grid lg:grid-cols- lg:gap-6 lg:space-y-0">
                <MarketSectors sectors={marketSectors} />
                
              </div>
            </div>

            <div className="lg:col-span-2">
              <SatelliteMap  />
              <StockTable stocks={topGainersData} />
            </div>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;