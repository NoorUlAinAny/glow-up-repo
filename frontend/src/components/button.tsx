import React from "react";

interface ButtonProps {
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children,disabled }) => {
  return (
    <button className="custom-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};


export default Button;