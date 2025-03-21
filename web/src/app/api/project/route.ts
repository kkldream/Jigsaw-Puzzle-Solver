import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";
import db from "@/service/dbService";
import aws from "@/service/awsService";
import {verifyUser} from "@/app/api/_services/verifyService";
import {ImageItem} from "@/models/types/ImageItem";

export interface ProjectItem {
    id: string;
    name: string;
    image: ImageItem;
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
        const projects: ProjectItem[] = files.map(file => ({
            id: file._id.toString(),
            name: file.name,
            image: {
                url: file.image.url,
                width: file.image.width,
                height: file.image.height,
                format: file.image.format,
            },
        }));
        return ResponseSuccess<ApiProjectGet>({projects});
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}

export async function POST(request: Request) {
    try {
        const {token, name, base64Url} = await request.json();
        await verifyUser(token);
        const result = await aws.s3.uploadImage(base64Url, `puzzle/${name}-${new Date().getTime()}`);
        const doc = await db.project.create({
            name: name,
            image: result,
        });
        return ResponseSuccess<ApiProjectPost>({
            projectId: doc._id.toString(),
        });
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}
