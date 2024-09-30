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
        let limit = 10;
        try {
            const {searchParams} = new URL(request.url);
            limit = parseInt(searchParams.get('limit') as string);
        } catch (e) {
            console.log("Failed to parse limit");
        }
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
