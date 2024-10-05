import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";
import db from "@/service/dbService";

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
