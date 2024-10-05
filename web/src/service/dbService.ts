import mongoose from "mongoose";
import {ProjectDocument, projectSchema} from "@/models/schema/projectSchema";

const db = {
    connect: async (mongodbUri: string | undefined) => {
        if (!mongodbUri) throw new Error("MONGODB_URI is not set");
        await mongoose.connect(mongodbUri)
    },

    get status() {
        return mongoose.STATES[mongoose.connection.readyState];
    },

    project: getModel<ProjectDocument>("project", projectSchema),
};

function getModel<T>(modelName: string, schema: mongoose.Schema): mongoose.Model<T> {
    if (mongoose.models[modelName]) return mongoose.model<T>(modelName);
    return mongoose.model<T>(modelName, schema);
}

export default db;
