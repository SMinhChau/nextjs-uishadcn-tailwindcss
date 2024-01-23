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
export interface PropsContent {
  dictionary: {
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
