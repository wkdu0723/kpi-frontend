"use client";
import { useState } from "react";
import style from "./style.module.scss";

export const Header = (): JSX.Element => {
  const [displayMenu, setDisplayMenu] = useState<boolean>(true);

  return (
    <header id="Header" className={style.Header} data-display={displayMenu}>
      <p>투네이션 KPI</p>
      <img
        src={`/images/menu-open.svg`}
        onClick={() => setDisplayMenu(!displayMenu)}
        alt="menu icon"
      />
    </header>
  );
};
