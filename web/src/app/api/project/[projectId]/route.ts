import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";
import db from "@/service/dbService";
import {ProjectItem} from "@/app/api/project/route";

export async function GET(request: Request) {
    try {
        const projectId = request.url.split('/')[5];
        const doc = await db.project.findById(projectId);
        if (!doc)
            return ResponseFail(new Error('Project not found'));
        return ResponseSuccess<ProjectItem>({
            id: projectId,
            name: doc.name,
            image: doc.image,
        });
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}
