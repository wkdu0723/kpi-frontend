"use client";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import style from "./style.module.scss";

export const SideMenu = (): JSX.Element => {

  return (
    <article id="SideMenu" className={style.SideMenu}>
      <Link href={"/"}>
        <ListItemButton>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link href={"/user"}>
        <ListItemButton>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="User" />
        </ListItemButton>
      </Link>
    </article>
  );
};
