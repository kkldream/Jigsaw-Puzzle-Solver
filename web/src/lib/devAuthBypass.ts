/**
 * 僅供 `next dev`：外部帳號 API 不可用時，與 {@link verifyUser} 搭配略過遠端驗證。
 * 正式 build（production）不會啟用。
 */
export const DEV_AUTH_BYPASS_TOKEN = '__local_dev_auth_bypass__';

export function isDevAuthBypassAllowed(token: string): boolean {
    return process.env.NODE_ENV === 'development' && token === DEV_AUTH_BYPASS_TOKEN;
}
