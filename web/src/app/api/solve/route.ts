import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";
import db from "@/service/dbService";
import {solver, SolverInput, SolverOutputItem} from "@/service/solverService";

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
        const input: SolverInput = {
            complete_image_base64: await getBase64FromUrl(projectDoc.imageUrl),
            piece_image_base64: base64,
        };
        const result = await solver(input);
        return ResponseSuccess<ApiSolvePost>({
            solves: result.map((item: SolverOutputItem) => {
                const base64 = item.base64;
                let format = '';
                if (base64.startsWith('/9j')) {
                    format = 'jpeg'; // JPEG 格式的 base64 開頭為 /9j
                } else if (base64.startsWith('iVBORw0KGgo')) {
                    format = 'png';  // PNG 格式的 base64 開頭為 iVBORw0KGgo
                } else if (base64.startsWith('R0lGODdh') || base64.startsWith('R0lGODlh')) {
                    format = 'gif';  // GIF 格式的 base64 開頭為 R0lGODdh 或 R0lGODlh
                } else if (base64.startsWith('UklGR')) {
                    format = 'webp'; // WebP 格式的 base64 開頭為 UklGR
                } else {
                    throw new Error('未知的圖片格式');
                }
                return {
                    name: item.name,
                    base64: `data:image/${format};base64,${base64}`,
                };
            }),
        });
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}

async function getBase64FromUrl(url: string): Promise<string> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString('base64');
}
