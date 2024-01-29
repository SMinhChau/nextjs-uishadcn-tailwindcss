import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Locale, i18n } from "../../../../i18n-config";

interface Props {
  lang: Locale;
}

const SelectOption: React.FC<Props> = ({ lang }) => {
  const pathName = usePathname();
  const router = useRouter();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  return (
    <Select onValueChange={(value) => redirectedPathName(value)}>
      <SelectTrigger className="w-[90px]">
        <SelectValue placeholder={lang} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {i18n.locales.map((locale, index) => {
            return (
              <SelectItem key={index} value={locale}>
                {locale}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectOption;
