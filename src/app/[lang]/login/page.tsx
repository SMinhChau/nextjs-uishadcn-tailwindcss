import React from "react";
import { Locale } from "../../../../i18n-config";
import { getDictionary } from "../../../../get-dictionary";

const Login = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang);

  return <div>Login</div>;
};

export default Login;
