import React from 'react';

const CircularBase = () => {
  return (
    <div
      style={{
        width: '145px',
        height: '145px',
        flexShrink: 0,
        filter: 'drop-shadow(-4px 4px 19.5px rgba(44, 79, 104, 0.46))',
        background: 'linear-gradient(to bottom right, rgba(108, 215, 222, 0.38) 0%, rgba(33, 91, 144, 0.19) 50%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, rgba(108, 215, 222, 0.38) 0%, rgba(33, 91, 144, 0.19) 50%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, rgba(108, 215, 222, 0.38) 0%, rgba(33, 91, 144, 0.19) 50%) top left / 50% 50% no-repeat, linear-gradient(to top right, rgba(108, 215, 222, 0.38) 0%, rgba(33, 91, 144, 0.19) 50%) top right / 50% 50% no-repeat',
        borderRadius: '50%',
        position: 'relative',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="189"
        height="189"
        viewBox="0 0 189 189"
        fill="none"
      >
        <g filter="url(#filter0_d_384_232)">
          <circle cx="98.5" cy="90.5" r="72.5" fill="url(#paint0_diamond_384_232)" shapeRendering="crispEdges"/>
        </g>
        <defs>
          <filter id="filter0_d_384_232" x="0.5" y="0.5" width="188" height="188" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            
          </filter>
          <radialGradient id="paint0_diamond_384_232" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(98.5 90.5) rotate(90) scale(72.5)">
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CircularBase;
