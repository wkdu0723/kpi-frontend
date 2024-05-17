import { JiraMainData } from "@/defines/jira";

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
export const getSearchData = async (filter: string, keyword: string) => {
    try {
        const resp = await fetch(`http://localhost:3000/api/issues/search?filter=${filter}&keyword=${keyword}`);
        if (!resp.ok) throw resp;

        const data = await resp.json() as JiraMainData[];
        return data;
    } catch (err) {
        console.error("getUserAllIssues error:", err);
        return [];
    }
}