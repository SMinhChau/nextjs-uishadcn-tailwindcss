import React from "react";
import "./login.css";

interface Props {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="container login-content w-3/4 md:w-1/2  flex flex-col justify-center">
      <h1 className="title">{title}</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
