import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const PerformanceChart = ({ 
  title, 
  data, 
  activeTimeframe, 
  onTimeframeChange, 
  timeframes = ["7D", "1M", "3M", "YTD", "1Y"] 
}) => {
  return (
    <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
          <CardTitle className="text-lg sm:text-xl font-semibold text-white">
            {title}
          </CardTitle>
          <Tabs
            value={activeTimeframe}
            onValueChange={onTimeframeChange}
            className="w-full sm:w-auto"
          >
            <TabsList className="bg-[#23272F] border-[#2A2F36] w-full sm:w-auto grid grid-cols-5 sm:flex">
              {timeframes.map((period) => (
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
            <AreaChart data={data}>
              <defs>
                <linearGradient id="holdingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#21C96E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#21C96E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B0BEC5" stopOpacity={0.05} />
                  <stop offset="95%" stopColor="#B0BEC5" stopOpacity={0} />
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
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
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
  );
};


export default PerformanceChart;