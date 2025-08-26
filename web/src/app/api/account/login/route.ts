import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";

export interface ApiAccountLoginGet {
    userId: string;
}

export async function POST(request: Request) {
    try {
        const {token, username, password} = await request.json();
        const res = await fetch("https://account.julojulo.com/api/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken": token,
            },
            body: JSON.stringify({username, password}),
        });
        if (!res.ok) return ResponseFail(new Error("Failed to get token"));
        const data = await res.json() as ApiAccountLoginGet;
        return ResponseSuccess<ApiAccountLoginGet>(data);
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}
