import React from "react";
import "./login.css";

interface Props {
  children: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="container login-content w-3/4 md:w-1/2  flex justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
