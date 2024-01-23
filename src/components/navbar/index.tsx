"use client";
import React, { useMemo } from "react";
import "./navbar.css";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { SelectOption } from "..";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PropsContent } from "@/utils";
import { Logout } from "@/firebase/auth";
import { useAuth } from "@/context";
import useFirebaseAuth from "@/hook/useFirebaseAuth";

export interface Props {
  dictionary?: {
    search: string;
    decrement: string;
    to_profile: string;
    logout: string;
  };
}

const Navbar: React.FC<PropsContent> = ({ dictionary }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { LogoutAccount } = useFirebaseAuth();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const Menus = useMemo(
    () => [
      {
        title: dictionary?.to_profile,
        onClick: () => toProfile(),
      },
      {
        title: dictionary?.logout,
        onClick: () => handelLogout(),
      },
    ],
    [dictionary]
  );

  const toProfile = () => {};
  const handelLogout = () => {
    LogoutAccount();
    router.push("login");
  };

  const handelOpenMenu = () => {};

  const optionMenu = useMemo(() => {
    return <div></div>;
  }, []);
  return (
    <nav className="container content-nav flex row-auto justify-between center">
      <div>Logo </div>
      <div className="container w-72 h-8 flex items-center">
        <Input
          type="text"
          placeholder={dictionary?.search}
          className=" h-5/6 hover:border-gray-300 focus:border-gray-300"
        />
      </div>
      <div className="flex row-auto items-center space-x-2">
        {/* <ul>
          {i18n.locales.map((locale) => {
            return (
              <li key={locale}>
                <Link href={redirectedPathName(locale)}>{locale}</Link>
              </li>
            );
          })}
        </ul> */}
        <SelectOption />

        <DropdownMenu>
          <DropdownMenuTrigger className=" focus:border-none  ">
            <Avatar onClick={handelOpenMenu}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Menus.map((i, index) => {
              return (
                <DropdownMenuItem key={index} onClick={i.onClick}>
                  {i.title}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
