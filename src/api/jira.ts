import { JiraMainData, MergeJiraData } from "@/defines/jira";

/** 지라 메인 프로젝트를 전부 가지고옵니다. */
export const getAllIssues = async () => {
  try {
    const resp = await fetch("http://localhost:3000/api/all_issues");
    if (!resp.ok) throw resp;

    const data = (await resp.json()) as JiraMainData[];
    return data;
  } catch (err) {
    console.error("getUserAllIssues error:", err);
    return [];
  }
};

/** 본인이 가지고 있는 모든 이슈 데이터를 가지고옵니다. */
export const getUserAllIssues = async (accountId: string) => {
  try {
    const resp = await fetch(`http://localhost:3000/api/issues/all_issues?accountId=${accountId}`);
    if (!resp.ok) throw resp;

    const data = (await resp.json()) as JiraMainData[];
    return data;
  } catch (err) {
    console.error("getUserAllIssues error:", err);
    return [];
  }
};

/**
 * 검색 조건에 맞는 데이터를 가지고옵니다.
 * @param filter: 검색 필터값
 * @param keyword: 검색 키워드
 * @param rowsPerPage 페이지
 * */
export const getSearchData = async (filter: string, keyword: string, rowsPerPage: number) => {
  try {
    const resp = await fetch(
      `http://localhost:3000/api/issues/search/mapng?filter=${filter}&keyword=${keyword}&rowsPerPage=${rowsPerPage}`,
    );
    if (!resp.ok) throw resp;

    const data = (await resp.json()) as MergeJiraData[];

    return data;
  } catch (err) {
    console.error("getSearchData error:", err);
    return [];
  }
};

/**
 * 유저기준으로 프로젝트를 검색합니다.
 * @param filter 검색 필터값
 * @param keyword 검색 키워드
 * @param rowsPerPage 페이지
 */
export const getSearchUserProjectData = async (
  filter: string,
  keyword: string,
  rowsPerPage: number,
) => {
  try {
    const resp = await fetch(
      `http://localhost:3000/api/issues/user?filter=${filter}&keyword=${keyword}&rowsPerPage=${rowsPerPage}`,
    );
    if (!resp.ok) throw resp;

    const data = (await resp.json()) as JiraMainData[];

    return data;
  } catch (err) {
    console.error("getSearchData error:", err);
    return [];
  }
};
// /**
//  * 해당 지라 프로젝트의 작업내역을 가지고옵니다. (담당자id, 담당자이름, 시간)
//  * @param issueId: 프로젝트id값
//  * */
// export const getWorkLogData = async (issueId: string) => {
//     try {
//         const resp = await fetch(`http://localhost:3000/api/issues/work_log?issueId=${issueId}`);
//         if (!resp.ok) throw resp;

//         const data = await resp.json() as JiraMainData[];
//         return data;
//     } catch (err) {
//         console.error("getUserAllIssues error:", err);
//         return [];
//     }
// }
