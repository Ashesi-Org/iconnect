import React from 'react';

const SmallCard = ({imageSrc, text, style,onClick}) => {
  return (
    <div onClick = {onClick} className="w-auto h-73 flex-shrink-0  shadow-md flex bg-app-background-3 box-shadow-card_shadow cursor-pointer rounded-lg" style={style}>
      {/* Left side with image content */}
      <div className="w-90 h-83   justify-center flex items-center flex-shrink-0 border-radius-11/4 rounded-l-lg bg-gradient-to-r bg-app-background-2 via-opacity-20  shadow-card_shadow">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})`, width:50, height:50 }}
        />
      </div>

      {/* Right side with text content */}
      <div className="flex flex-col justify-center p-4">
        <p className="text-white text-opacity-90 font-inter text-16 font-semibold leading-normal">
          {text}
        </p>
      </div>
    </div>
  );
};

export default SmallCard;
