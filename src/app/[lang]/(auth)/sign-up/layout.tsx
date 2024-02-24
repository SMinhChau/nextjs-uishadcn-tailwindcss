import SignUp from "@/components/auth/sign-up";
import React from "react";
import { Locale } from "../../../../../i18n-config";

interface Props {
  params: { lang: Locale };
}

const layout: React.FC<Props> = async ({ params: { lang } }) => {
  return <SignUp lang={lang} />;
};

export default layout;
