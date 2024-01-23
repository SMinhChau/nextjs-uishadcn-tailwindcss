"use client";
import useFirebaseAuth from "@/hook/useFirebaseAuth";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const AboutPage = () => {
  const router = useRouter();

  const { authState } = useFirebaseAuth();

  useEffect(() => {
    if (!authState?.email) {
      router.push("login");
    }
  }, [authState]);

  return <div>AboutPage</div>;
};

export default AboutPage;
