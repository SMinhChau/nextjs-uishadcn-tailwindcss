"use client";
import { AuthContext } from "@/context";
import React, { useContext } from "react";

const AboutPage = () => {
  const user = useContext(AuthContext);

  return <div>AboutPage</div>;
};

export default AboutPage;
