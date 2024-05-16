/** 로컬 환경으로 실행되고있는지 여부 */
export const IsLocal = process.env.NEXT_PUBLIC_IS_LOCAL === "true";

/** TODO:: 추후 실서버 url 적용해야함 */
export const host = IsLocal ? "http://localhost:3000" : "http://localhost:3000";
