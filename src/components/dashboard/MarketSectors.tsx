import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MarketSectors = ({ sectors, title = "My Markets & Industries" }) => {
  return (
    <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {sectors.map((sector, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="text-[#EAEAEA] text-sm sm:text-base">
              {sector.name}
            </span>
            <span
              className={`text-sm font-medium flex items-center ${
                sector.performance > 0 ? "text-[#21C96E]" : "text-[#FF5252]"
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
  );
};

export default MarketSectors;