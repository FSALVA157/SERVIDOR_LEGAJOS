import { Injectable, Req, Res, BadRequestException } from '@nestjs/common';
import * as AWS from "aws-sdk";
import { S3_ACCESS_KEY, S3_BUCKET_PDF, S3_SECRET_ACCESS_KEY } from '../config/constants';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class S3Service{
    constructor(
        private config: ConfigService
    ){}
        
    AWS_S3_BUCKET = this.config.get<string>(S3_BUCKET_PDF);
    s3 = new AWS.S3(
        {
        accessKeyId: this.config.get<string>(S3_ACCESS_KEY),
        secretAccessKey: this.config.get<string>(S3_SECRET_ACCESS_KEY),
    }
    );
    async uploadFile(file){
        try {
            const prefijo = "Legajos-Archivos/";
            const { originalname } = file;
            return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype, prefijo);
        } catch (error) {
            return new BadRequestException(error.message);
        }
    }

    async s3_upload(file, bucket, name, mimetype, prefijo)
    {
        const params = 
        {
            Bucket: bucket,
            Key: `${prefijo}${uuid()}_${String(name)}`,
            Body: file,
            ACL: "public-read",
            ContentType: mimetype,
            ContentDisposition:"inline",
            CreateBucketConfiguration: 
            {
                LocationConstraint: "ap-south-1"
            }
        };

        try
        {
            let s3Response = await this.s3.upload(params).promise();
           
            return s3Response;
        }
        catch (e)
        {           
            throw new Error(e.message);            
        }
    }

    async s3_getPdf(key: string){
        try {
            let params = {
                Bucket: this.config.get<string>(S3_BUCKET_PDF),
                Key: key,
            };
             const stream = this.s3.getObject(params).createReadStream();
           
             return stream;            
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}