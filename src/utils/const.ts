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
export interface LoginProps {
  dictionary: {
    login: {
      login: string;
      username: string;
      password: string;
      des_pass: string;
      des_user: string;
    };
    error: {
      username: string;
    };
  };
}
