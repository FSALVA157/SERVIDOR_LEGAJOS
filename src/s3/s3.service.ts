import { Injectable, Req, Res } from '@nestjs/common';
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
            Key: `${uuid()}_${String(name)}`,
            Body: file,
            ACL: "public-read",
            ContentType: mimetype,
            ContentDisposition:"inline",
            CreateBucketConfiguration: 
            {
                LocationConstraint: "ap-south-1"
            }
        };

        //console.log(params);

        try
        {
            let s3Response = await this.s3.upload(params).promise();
            console.log(s3Response);
            return s3Response;
        }
        catch (e)
        {
            console.log(e);
            throw new Error(e.message);
            
        }
    }

    async s3_getPdf(key: string){
        let fileData;       
         let params = {
             Bucket: 'archivos-carcel-xxavierargentino',
             Key: 'Legajos-Archivos/1f3b8c37-067b-4b9c-96e3-cdc110f930af_ficha2.pdf',
         };
          this.s3.getObject(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else{
                fileData = data;
                
            }              // successful response
            /*
            data = {
             AcceptRanges: "bytes", 
             ContentLength: 3191, 
             ContentType: "image/jpeg", 
             ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
             LastModified: <Date Representation>, 
             Metadata: {
             }, 
             TagCount: 2, 
             VersionId: "null"
            }
            */
          });       
          console.log('ENVIANDO DESDE EL SERVICIO S3', fileData);
    }
}