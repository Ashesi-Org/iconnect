import React from 'react';

const Input = ({ onChange, value, placeholder, style, type, classNames,children }) => {
  return (
    <input
      className={`rounded-lg shadow-card_shadow p-3 bg-app-background-1 text-app-black focus:outline-none ${classNames}`}
      style={style}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >{children}</input>
  );
};

export default Input;
