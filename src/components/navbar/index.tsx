"use client";
import React, { useEffect, useMemo } from "react";
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
import useFirebaseAuth from "@/hook/useFirebaseAuth";
import { Locale } from "../../../i18n-config";
import { useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";

export interface Props {
  lang: Locale;
}

const Navbar: React.FC<PropsContent> = ({ lang }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { LogoutAccount, authState } = useFirebaseAuth();
  const { dictionary } = useAppSelector((state: RootState) => state.languages);

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
        {authState?.email && (
          <Input
            type="text"
            placeholder={dictionary?.search}
            className=" h-5/6 hover:border-gray-300 focus:border-gray-300"
          />
        )}
      </div>
      <div className="flex row-auto items-center space-x-2">
        {lang && <SelectOption lang={lang} />}
        {authState?.email ? (
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
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
