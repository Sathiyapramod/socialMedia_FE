import React, { useState } from "react";
import { MENU_OPTIONS } from "../../utils/constants";
import MenuLink from "./MenuLink";

function Sidemenu() {
    const [selected, setSelectedId] = useState<number>(0);
    const handleSelect = (id: number) => {
        setSelectedId(id);
    };

    return (
        <ul className="ps-[49px]">
            {MENU_OPTIONS.map((menu) => {
                return (
                    <MenuLink
                        key={menu.id}
                        menu={menu}
                        isSelected={selected === menu.id}
                        onSelect={() => handleSelect(menu.id)}
                    />
                );
            })}
        </ul>
    );
}

export default Sidemenu;
