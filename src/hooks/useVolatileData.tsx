import { useMemo } from 'react';

export const useVolatileData = () => {
  return useMemo(() => {
    const data = [];
    let holdingsValue = 245000;
    let marketValue = 230000;
    
    const dates = [
      'Oct 26', 'Oct 28', 'Oct 30', 'Nov 02', 'Nov 04', 'Nov 06', 
      'Nov 09', 'Nov 11', 'Nov 13', 'Nov 16', 'Nov 18', 'Nov 20', 
      'Nov 23', 'Nov 26'
    ];
    
    dates.forEach((date, index) => {
      const holdingsChange = (Math.random() - 0.5) * 0.16;
      const marketChange = (Math.random() - 0.5) * 0.12;
      
      holdingsValue += holdingsValue * holdingsChange;
      marketValue += marketValue * marketChange;
      
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
  }, []);
};
