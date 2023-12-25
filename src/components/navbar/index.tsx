import React, { ReactNode } from "react";

export interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <nav className="container p-0">
      Nav bar
      <div className="bg-button-primary border-2">Nav bar</div>
    </nav>
  );
};

export default Navbar;
