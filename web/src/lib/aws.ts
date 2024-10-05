import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {Buffer} from 'buffer';

const bucketName = "julo-server"

class AwsClient {
    private client?: S3Client;
    private region: string = "";

    init(accessKeyId: string, secretAccessKey: string, region: string) {
        this.region = region;
        this.client = new S3Client({
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
            region: region,
        });
    }

    s3 = {
        uploadImage: async (base64: string, key: string, type: string): Promise<string> => {
            if (!this.client) throw new Error('S3 client not initialized');
            const result = await this.client.send(new PutObjectCommand({
                Bucket: bucketName,
                Key: key,
                Body: Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
                ContentEncoding: 'base64',
                ACL: "public-read",
                ContentType: type,
            }));
            if (result.$metadata.httpStatusCode !== 200)
                throw new Error('Failed to upload file to S3');
            return `https://${bucketName}.s3.${this.region}.amazonaws.com/${key}`
        }
    }
}

const aws = new AwsClient();
export default aws;
