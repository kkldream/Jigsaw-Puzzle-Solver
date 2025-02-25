import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {Buffer} from 'buffer';
import {base64UrlToFileTypeAndExtension, base64UrlToWidthAndHeight} from "@/service/base64Service";
import {ImageItem} from "@/models/types/ImageItem";

const s3AccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const s3SecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3Region = process.env.AWS_REGION;
const bucketName = "julo-server";

function getAwsClient() {
    if (!s3AccessKeyId || !s3SecretAccessKey || !s3Region) throw new Error('Missing AWS credentials');
    return new S3Client({
        credentials: {
            accessKeyId: s3AccessKeyId,
            secretAccessKey: s3SecretAccessKey,
        },
        region: s3Region,
    });
}

const aws = {
    s3: {
        uploadImage: async (base64Url: string, path: string): Promise<ImageItem> => {
            const client = getAwsClient();
            const {fileType, extension} = base64UrlToFileTypeAndExtension(base64Url);
            const {width, height} = await base64UrlToWidthAndHeight(base64Url);
            const key = `prod/${path}.${extension}`;
            const result = await client.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: key,
                Body: Buffer.from(base64Url.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
                ContentEncoding: 'base64',
                ACL: "public-read",
                ContentType: fileType,
            }));
            if (result.$metadata.httpStatusCode !== 200)
                throw new Error('Failed to upload file to S3');
            return {
                url: `https://${bucketName}.s3.${s3Region}.amazonaws.com/${key}`,
                width, height,
                format: fileType,
            };
        },
    },
};

export default aws;
