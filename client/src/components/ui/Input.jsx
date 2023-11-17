import React from 'react';

const Input = ({ onChange, value, placeholder, style, type, classNames,children }) => {
  return (
    <input
      className={`rounded-lg shadow-card_shadow p-3 mix-blend-overlay bg-input-bg-color focus:outline-none ${classNames}`}
      style={style}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >{children}</input>
  );
};

export default Input;
