import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";

export interface ApiAccountTokenPost {
    authToken: string;
}

export async function POST() {
    try {
        const res = await fetch("https://account.julojulo.club/api/account/token", {
            method: "POST",
        });
        if (!res.ok) return ResponseFail(new Error("Failed to get token"));
        const data = await res.json() as ApiAccountTokenPost;
        return ResponseSuccess<ApiAccountTokenPost>(data);
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}
