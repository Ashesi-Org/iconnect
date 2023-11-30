import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const ComplaintsStatistics = ({ statistics, onClick}) => {
  const calculatePercentage = (value, total) => {
    return (value / total) * 100;
  };

  return (
    <div className="flex justify-around items-center mb-5">
      {Object.keys(statistics)?.map((status, index) => {
        const value = statistics[status];
        const total = Object.values(statistics).reduce((acc, curr) => acc + curr, 0);
        const percentage = calculatePercentage(value, total);

        return (
            
            <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <div key={status} className="flex flex-col items-center cursor-pointer" onClick={() => onClick(status)}>
            <svg className="w-20 h-20" viewBox="0 0 36 36">
              <circle
                className="circle-background"
                cx="18"
                cy="18"
                r="15.91549430918954"
                fill="transparent"
                stroke="#ddd"
                strokeWidth="2"
              />
              <circle
                className="circle-progress"
                cx="18"
                cy="18"
                r="15.91549430918954"
                fill="transparent"
                stroke={
                  status === 'open'
                    ? '#ff6b6b'
                    : status === 'in-progress'
                    ? '#ffd166'
                    : status === 'resolved'
                    ? '#06d6a0'
                    : status === 'closed'
                    ? '#6b7280'
                    : ''
                }
                strokeWidth="2"
                strokeDasharray={`${percentage} 100`}
                strokeLinecap="round"
              />
             {percentage > 0 && <text x="5" y="20.35" className="text-xs font-medium text-center text-gray-600">{`${percentage.toFixed(0)}%`}</text>} 
                
            </svg>
            <span className="text-gray-500 mt-2 capitalize">{status}</span>
          </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Group by {status}</p>
                  </TooltipContent>
                </Tooltip>
    </TooltipProvider>
          
        );
      })}
    </div>
  );
};

export default ComplaintsStatistics;
