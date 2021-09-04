import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";
import { S3_ACCESS_KEY, S3_BUCKET_PDF, S3_SECRET_ACCESS_KEY } from '../config/constants';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service
{
    AWS_S3_BUCKET = 'archivos-carcel-xxavierargentino/Legajos-Archivos';
    s3 = new AWS.S3(
        {
        accessKeyId: 'AKIARBJW4VDXYSQBI4ZU',
        secretAccessKey: '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',
    }
    );

    async uploadFile(file)
    {
        const { originalname } = file;
        return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype);
    }

    async s3_upload(file, bucket, name, mimetype)
    {
        const params = 
        {
            Bucket: bucket,
            Key: `${uuid()}+ ${String(name)}`,
            Body: file,
            ACL: "public-read",
            ContentType: mimetype,
            ContentDisposition:"inline",
            CreateBucketConfiguration: 
            {
                LocationConstraint: "ap-south-1"
            }
        };

        console.log(params);

        try
        {
            let s3Response = await this.s3.upload(params).promise();

            console.log(s3Response);
        }
        catch (e)
        {
            console.log(e);
        }
    }
}