import React from "react";
import { Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../../get-dictionary";
import { Login } from "@/components";

interface Props {
  params: { lang: Locale };
}

const page: React.FC<Props> = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  return <Login />;
};

export default page;
