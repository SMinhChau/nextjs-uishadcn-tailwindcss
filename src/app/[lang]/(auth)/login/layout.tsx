import React, { Suspense } from "react";

import { Login } from "@/components";
import { Locale } from "../../../../../i18n-config";
import Loading from "../loading";

interface Props {
  params: { lang: Locale };
}

const page: React.FC<Props> = async ({ params: { lang } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Login lang={lang} />;
    </Suspense>
  );
};

export default page;
