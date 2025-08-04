import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  iconBgColor = "bg-[#2979FF]/10", 
  iconColor = "text-[#2979FF]",
  valueColor = "text-white",
  badge
}) => {
  return (
    <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-[#B0B0B0] text-xs sm:text-sm font-medium">
              {title}
            </p>
            <p className={`text-xl sm:text-3xl font-bold mt-1 ${valueColor}`}>
              {value}
            </p>
            {subtitle && (
              <p className="text-[#B0B0B0] text-xs sm:text-sm mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <div className={`h-10 w-10 sm:h-12 sm:w-12 ${iconBgColor} rounded-lg flex items-center justify-center`}>
            {badge ? (
              <span className={`text-xs sm:text-sm ${iconColor} font-medium`}>
                {badge}
              </span>
            ) : (
              <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor}`} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;