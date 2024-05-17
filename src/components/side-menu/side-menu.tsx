"use client";

import { getUserAllIssues } from "@/api/jira";
import { JiraMainData } from "@/defines/jira";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import style from "./style.module.scss";

export const SideMenu = (): JSX.Element => {
  const [issues, setIssues] = useState<JiraMainData[]>([]);

  useEffect(() => {
    const fetchUserAllIssue = async () => {
      const resp = await getUserAllIssues("6423c871b05b4e3e7daba91f");
      setIssues(resp);
    };
    fetchUserAllIssue();
  }, []);

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
