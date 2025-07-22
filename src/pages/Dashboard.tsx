import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity,
  BarChart3,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  User,
  ExternalLink,
  Menu,
  Bell,
  Search
} from 'lucide-react';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('1M');
  const navigate = useNavigate();

  // Generate high-volatility portfolio data with frequent oscillations
  const generateVolatileData = () => {
    const data = [];
    let holdingsValue = 245000;
    let marketValue = 230000;
    
    const dates = [
      'Oct 26', 'Oct 28', 'Oct 30', 'Nov 02', 'Nov 04', 'Nov 06', 
      'Nov 09', 'Nov 11', 'Nov 13', 'Nov 16', 'Nov 18', 'Nov 20', 
      'Nov 23', 'Nov 26'
    ];
    
    dates.forEach((date, index) => {
      // Create high volatility with large swings (-8% to +8%)
      const holdingsChange = (Math.random() - 0.5) * 0.16;
      const marketChange = (Math.random() - 0.5) * 0.12;
      
      // Add some correlation but with divergence
      holdingsValue += holdingsValue * holdingsChange;
      marketValue += marketValue * marketChange;
      
      // Add some sharp reversals every few days
      if (index % 3 === 0 && index > 0) {
        const reversal = Math.random() > 0.5 ? 1.05 : 0.95;
        holdingsValue *= reversal;
      }
      
      data.push({
        date,
        holdings: Math.round(holdingsValue),
        market: Math.round(marketValue),
      });
    });
    
    return data;
  };

  const portfolioData = generateVolatileData();

  const marketSectors = [
    { name: 'Technology', performance: +12.5 },
    { name: 'Healthcare', performance: +8.3 },
    { name: 'Financial Services', performance: -2.1 },
    { name: 'Consumer Goods', performance: +5.8 },
    { name: 'Energy', performance: -4.2 },
  ];

  const insights = [
    {
      title: 'Tech Stocks Rally on AI Optimism',
      author: 'Market Analyst',
      date: '2 hours ago',
      summary: 'Technology sector sees significant gains as AI companies report strong earnings...',
      image: '/api/placeholder/60/60'
    },
    {
      title: 'Federal Reserve Signals Rate Pause',
      author: 'Economic Reporter',
      date: '4 hours ago',
      summary: 'Central bank officials hint at maintaining current interest rates through Q1...',
      image: '/api/placeholder/60/60'
    },
    {
      title: 'Energy Sector Volatility Continues',
      author: 'Sector Specialist',
      date: '6 hours ago',
      summary: 'Oil prices fluctuate amid geopolitical tensions and supply concerns...',
      image: '/api/placeholder/60/60'
    }
  ];

  const handleChooseAPlan = () => {
    navigate('/plan')
  }

  return (
    <div className="min-h-screen bg-[#0E1116] text-white">
      <DashboardNavbar />
      <div className="px-3 py-4 sm:px-6 sm:py-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Mobile-optimized Header */}
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

          {/* Mobile-optimized Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-[#B0B0B0] text-xs sm:text-sm font-medium">
                      Current Top Gainers
                    </p>
                    <p className="text-xl sm:text-3xl font-bold text-white mt-1">
                      5
                    </p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#2979FF]/10 rounded-lg flex items-center justify-center text-xs sm:text-sm text-[#2979FF] font-medium">
                    1D
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-[#B0B0B0] text-xs sm:text-sm font-medium">
                      Avg % Growth - Top Gainers
                    </p>
                    <p className="text-[#21C96E] text-xs sm:text-sm flex items-center mt-1">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      +163.4%
                    </p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#21C96E]/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-[#21C96E]" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-[#B0B0B0] text-xs sm:text-sm font-medium">
                      Volume Of Trades
                    </p>
                    <p className="text-xl sm:text-3xl font-bold text-white mt-1">
                      $4,898
                    </p>
                    <p className="text-[#B0B0B0] text-xs sm:text-sm mt-1">
                      previous market open
                    </p>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#2979FF]/10 rounded-lg flex items-center justify-center">
                    <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-[#2979FF]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile-optimized Main Content */}
          <div className="space-y-4 sm:space-y-6 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-y-0">
            {/* Chart Section - Mobile first, then desktop 3 columns */}
            <div className="space-y-4 sm:space-y-6 lg:col-span-3">
              {/* Performance Chart */}
              <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
                    <CardTitle className="text-lg sm:text-xl font-semibold text-white">
                      Top Gainers
                    </CardTitle>
                    <Tabs
                      value={activeTimeframe}
                      onValueChange={setActiveTimeframe}
                      className="w-full sm:w-auto"
                    >
                      <TabsList className="bg-[#23272F] border-[#2A2F36] w-full sm:w-auto grid grid-cols-5 sm:flex">
                        {["7D", "1M", "3M", "YTD", "1Y"].map((period) => (
                          <TabsTrigger
                            key={period}
                            value={period}
                            className="data-[state=active]:bg-[#2979FF] data-[state=active]:text-white text-[#B0B0B0] text-xs sm:text-sm"
                          >
                            {period}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent className="px-3 sm:px-6">
                  <div className="h-[250px] sm:h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={portfolioData}>
                        <defs>
                          <linearGradient
                            id="holdingsGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#21C96E"
                              stopOpacity={0.15}
                            />
                            <stop
                              offset="95%"
                              stopColor="#21C96E"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="marketGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#B0BEC5"
                              stopOpacity={0.05}
                            />
                            <stop
                              offset="95%"
                              stopColor="#B0BEC5"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2A2F36" />
                        <XAxis
                          dataKey="date"
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#B0B0B0" }}
                          interval="preserveStartEnd"
                        />
                        <YAxis
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: "#B0B0B0" }}
                          tickFormatter={(value) =>
                            `$${(value / 1000).toFixed(0)}K`
                          }
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#23272F",
                            border: "1px solid #2A2F36",
                            borderRadius: "8px",
                            color: "#EAEAEA",
                            fontSize: "12px",
                          }}
                          formatter={(value, name) => [
                            `$${value.toLocaleString()}`,
                            name === "holdings" ? "My Holdings" : "US Market",
                          ]}
                        />
                        <Area
                          type="linear"
                          dataKey="market"
                          stroke="#B0BEC5"
                          strokeWidth={1.5}
                          fill="url(#marketGradient)"
                          dot={false}
                        />
                        <Area
                          type="linear"
                          dataKey="holdings"
                          stroke="#21C96E"
                          strokeWidth={2.5}
                          fill="url(#holdingsGradient)"
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile-optimized Markets & Updates */}
              <div className="space-y-4 sm:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                {/* My Markets */}
                <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg font-semibold text-white">
                      My Markets & Industries
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    {marketSectors.map((sector, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-1"
                      >
                        <span className="text-[#EAEAEA] text-sm sm:text-base">
                          {sector.name}
                        </span>
                        <span
                          className={`text-sm font-medium flex items-center ${
                            sector.performance > 0
                              ? "text-[#21C96E]"
                              : "text-[#FF5252]"
                          }`}
                        >
                          {sector.performance > 0 ? (
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                          )}
                          {sector.performance > 0 ? "+" : ""}
                          {sector.performance}%
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* My Updates */}
                <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-base sm:text-lg font-semibold text-white">
                      My Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[400px]">
                        <thead>
                          <tr className="border-b border-[#2A2F36]">
                            <th className="text-left text-xs font-medium text-[#B0B0B0] p-2 sm:p-3">
                              S/N
                            </th>
                            <th className="text-left text-xs font-medium text-[#B0B0B0] p-2 sm:p-3">
                              STOCK
                            </th>
                            <th className="text-left text-xs font-medium text-[#B0B0B0] p-2 sm:p-3">
                              WTD GAIN
                            </th>
                            <th className="text-right text-xs font-medium text-[#B0B0B0] p-2 sm:p-3">
                              PRICE (₦)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              sn: 1,
                              stock: "FTNCOCOA",
                              gain: "60.60%",
                              price: "7.50",
                            },
                            {
                              sn: 2,
                              stock: "REDSTAREX",
                              gain: "60.57%",
                              price: "13.44",
                            },
                            {
                              sn: 3,
                              stock: "OMATEK",
                              gain: "60.44%",
                              price: "1.46",
                            },
                            {
                              sn: 4,
                              stock: "CILEASING",
                              gain: "60.33%",
                              price: "8.77",
                            },
                            {
                              sn: 5,
                              stock: "MEYER",
                              gain: "60.07%",
                              price: "23.45",
                            },
                          ].map((stock, index) => (
                            <tr
                              key={index}
                              className="border-b border-[#2A2F36] hover:bg-[#23272F]/50"
                            >
                              <td className="text-[#B0B0B0] text-xs sm:text-sm p-2 sm:p-3">
                                {stock.sn}
                              </td>
                              <td className="p-2 sm:p-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#21C96E] to-[#16A055] flex items-center justify-center text-white text-xs font-bold">
                                    {stock.stock.substring(0, 2)}
                                  </div>
                                  <span className="text-[#EAEAEA] text-xs sm:text-sm font-medium">
                                    {stock.stock}
                                  </span>
                                </div>
                              </td>
                              <td className="text-[#21C96E] text-xs sm:text-sm font-medium p-2 sm:p-3">
                                {stock.gain}
                              </td>
                              <td className="text-[#EAEAEA] text-xs sm:text-sm text-right p-2 sm:p-3">
                                {stock.price}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* AI Insights Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg font-semibold text-white">
                    AI Insights Today
                    <br className="hidden sm:block" />
                    <span className="sm:hidden"> </span>+ Expert Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {insights.map((insight, index) => (
                    <div key={index} className="space-y-2 sm:space-y-3">
                      <h4 className="text-[#EAEAEA] font-medium text-sm leading-tight">
                        {insight.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-[#B0B0B0]">
                        <User className="w-3 h-3" />
                        <span>{insight.author}</span>
                        <span>•</span>
                        <span>{insight.date}</span>
                      </div>
                      <p className="text-[#B0B0B0] text-xs leading-relaxed">
                        {insight.summary}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#2979FF] hover:bg-[#2979FF]/10 p-0 h-auto text-xs"
                      >
                        Continue reading
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                      {index < insights.length - 1 && (
                        <div className="border-b border-[#2A2F36] pt-2 sm:pt-3" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;