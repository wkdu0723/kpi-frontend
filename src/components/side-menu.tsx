"use client";

import { getUserAllIssues } from "@/api/jira";
import { JiraMainData } from "@/defines/jira";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useEffect, useState } from "react";
import style from "./style.module.scss";

export const SideMenu = (): JSX.Element => {
  const [issues, setIssues] = useState<JiraMainData[]>([]);
  const [displayMenu, setDisplayMenu] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserAllIssue = async () => {
      const resp = await getUserAllIssues("6423c871b05b4e3e7daba91f");
      console.log("????? resp:", resp);
      setIssues(resp);
    };
    fetchUserAllIssue();
  }, []);

  return (
    <List
      className={style.SideMenu}
      sx={{ width: "100%", maxWidth: 260 }}
      subheader={
        <ListSubheader>
          <span>투네이션 KPI</span>
          <img
            src={`/images/menu-open.svg`}
            onClick={() => setDisplayMenu(!displayMenu)}
            alt="menu icon"
          />
        </ListSubheader>
      }
    >
      <article data-display={displayMenu}>
        <ListItemButton>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="User" />
        </ListItemButton>
      </article>
    </List>
  );
};
