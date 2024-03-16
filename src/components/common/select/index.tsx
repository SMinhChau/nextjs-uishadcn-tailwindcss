"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Locale, i18n } from "../../../../i18n-config";
import { getLanguages } from "@/dictionaries/action";
import { useAppDispatch } from "@/redux/hook";
import { setLanguage } from "@/redux/slice/languages/languagesReducer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Props {
  lang: Locale;
}

const SelectOption: React.FC<Props> = ({ lang }) => {
  const pathName = usePathname();
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lang) {
      languages(lang);
    }
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-black dark:text-white">
          {lang}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={lang}
          onValueChange={(value) => redirectedPathName(value)}
        >
          {i18n.locales.map((locale, index) => (
            <DropdownMenuRadioItem key={index} value={locale}>
              {locale}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectOption;
