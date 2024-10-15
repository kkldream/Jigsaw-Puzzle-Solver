import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";

export interface ApiAccountTokenGet {
    authToken: string;
}

export async function GET() {
    try {
        // TODO：來源因該改用 POST 方法
        const res = await fetch("https://account.julojulo.club/api/account/token", {
            cache: "no-store",
        });
        if (!res.ok) return ResponseFail(new Error("Failed to get token"));
        const data = await res.json() as ApiAccountTokenGet;
        return ResponseSuccess<ApiAccountTokenGet>(data);
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}
