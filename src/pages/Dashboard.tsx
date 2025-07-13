import React, { useState } from 'react';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
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
  ExternalLink
} from 'lucide-react';

const Dashboard = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('1M');

  // Generate high-volatility portfolio data with frequent oscillations
  const generateVolatileData = () => {
    const baseDate = new Date(2024, 9, 26); // October 26, 2024
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

  const topStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 189.95, change: +5.67, changePercent: +3.08, fairValue: 195.00 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: +12.45, changePercent: +3.40, fairValue: 385.00 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change: -2.34, changePercent: -1.62, fairValue: 150.00 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 234.12, change: +8.90, changePercent: +3.95, fairValue: 240.00 },
  ];

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

  return (
    <div className="min-h-screen bg-[#0E1116] text-white">
      <DashboardNavbar />
      <div className="p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Portfolio Dashboard</h1>
              <p className="text-[#B0B0B0] mt-1">High volatility market conditions - VIX 30</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-[#FF5252]/10 border-[#FF5252] text-[#FF5252]">
                <TrendingDown className="w-3 h-3 mr-1" />
                High Volatility
              </Badge>
            </div>
          </div>

          {/* Top Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#B0B0B0] text-sm font-medium">Total Value</p>
                    <p className="text-3xl font-bold text-white mt-1">$283,200</p>
                  </div>
                  <div className="h-12 w-12 bg-[#2979FF]/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-[#2979FF]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#B0B0B0] text-sm font-medium">Total Returns</p>
                    <p className="text-3xl font-bold text-[#21C96E] mt-1">+$175,662</p>
                    <p className="text-[#21C96E] text-sm flex items-center mt-1">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      +163.4%
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-[#21C96E]/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-[#21C96E]" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#B0B0B0] text-sm font-medium">Est. Dividend</p>
                    <p className="text-3xl font-bold text-white mt-1">$4,898</p>
                    <p className="text-[#B0B0B0] text-sm mt-1">/year</p>
                  </div>
                  <div className="h-12 w-12 bg-[#2979FF]/10 rounded-lg flex items-center justify-center">
                    <Activity className="h-6 w-6 text-[#2979FF]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Chart Area - Takes up 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Performance Chart */}
              <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl ">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="text-xl font-semibold text-white">Portfolio Performance - High Volatility</CardTitle>
                    <Tabs value={activeTimeframe} onValueChange={setActiveTimeframe} className="w-auto">
                      <TabsList className="bg-[#23272F] border-[#2A2F36]">
                        {['7D', '1M', '3M', 'YTD', '1Y'].map((period) => (
                          <TabsTrigger 
                            key={period} 
                            value={period}
                            className="data-[state=active]:bg-[#2979FF] data-[state=active]:text-white text-[#B0B0B0]"
                          >
                            {period}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full text-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={portfolioData}>
                        <defs>
                          <linearGradient id="holdingsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#21C96E" stopOpacity={0.15}/>
                            <stop offset="95%" stopColor="#21C96E" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#B0BEC5" stopOpacity={0.05}/>
                            <stop offset="95%" stopColor="#B0BEC5" stopOpacity={0}/>
                          </linearGradient>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge> 
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2A2F36" />
                        <XAxis 
                          dataKey="date" 
                          fontSize={5}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: '#B0B0B0' }}
                        />
                        <YAxis 
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                          tick={{ fill: '#B0B0B0' }}
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#23272F',
                            border: '1px solid #2A2F36',
                            borderRadius: '8px',
                            color: '#EAEAEA'
                          }}
                          formatter={(value, name) => [
                            `$${value.toLocaleString()}`, 
                            name === 'holdings' ? 'My Holdings' : 'US Market'
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
                          filter="url(#glow)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* My Markets & My Updates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* My Markets */}
                <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">My Markets & Industries</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {marketSectors.map((sector, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-[#EAEAEA] text-sm">{sector.name}</span>
                        <span className={`text-sm font-medium flex items-center ${
                          sector.performance > 0 ? 'text-[#21C96E]' : 'text-[#FF5252]'
                        }`}>
                          {sector.performance > 0 ? (
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                          )}
                          {sector.performance > 0 ? '+' : ''}{sector.performance}%
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* My Updates */}
                <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-white">My Updates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topStocks.slice(0, 4).map((stock, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-[#EAEAEA] text-sm font-medium">{stock.symbol}</span>
                          <span className="text-[#B0B0B0] text-xs">Fair Value: ${stock.fairValue}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-[#EAEAEA] text-sm font-medium">${stock.price}</div>
                          <div className={`text-xs flex items-center ${
                            stock.change > 0 ? 'text-[#21C96E]' : 'text-[#FF5252]'
                          }`}>
                            {stock.change > 0 ? (
                              <ArrowUpRight className="w-3 h-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 mr-1" />
                            )}
                            {stock.changePercent > 0 ? '+' : ''}{stock.changePercent}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* My Screeners */}
              <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-white">My Screeners</CardTitle>
                    <Button variant="outline" className="border-[#2979FF] text-[#2979FF] hover:bg-[#2979FF]/10">
                      New screener
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#23272F] rounded-lg border border-[#2A2F36]">
                      <h4 className="text-[#EAEAEA] font-medium mb-2">Saved Screeners</h4>
                      <p className="text-[#B0B0B0] text-sm">3 active screeners</p>
                    </div>
                    <div className="p-4 bg-[#23272F] rounded-lg border border-[#2A2F36]">
                      <h4 className="text-[#EAEAEA] font-medium mb-2">New Companies Last 7d</h4>
                      <p className="text-[#B0B0B0] text-sm">12 new matches</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights Sidebar - Takes up 1 column */}
            <div className="lg:col-span-1">
              <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-white">Market Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {insights.map((insight, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="text-[#EAEAEA] font-medium text-sm leading-tight">{insight.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-[#B0B0B0]">
                        <User className="w-3 h-3" />
                        <span>{insight.author}</span>
                        <span>•</span>
                        <span>{insight.date}</span>
                      </div>
                      <p className="text-[#B0B0B0] text-xs leading-relaxed">{insight.summary}</p>
                      <Button variant="ghost" size="sm" className="text-[#2979FF] hover:bg-[#2979FF]/10 p-0 h-auto">
                        Continue reading
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                      {index < insights.length - 1 && <div className="border-b border-[#2A2F36]" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;