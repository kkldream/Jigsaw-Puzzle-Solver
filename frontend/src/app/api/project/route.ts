import {ResponseFail, ResponseSuccess} from "@/app/api/responseMethod";
import db from "@/lib/db";
import {uploadImageToS3ByBase64} from "@/lib/aws";
import {getFileTypeAndExtension} from "@/service/fileService";

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
        const {name, base64} = await request.json();
        const {fileType, extension} = getFileTypeAndExtension(base64);
        const result = await uploadImageToS3ByBase64(base64, `prod/puzzle/${name}-${new Date().getTime()}.${extension}`, fileType);
        const doc = await db.project.create({
            name: name,
            imageUrl: result,
        });
        console.log(doc);

        return ResponseSuccess<ApiProjectPost>({
            projectId: doc._id.toString(),
        });
    } catch (e) {
        console.error(e);
        return ResponseFail(e);
    }
}
