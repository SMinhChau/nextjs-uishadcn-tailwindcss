"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Locale, i18n } from "../../../../i18n-config";
import { getLanguages } from "@/dictionaries/action";
import { useAppDispatch } from "@/redux/hook";
import { setLanguage } from "@/redux/slice/languages/languagesReducer";

interface Props {
  lang: Locale;
}

const SelectOption: React.FC<Props> = ({ lang }) => {
  const pathName = usePathname();
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    languages("vn");
  }, []);

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    languages(locale as Locale);
    router.push(segments.join("/"));
  };

  const languages = (local: Locale) => {
    getLanguages(local).then((result) => {
      if (result) {
        dispatch(setLanguage(result));
      }
    });
  };

  return (
    <Select onValueChange={(value) => redirectedPathName(value)}>
      <SelectTrigger className="w-[90px]">
        <SelectValue placeholder={lang} />
      </SelectTrigger>
      <SelectContent>
        {i18n.locales.map((locale, index) => (
          <SelectItem key={index} value={locale} textValue={locale}>
            {locale}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectOption;
