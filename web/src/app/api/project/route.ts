import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";
import db from "@/service/dbService";
import aws from "@/service/awsService";

export interface ProjectItem {
    id: string;
    name: string;
    imageUrl: string;
}

export interface ApiProjectGet {
    projects: ProjectItem[];
}

export interface ApiProjectPost {
    projectId: string;
}

export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') as string);
        const files = await db.project
            .find({isDeleted: false})
            .sort({createdAt: -1})
            .limit(limit)
            .exec();
        const projects = files.map(file => ({
            id: file._id.toString(),
            name: file.name,
            imageUrl: file.imageUrl,
        }));
        return ResponseSuccess<ApiProjectGet>({projects});
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}

export async function POST(request: Request) {
    try {
        const {name, base64Url} = await request.json();
        const result = await aws.s3.uploadImage(base64Url, `prod/puzzle/${name}-${new Date().getTime()}`);
        const doc = await db.project.create({
            name: name,
            imageUrl: result,
        });
        return ResponseSuccess<ApiProjectPost>({
            projectId: doc._id.toString(),
        });
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}
