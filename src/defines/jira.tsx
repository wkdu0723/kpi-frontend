/** 프로젝트 작업 로그 데이터 */
export interface workLogs {
  issue_id: string; // 이슈 키값
  totalTime: string; // 이슈 총 작업 시간
  user_id: string; // 유저 키값
  user_name: string; // 유저 이름
}

/** 프로젝트 메인 데이터 */
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
  start_date?: string; // Start Date
}

/** 메인 프로젝트 리스트 검색 시 사용하는 데이터입니다. */
export interface MergeJiraData {
  parents: JiraMainData[];
  children: JiraMainData[];
}