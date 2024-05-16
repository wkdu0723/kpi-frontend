import { JiraMainData } from "@/defines/jira";

/** 본인이 가지고 있는 모든 이슈 데이터를 가지고옵니다. */
export const getUserAllIssues = async (accountId: string) => {
    try {
        const resp = await fetch(`http://localhost:3000/api/users/all_issues?accountId=${accountId}`);
        if (!resp.ok) throw resp;

        const data = await resp.json() as JiraMainData[];
        return data;
    } catch (err) {
        console.error("getUserAllIssues error:", err);
        return [];
    }
}