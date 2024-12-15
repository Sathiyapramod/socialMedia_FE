export interface MenuOptions {
    id: number;
    type: string;
    caption: string;
}

export const MENU_OPTIONS: MenuOptions[] = [
    {
        id: 1,
        type: "single",
        caption: "Home",
    },
    {
        id: 2,
        type: "single",
        caption: "Profile",
    },
];
