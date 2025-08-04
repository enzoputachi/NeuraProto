import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StockTable = ({ stocks, title = "Top Gainers" }) => {
  return (
    <Card className="bg-[#1A1D23] border-[#2A2F36] rounded-xl">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-base sm:text-lg font-semibold text-white">
          {title}
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
              {stocks.map((stock, index) => (
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
  );
};


export default StockTable;