import React from 'react';

const VideoCard = ({ videoId, title }) => {
  // Function to convert seconds to 'mm:ss' format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getModulesTimeStamp = (count) => {
    const cards = [];
    
    for (let j = 0; j < count; j++) {
      cards.push( <div key={j} id={j} className="mb-2">
        <span className="text-app-blue text-sm mr-1 cursor-pointer">{formatTime(120)}</span>
        <span className="text-gray-800 font-semibold">|</span>
        <span className="text-gray-500 text-sm ml-1">Electron configuration with shells</span>
      </div>);
    }
  
    return cards;
  };

  return (
    <div className="p-2 max-w-screen-xl mx-auto h-auto rounded overflow-hidden shadow-card_shadow my-4 flex flex-col flex-shrink-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <iframe
          className="w-full md:w-1/2 md:max-w-screen-md h-h_25 "
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="mt-4 text-3xl">

        </div>
        
        <div className="flex flex-col bg-app-background-3 p-4 md:w-1/2">
          <h3 className="text-md md:text-md font-normal mb-2 text-center">{title}</h3>
          <div className="flex flex-col items-center">
            {getModulesTimeStamp(10)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
