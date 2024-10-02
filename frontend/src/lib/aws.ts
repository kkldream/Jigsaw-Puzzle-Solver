import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {Buffer} from 'buffer';

const bucketName = "julo-server"
const s3AccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const s3SecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3Region = process.env.AWS_REGION;

if (!s3Region || !s3AccessKeyId || !s3SecretAccessKey) throw new Error('Missing AWS credentials');
const s3Client = new S3Client({
    credentials: {
        accessKeyId: s3AccessKeyId,
        secretAccessKey: s3SecretAccessKey,
    },
    region: s3Region,
});

export async function uploadImageToS3ByBase64(base64: string, key: string, type: string): Promise<string> {
    const result = await s3Client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        ContentEncoding: 'base64',
        ACL: "public-read",
        ContentType: type,
    }));
    if (result.$metadata.httpStatusCode !== 200)
        throw new Error('Failed to upload file to S3');
    return `https://${bucketName}.s3.${s3Region}.amazonaws.com/${key}`
}
