import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";
import db from "@/lib/db";

export interface ApiRootGet {
    dbStatus: string;
}

export async function GET() {
    try {
        return ResponseSuccess<ApiRootGet>({
            dbStatus: db.status,
        });
    } catch (e) {
        return ResponseFail(e);
    }
}
