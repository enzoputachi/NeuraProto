import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PlanCalculator() {
  const [capital, setCapital] = useState('');

  return (
    <div className="bg-black text-white min-h-screen py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center">
        {/* Left Side - Image */}
        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md flex-shrink-0">
          <img
            src="/plan1.jpg"
            alt="Professional investor giving thumbs up"
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>

        {/* Right Side - Plan Card */}
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              You Are Almost There!
            </h1>

            <ul className="text-left text-sm space-y-1 mb-6">
              <li>• Let AI & experts get you the growth you deserve monthly</li>
              <li>
                • Experts provide daily recommendations for you to implement
              </li>
              <li>• AI helps you stay updated on your market & your assets</li>
              <li>• Get daily guidance on what to do</li>
              <li>• Hit good returns on your invested savings monthly</li>
            </ul>
          </div>

          <Card className="bg-gray-200 text-black border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-center font-bold">
                Growth Plan
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className=" p-4 rounded text-sm">
                <p className="text-center text-sm font-semibold">
                  Input Your Capital
                </p>
                <p className="font-medium mb-2">
                  This will allow us determine what number of assets and
                  suggested allocations we can provide for your growth.
                </p>
                <Input
                  id="capital"
                  type="text"
                  placeholder="Enter your capital amount"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  className="bg-white border border-gray-300"
                />
              </div>

              <div className="space-y-2 text-center">
                <Label htmlFor="capital" className="text-center text-sm font-semibold">
                  Estimated Profits
                </Label>
                <p className="text-xs mb-2">
                  Get a glimpse of the potential profits you stand to earn
                  monthly from our smart picks and daily insights.
                </p>
                {/* <Input
                  id="capital"
                  type="text"
                  placeholder="Enter your capital amount"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  className="bg-white border border-gray-300"
                /> */}
              </div>

              <div className="space-y-2 text-center">
                <Label className="text-center text-sm font-semibold">Charges</Label>
                {/* <Input
                  type="text"
                  placeholder="Charges will be calculated"
                  className="bg-white border border-gray-300"
                  readOnly
                /> */}
              </div>

              <Button className="bg-red-600 hover:bg-red-700 text-white w-full py-3 text-base font-semibold mt-6">
                Make Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}