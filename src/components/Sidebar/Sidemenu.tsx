import React, { useState } from "react";
import { MENU_OPTIONS, MenuOptions } from "../../utils/constants";
import MenuLink from "./MenuLink";
import { useNavigate } from "react-router-dom";

function Sidemenu() {
  const navigate = useNavigate();
  const [selected, setSelectedId] = useState<number>(1);
  const handleSelect = (menu: MenuOptions) => {
    const { id, path } = menu;
    setSelectedId(id);
    console.log(path);
    navigate(path);
  };

  return (
    <ul className="ps-[49px] sticky top-[244px]">
      {MENU_OPTIONS.map((menu) => {
        return (
          <MenuLink
            key={menu.id}
            menu={menu}
            isSelected={selected === menu.id}
            onSelect={() => handleSelect(menu)}
          />
        );
      })}
    </ul>
  );
}

export default Sidemenu;
