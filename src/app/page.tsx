"use client";

import { getAllIssues, getSearchData } from "@/api/jira";
import { JiraMainData, MergeJiraData } from "@/defines/jira";
import { useLayoutEffect, useState } from "react";
import {
  Alert,
  Box,
  Collapse,
  FormControl,
  IconButton,
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
import React from "react";
import { JiraUrl } from "@/libs/Consts";
import { useAlert } from "@/components/alert/alertContext";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  format?: (value: number) => string;
}

/** 테이블 컬럼 */
const columns: readonly Column[] = [
  { id: "arrow", label: "", minWidth: 20 },
  { id: "project", label: "프로젝트", minWidth: 170 },
  { id: "issue", label: "이슈", minWidth: 100 },
  { id: "account_name", label: "담당자 이름", minWidth: 100 },
  { id: "created", label: "생성 날짜", minWidth: 100 },
  { id: "start_date", label: "시작 날짜", minWidth: 100 },
  { id: "status_name", label: "진행 상태", minWidth: 100 },
];

/** 필터 종류입니다. */
const selectFilter: readonly { name: string; id: string }[] = [
  { name: "이슈 명", id: "summary" },
  { name: "담당자 이름", id: "assignee_display_name" },
  { name: "프로젝트 명", id: "project_name" },
  { name: "진행 상태", id: "status_name" },
];

export const Home = (): JSX.Element => {
  const [issues, setIssues] = useState<MergeJiraData[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [project, setProjectId] = useState<string>("");
  const { addAlert } = useAlert();

  const fetchData = async () => {
    const resp = await getAllIssues();
    if (!resp) return;
    setIssues(resp);
  }

  /**
   * 프로젝트를 검색합니다
   * isFetch는 최초 세팅에서만 사용됩니다.
   * */
  const serachHandler = async () => {
    if (!filter) return addAlert("error", "Filter를 선택해주세요");

    fetchData();
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

  useLayoutEffect(() => {
    fetchData();
  }, []);

  /** 부모 리스트 및 자식 리스트를 그려줍니다. */
  const renderTableItem = (item: JiraMainData, isRenderArrow: boolean) => {
    return <TableRow
      className={isRenderArrow ? style.childrenTable : ""}
      hover
      role="checkbox"
      tabIndex={-1}
      key={`home-${item.id}-${item.project_key}`}
    >
      <TableCell>
        {isRenderArrow && <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => {
            setProjectId(project === item.id ? "" : item.id);
          }}
        >
          <img
            className={style.CollapseImage}
            src={`/images/arrow-down.png`}
            alt="down icon"
            data-select={project === item.id}
          />
        </IconButton>}
      </TableCell>
      <TableCell>
        {item.project_name}
      </TableCell>
      <TableCell>
        <a href={`${JiraUrl}/jira/${item.project_type}/projects/${item.project_key}/issues/${item.issue_key}`} target="_blank">
          {item.summary}
        </a>
      </TableCell>
      <TableCell>{item.assignee_display_name}</TableCell>
      <TableCell>{formatDate(item.created)}</TableCell>
      <TableCell>{item.start_date ? formatDate(item.start_date) : " - "}</TableCell>
      <TableCell>{item.status_name}</TableCell>
    </TableRow>;
  }

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
              value={filter}
              onChange={(event) => {
                setFilter(event.target.value as string);
              }}
            >
              {selectFilter.map((item) => {
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
            onKeyUp={(event) => {
              if (event.key === "Enter") serachHandler();
            }}
          />
          <img src="/images/icon-search.png" onClick={() => serachHandler()} />
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
              {issues.map((item) => {
                return (
                  <React.Fragment key={`${item.id}-${item.project_key}`}>
                    {/* 메인 일감 */}
                    {renderTableItem(item, !!item.childs)}
                    {/* 하위 일감 */}
                    {item.childs && <TableRow className={style.ChildrenTableRow}>
                      <TableCell style={{ padding: 0 }} colSpan={7}>
                        <Collapse in={project === item.id} timeout="auto">
                          <Box>
                            <Table>
                              <TableHead className={style.ChildrenTableHead}>
                                <TableRow>
                                  {columns.map((column) => (
                                    <TableCell key={column.id} align={"left"} style={{ minWidth: column.minWidth }}>
                                    </TableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {item.childs.map((childItem) => {
                                  return renderTableItem(childItem, false);
                                })}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>}
                  </React.Fragment>
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

export default Home;