import { JiraMainData, MergeJiraData } from "@/defines/jira";

/** 본인이 가지고 있는 모든 이슈 데이터를 가지고옵니다. */
export const getUserAllIssues = async (accountId: string) => {
    try {
        const resp = await fetch(`http://localhost:3000/api/issues/all_issues?accountId=${accountId}`);
        if (!resp.ok) throw resp;

        const data = await resp.json() as JiraMainData[];
        return data;
    } catch (err) {
        console.error("getUserAllIssues error:", err);
        return [];
    }
}

/**
 * 검색 조건에 맞는 데이터를 가지고옵니다.
 * @param filter: 검색 필터값
 * @param keyword: 검색 키워드
 * */
export const getSearchData = async (filter: string, keyword: string, rowsPerPage: number) => {
    try {
        const resp = await fetch(`http://localhost:3000/api/issues/search?filter=${filter}&keyword=${keyword}&rowsPerPage=${rowsPerPage}`);
        if (!resp.ok) throw resp;

        const data = await resp.json() as MergeJiraData;

        return data;
    } catch (err) {
        console.error("getSearchData error:", err);
        return { parents: [], children: [] };
    }
}

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