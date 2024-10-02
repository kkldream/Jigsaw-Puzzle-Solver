import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";
import db from "@/lib/db";

export interface SolveItem {
    name: string;
    base64: string;
}

export interface ApiSolvePost {
    solves: SolveItem[];
}

export async function POST(request: Request) {
    try {
        const {projectId, base64} = await request.json();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const projectDoc = await db.project.findById(projectId).exec();
        if (!projectDoc) return ResponseFail(new Error("projectDoc is null"));
        return ResponseSuccess<ApiSolvePost>({
            solves: [
                {
                    name: "相似分布圖",
                    base64: base64,
                },
                {
                    name: "特徵對照圖",
                    base64: base64,
                },
                {
                    name: "原始圖",
                    base64: projectDoc.imageUrl,
                },
            ],
        });
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}
