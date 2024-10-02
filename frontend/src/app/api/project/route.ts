import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";
import db from "@/lib/db";

export interface ProjectItem {
    id: string;
    name: string;
    imageUrl: string;
}

export interface ApiProjectGet {
    projects: ProjectItem[];
}

export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') as string);
        const files = await db.project
            .find({isDeleted: false})
            .limit(limit)
            .exec();
        const projects = files.map(file => ({
            id: file._id.toString(),
            name: file.name,
            imageUrl: file.imageUrl,
        }));
        return ResponseSuccess<ApiProjectGet>({projects});
    } catch (e) {
        return ResponseFail(e);
    }
}
