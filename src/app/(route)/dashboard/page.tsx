"use client";

import { getSearchData } from "@/api/jira";
import { JiraMainData } from "@/defines/jira";
import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import style from "./style.module.scss";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "project", label: "프로젝트", minWidth: 170 },
  { id: "issue", label: "이슈", minWidth: 100 },
  { id: "account_id", label: "담당자 아이디", minWidth: 100 },
  { id: "account_name", label: "담당자 이름", minWidth: 100 },
  { id: "created", label: "생성 날짜", minWidth: 100 },
  { id: "status_name", label: "진행 상태", minWidth: 100 },
];

const selectTags = [
  { name: "담당자 아이디", id: "assignee_account_id" },
  { name: "이슈 명", id: "assignee_display_name" },
  { name: "프로젝트 명", id: "project_name" },
  { name: "진행 상태", id: "status_name" },
];

export const Dashboard = (): JSX.Element => {
  const [issues, setIssues] = useState<JiraMainData[]>([]);
  const [tag, setTag] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  /** 값 사전검증 후 검색합니다. */
  const serachHandler = async () => {
    const resp = await getSearchData(tag, keyword);
    console.log("??? resp :", resp);
    setIssues(resp);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
  };

  return (
    <section className={style.Dashboard}>
      <article className={style.DashboardHeader}>
        {/* 필터 */}
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
        {/* 검색 */}
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

      {/* 결과 테이블 */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={"left"} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`${item.id}-${item.project_key}`}
                  >
                    <TableCell>{item.project_name}</TableCell>
                    <TableCell>
                      <a href="https://naver.com" target="_blank">
                        {item.summary}
                      </a>
                    </TableCell>
                    <TableCell>{item.assignee_account_id}</TableCell>
                    <TableCell>{item.assignee_display_name}</TableCell>
                    <TableCell>{formatDate(item.created)}</TableCell>
                    <TableCell>{item.status_name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={issues.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </section>
  );
};
