"use client";
import { getLanguages } from "@/dictionaries/action";

import React, { useEffect } from "react";

import { assert } from "console";
import firebase_app, { database } from "../../../configFirebase";
import { child, get, getDatabase, ref } from "firebase/database";

const AboutPage = () => {
  useEffect(() => {
    const result = getLanguages("vn");
    console.log("getLanguages >>>> result", result);
  }, []);
  return <div className="container min-h-dvh">AboutPage</div>;
};

export default AboutPage;
