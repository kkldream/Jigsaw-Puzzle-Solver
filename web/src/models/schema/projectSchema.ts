import {Document, Schema, Types} from "mongoose";

export interface ProjectDocument extends Document {
    _id: Types.ObjectId;
    isDeleted: boolean;
    name: string;
    imageUrl: string;
}

export const projectSchema: Schema<ProjectDocument> = new Schema<ProjectDocument>({
    isDeleted: {type: Boolean, default: false},
    name: {type: String, required: true},
    imageUrl: {type: String, required: true},
}, {timestamps: true});
