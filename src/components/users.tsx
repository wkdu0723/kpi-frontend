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

export const UserData = (): JSX.Element => {
  const [issues, setIssues] = useState<JiraMainData[]>([]);

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
      sx={{ width: "100%", maxWidth: 360 }}
      subheader={
        <ListSubheader>
          <span>투네이션 KPI</span>
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="User" />
      </ListItemButton>
    </List>
  );
};
