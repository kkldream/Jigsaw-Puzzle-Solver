import db from "@/lib/db";
import aws from "@/lib/aws";

// 專案啟動時執行，但熱重啟(有程式更動)不會執行
export async function register() {
    const s3AccessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const s3SecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const s3Region = process.env.AWS_REGION;
    if (!s3AccessKeyId || !s3SecretAccessKey || !s3Region) throw new Error('Missing AWS credentials');
    aws.init(
        s3AccessKeyId,
        s3SecretAccessKey,
        s3Region
    );

    await db.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
}
