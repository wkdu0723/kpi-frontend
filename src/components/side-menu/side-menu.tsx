"use client";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import style from "./style.module.scss";

export const SideMenu = (): JSX.Element => {

  return (
    <article id="SideMenu" className={style.SideMenu}>
      <ListItemButton>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="User" />
      </ListItemButton>
    </article>
  );
};
