import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";
import db from "@/service/dbService";
import {solver, SolverInput} from "@/service/solverService";
import {imageUrlToBase64} from "@/service/base64Service";

export interface SolveItem {
    name: string;
    base64: string;
}

export interface ApiSolvePost {
    solves: SolveItem[];
}

export async function POST(request: Request) {
    try {
        const {token, projectId, base64} = await request.json();

        // Verify user
        const res = await fetch("https://account.julojulo.club/api/third/verify/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken": token,
            },
        });
        if (!res.ok) return ResponseFail(new Error("Failed to verify user"));

        await new Promise((resolve) => setTimeout(resolve, 1000));
        const projectDoc = await db.project.findById(projectId).exec();
        if (!projectDoc) return ResponseFail(new Error("projectDoc is null"));
        const input: SolverInput = {
            complete_image_base64: await imageUrlToBase64(projectDoc.imageUrl),
            piece_image_base64: base64,
        };
        const result = await solver(input);
        return ResponseSuccess<ApiSolvePost>({
            solves: result,
        });
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}
