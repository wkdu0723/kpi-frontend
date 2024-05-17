"use client";

import { getSearchData } from "@/api/jira";
import { JiraMainData } from "@/defines/jira";
import { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import style from "./style.module.scss";

/** 검증 값 에러입니다. */
enum ValidateError {
  TagError = 1,
  KeywordError = 2, // 검색값이 없는 경우
}

export const Dashboard = (): JSX.Element => {
  const [issues, setIssues] = useState<JiraMainData[]>([]);
  const [tag, setTag] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const selectTags = [
    { name: "담당자 아이디", id: "assignee_account_id" },
    { name: "이슈 명", id: "assignee_display_name" },
    { name: "프로젝트 명", id: "project_name" },
    { name: "진행 상태", id: "status_name" },
  ];

  /** 값 사전검증 후 검색합니다. */
  const serachHandler = async () => {
    const resp = await getSearchData(tag, keyword);
    console.log("??? resp :", resp);
    setIssues(resp);
  };

  return (
    <article className={style.Dashboard}>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="dashboard-filter-select-label">Filter</InputLabel>
          <Select
            labelId="dashboard-filter-select-label"
            id="dashboard-filter-select"
            label="Filter"
            value={tag}
            onChange={(event) => {
              setTag(event.target.value as string);
            }}
          >
            {selectTags.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box className={style.SearchBox}>
        <TextField
          id="dashboard-search-textfield"
          className={style.SearchTextField}
          label="Search"
          variant="outlined"
          value={keyword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setKeyword(event.target.value);
          }}
        />
        <img src="/images/icon-search.png" onClick={serachHandler} />
      </Box>
    </article>
  );
};
