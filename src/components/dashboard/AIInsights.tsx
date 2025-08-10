import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ExternalLink, Brain, Lightbulb, TrendingUp } from 'lucide-react';

const sampleInsights = [
  {
    title: "Purchase NAHCO stocks at or below N112 when market opens!",
    author: "Uputa Okafor",
    date: "Aug 5, 2025",
    summary: "NAHCO is an aviation handling company that operates in over 70% of the airports in Nigeria alone. Based on current data on NAHCO, we can expect to see....",
    category: "",
    icon: <Brain className="w-4 h-4" />
  },
  // {
  //   title: "AI Governance Framework Adopted by 50+ Countries for Ethical AI Development",
  //   author: "Prof. Michael Rodriguez",
  //   date: "Aug 4, 2025",
  //   summary: "An international consortium has established comprehensive guidelines for responsible AI development, focusing on transparency, accountability, and human oversight. The framework addresses concerns about AI safety while promoting innovation in critical sectors like healthcare and education.",
  //   category: "Policy",
  //   icon: <Lightbulb className="w-4 h-4" />
  // },
  // {
  //   title: "Enterprise AI Adoption Reaches 85% as ROI Metrics Improve Dramatically",
  //   author: "Lisa Thompson",
  //   date: "Aug 3, 2025",
  //   summary: "Latest industry survey shows massive acceleration in enterprise AI adoption, with companies reporting average productivity gains of 35%. Key sectors driving growth include manufacturing, finance, and customer service, with AI-powered automation becoming standard practice.",
  //   category: "Business",
  //   icon: <TrendingUp className="w-4 h-4" />
  // },
  // {
  //   title: "Breakthrough in AI Energy Efficiency Reduces Training Costs by 60%",
  //   author: "Dr. James Park",
  //   date: "Aug 2, 2025",
  //   summary: "Researchers at MIT have developed novel training algorithms that dramatically reduce the computational resources required for large language models. This advancement could make advanced AI more accessible to smaller organizations and reduce environmental impact.",
  //   category: "Technology",
  //   icon: <Brain className="w-4 h-4" />
  // },
  // {
  //   title: "AI-Human Collaboration in Creative Industries Reaches New Heights",
  //   author: "Emma Williams",
  //   date: "Aug 1, 2025",
  //   summary: "Creative professionals report unprecedented collaboration with AI tools, leading to innovative breakthroughs in design, music, and storytelling. The symbiotic relationship between human creativity and AI capabilities is reshaping entire industries.",
  //   category: "Creative",
  //   icon: <Lightbulb className="w-4 h-4" />
  // }
];

const AIInsights = ({ 
  insights = sampleInsights, 
  title = "AI Insights Today + Expert Feedback",
  maxItems = 5 
}) => {
  const displayInsights = insights.slice(0, maxItems);

  const getCategoryColor = (category) => {
    const colors = {
      Research: '#FF6B6B',
      Policy: '#4ECDC4',
      Business: '#45B7D1',
      Technology: '#96CEB4',
      Creative: '#FFEAA7'
    };
    return colors[category] || '#B0B0B0';
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl shadow-2xl">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2979FF]/10 rounded-lg">
              <Brain className="w-5 h-5 text-[#2979FF]" />
            </div>
            <CardTitle className="text-base sm:text-lg font-semibold text-white">
              {title}
              <p className='text-sm text-slate-500'>Your daily recommendation go in here</p>
            </CardTitle>
          </div>
          <p className="text-sm text-[#B0B0B0] mt-2">
            
          </p>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {displayInsights.map((insight, index) => (
            <div key={index} className="group hover:bg-[#242830]/50 p-3 rounded-lg transition-all duration-200">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-3">
                  <div 
                    className="p-1.5 rounded-md flex-shrink-0 mt-1"
                    style={{ backgroundColor: `${getCategoryColor(insight.category)}20` }}
                  >
                    <div style={{ color: getCategoryColor(insight.category) }}>
                      {insight.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#EAEAEA] font-medium text-sm leading-tight group-hover:text-white transition-colors">
                      {insight.title}
                    </h4>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-[#B0B0B0] ml-11">
                  {/* <User className="w-3 h-3" /> */}
                  <img src="/expert.png" alt="" className='w-4  rounded-full'/>
                  <span>{insight.author}</span>
                  <span>•</span>
                  <span>{insight.date}</span>
                  <span>•</span>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${getCategoryColor(insight.category)}20`,
                      color: getCategoryColor(insight.category)
                    }}
                  >
                    {insight.category}
                  </span>
                </div>
                
                <p className="text-[#B0B0B0] text-xs leading-relaxed ml-11 group-hover:text-[#C5C5C5] transition-colors">
                  {insight.summary}
                </p>
                
                <div className="ml-11">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#2979FF] hover:bg-[#2979FF]/10 hover:text-[#4A9AFF] p-0 h-auto text-xs transition-all duration-200"
                  >
                    Continue reading
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
                
                {index < displayInsights.length - 1 && (
                  <div className="border-b border-[#2A2F36] pt-2 sm:pt-3 ml-11" />
                )}
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t border-[#2A2F36]">
            <Button
              variant="outline"
              className="w-full bg-transparent border-[#2A2F36] text-[#B0B0B0] hover:bg-[#2979FF]/10 hover:text-[#2979FF] hover:border-[#2979FF]/50 transition-all duration-200"
            >
              View All Insights
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;