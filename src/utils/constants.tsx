export interface MenuOptions {
  id: number;
  type: string;
  caption: string;
  path: string;
}

export const MENU_OPTIONS: MenuOptions[] = [
  {
    id: 1,
    type: "single",
    caption: "Home",
    path: "/home",
  },
  {
    id: 2,
    type: "single",
    caption: "Profile",
    path: "/profile",
  },
];
