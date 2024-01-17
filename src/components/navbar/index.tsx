"use client";
import React from "react";
import "./navbar.css";
import { usePathname } from "next/navigation";
import { i18n } from "../../../i18n-config";
import Link from "next/link";
import { Input } from "../ui/input";

export interface Props {
  dictionary?: {
    search: string;
    decrement: string;
  };
}

const Navbar: React.FC<Props> = ({ dictionary }) => {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <nav className="container-full content-nav flex row-auto justify-between center">
      <div>Logo </div>
      <div className="container w-72 h-8 flex items-center">
        <Input
          type="text"
          placeholder={dictionary?.search}
          className=" h-5/6 hover:border-gray-300 focus:border-gray-300"
        />
      </div>
      <div>
        <ul>
          {i18n.locales.map((locale) => {
            return (
              <li key={locale}>
                <Link href={redirectedPathName(locale)}>{locale}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
