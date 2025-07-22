import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

export default function PlanSelector() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  const plans = [
    {
      name: "Growth Plan",
      idealFor: "Active investors, passive income seekers, students, etc",
      roi: "5–10%* per month",
      picks: "2–3 strong picks/month",
      charge: "0.0295% of Capital/Mo",
    },
    {
      name: "Partners Plan",
      idealFor: "High income earners & larger capital.",
      roi: "Up to 150%* per annum",
      picks: "Highly strategic picks/ann.",
      charge: "Free Upfront\n10% Commission/Mo",
    },
  ];

  const handlePlanSelect = () => {
    navigate('/calculate');
  }

  return (
    <div className="bg-black text-black py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-20 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center min-h-screen">
      {/* Left Side - Image */}
      <div className="w-full max-w-xs sm:max-w-sm flex-shrink-0">
        <img 
          src="/plan1.jpg" 
          alt="Smiling investor" 
          className="rounded-xl w-full h-auto object-cover" 
        />
      </div>

      {/* Right Side - Plan Selector */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-white text-center lg:text-left">
          Choose Your Preferred Plan
        </h2>
        
        <ul className="ml-4 md:ml-40 lg:ml-0 list-disc mb-6 space-y-2 text-xs sm:text-sm text-gray-300">
          <li>Let AI & experts get you the growth you deserve monthly</li>
          <li>Experts provide daily recommendations for you to implement</li>
          <li>AI helps you stay updated on the market & your assets</li>
          <li>Get daily guidance on what to do</li>
          <li>Hit good returns on your invested savings monthly</li>
        </ul>

        <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:justify-center lg:justify-start">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className="bg-white text-black border border-gray-700 w-full md:w-80 max-w-sm mx-auto md:mx-0"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-black text-lg sm:text-xl text-center">
                  {plan.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs sm:text-sm">
                <div>
                  <strong>Ideal For:</strong> 
                  <span className="ml-1">{plan.idealFor}</span>
                </div>
                <div>
                  <strong>Expected ROI:</strong> 
                  <span className="ml-1">{plan.roi}</span>
                </div>
                <div>
                  <strong>Number Of Expert Picks:</strong> 
                  <span className="ml-1">{plan.picks}</span>
                </div>
                <div>
                  <strong>Charges (Naira):</strong> 
                  <span className="ml-1 whitespace-pre-line">{plan.charge}</span>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-red-500 hover:bg-red-600 text-white w-full mt-4 py-2 text-sm sm:text-base font-semibold"
                      onClick={handlePlanSelect}
                    >
                      Select Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="text-black mx-4 max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-lg sm:text-xl">
                        {plan.name} Selected
                      </DialogTitle>
                    </DialogHeader>
                    <div className="text-sm space-y-2">
                      <p>
                        You've selected the <strong>{plan.name}</strong>.
                      </p>
                      <div>
                        <strong>Ideal for:</strong>
                        <br />
                        <em className="text-gray-700">{plan.idealFor}</em>
                      </div>
                      <div>
                        <strong>Expected ROI:</strong> {plan.roi}
                      </div>
                      <div>
                        <strong>Expert Picks:</strong> {plan.picks}
                      </div>
                      <div>
                        <strong>Charges:</strong>
                        <br />
                        <span className="whitespace-pre-line">{plan.charge}</span>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}