import {Document, Schema, Types} from "mongoose";
import {ImageItem} from "@/models/types/ImageItem";

export interface ProjectDocument extends Document {
    _id: Types.ObjectId;
    isDeleted: boolean;
    name: string;
    image: ImageItem;
}

export const ImageSchema: Schema<ImageItem> = new Schema<ImageItem>({
    url: {type: String, required: true},
    width: {type: Number, required: true},
    height: {type: Number, required: true},
    format: {type: String, required: true},
});

export const projectSchema: Schema<ProjectDocument> = new Schema<ProjectDocument>({
    isDeleted: {type: Boolean, default: false},
    name: {type: String, required: true},
    image: {type: ImageSchema, required: true},
}, {timestamps: true});
