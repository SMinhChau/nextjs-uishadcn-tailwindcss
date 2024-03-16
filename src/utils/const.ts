import { Locale } from "../../i18n-config";

export type ThemeUi = "system" | "dark" | "light";

export const NavBar = [
  {
    title: "Home",
    url: "/home",
  },
  {
    title: "About",
    url: "/about",
  },
  {
    title: "Schedule",
    url: "/schedule",
  },
];

export type LanguageState = {
  login: {
    login: string;
    username: string;
    password: string;
    des_pass: string;
    des_user: string;
    error_login: string;
    success_login: string;
  };
  error: {
    username: string;
    notification: string;
  };
  search: string;
  success: {
    notification: string;
  };
  to_profile: string;
  logout: string;
};
export interface PropsContent extends LanguageState {
  lang?: Locale;
}

export type ErrorType = {
  code: number;
  message: string;
  errors: [
    {
      message: string;
      domain: string;
      reason: string;
    }
  ];
};

export type LoginResponse = {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
};

export const LanguagesDefault = {
  login: {
    login: "",
    username: "",
    password: "",
    des_pass: "",
    des_user: "",
    error_login: "",
    success_login: "",
    sign_up: "",
    register: "",
    sign_in: "",
    success_register: "",
  },
  error: {
    username: "",
    notification: "",
  },
  search: "",
  success: {
    notification: "",
  },
  to_profile: "",
  logout: "",
};

export type ThemeStyles = "light" | "dark" | "system";
