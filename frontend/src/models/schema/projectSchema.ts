import {Document, Schema} from "mongoose";

export interface ProjectDocument extends Document {
    isDeleted: boolean;
    name: string;
    imageUrl: string;
}

export const projectSchema: Schema<ProjectDocument> = new Schema<ProjectDocument>({
    isDeleted: {type: Boolean, default: false},
    name: {type: String, required: true},
    imageUrl: {type: String, required: true},
}, {timestamps: true});
