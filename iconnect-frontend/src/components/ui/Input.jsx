import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react'; // Eye and EyeOff icons

const Input = ({ onChange, value, placeholder, style, type, classNames, icon }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="relative max-w-full">
      <input
        className={`rounded-lg shadow-card_shadow p-3 text-app-white bg-input-bg-color focus:outline-none pl-3 ${classNames}`}
        style={style}
        type={showPassword ? 'text' : type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {type === 'password' && ( 
        <span
          className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-auto cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <Eye color="black" /> : <EyeOff color='black'/>}
        </span>
      )}
      {icon && (
        <span className="absolute inset-y-0 right-2 flex items-center pl-3 pointer-events-none">
          {icon}
        </span>
      )}
    </div>
  );
};

export default Input;