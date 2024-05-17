export interface JiraMainData {
  id: string;
  project_key: string;
  project_name: string;
  project_type: string;
  created: string; // "2024-05-08T14:23:08.673+0900";
  updated: string; // "2024-05-08T14:23:09.662+0900";
  description: string; // 설명
  summary: string; // 제목
  assignee_account_id: string; // 작성자 id;
  assignee_display_name: string; // 작성자 이름;
  status_name: string;
  status_category_id: string;
  status_category_name: string;
  status_category_color: string;
  parent_id?: string;
  parent_key?: string;
}

// /** 지라 검색할때 사용하는 셀렉트 태그값입니다. */
// export enum SelectTag {
//   accountID = "assignee",
//   Name = "",
//   IssueName = 3,
//   ProjectName = 4,
//   StatusName = 5,
// }

// const columns: readonly Column[] = [
//   { id: "project", label: "프로젝트", minWidth: 170 },
//   { id: "issue", label: "이슈", minWidth: 100 },
//   { id: "account_id", label: "담당자 아이디", minWidth: 100 },
//   { id: "account_name", label: "담당자 이름", minWidth: 100 },
//   { id: "created", label: "생성 날짜", minWidth: 100 },
//   { id: "status_name", label: "진행 상태", minWidth: 100 },
// ];