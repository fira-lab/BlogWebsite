import React, { useState } from 'react';
import "./PasswordInput.scss";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordInput = ({ placeholder, value, name, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCopy = (e) => {
    e.preventDefault();
    toast.error("Copying is not supported for security reasons.");
  };

  const handlePaste = (e) => {
    e.preventDefault();
    toast.error("Pasting is not supported for security reasons.");
  };

  return (
    <div className='password'>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        name={name}
        value={value}
        onChange={onChange}
        onCopy={handleCopy}
        onPaste={handlePaste}
      />
      <div className="icon" onClick={togglePassword}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
