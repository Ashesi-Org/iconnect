import React from 'react';

const Button = ({ type, onClick, children, className, style, icon }) => {
  let buttonClasses = 'py-2 px-4 rounded focus:outline-none flex items-center';

  switch (type) {
    case 'primary':
      buttonClasses += ' bg-app-green text-app-hover-green p-10';
      break;
    case 'secondary':
      buttonClasses += ' bg-app-background-1 text-app-hover-green border-1 border-app-hover-green opacity-75';
      break;
    case 'danger':
      buttonClasses += ' bg-red-500 text-white';
      break;
    default:
      buttonClasses += ' bg-gray-500 text-white';
  }

  return (
    <button className={`${buttonClasses} ${className}`} onClick={onClick} style={style}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
