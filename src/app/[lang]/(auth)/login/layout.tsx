import React from "react";

import { Login } from "@/components";
import { Locale } from "../../../../../i18n-config";

interface Props {
  params: { lang: Locale };
}

const page: React.FC<Props> = async ({ params: { lang } }) => {
  return <Login lang={lang} />;
};

export default page;
