import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ExternalLink } from 'lucide-react';

const AIInsights = ({ insights, title = "AI Insights Today + Expert Feedback" }) => {
  return (
    <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-white">
          {title}
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
  );
};

export default AIInsights;