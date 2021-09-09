import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, DeleteApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {

  /**
   * Servicio  que Carga de Imagenes de Usuarios en Cloudinary
   * @param file 
   * @returns 
   */
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    
    return new Promise((resolve, reject) => {
       //v2.uploader.upload(file.path, function(error, result) { console.log(result, error) });
       
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error){
          console.log('ERROR QUE VIENE DE CLOUDINARY', error.message);
          return reject(error);
        } 
        resolve(result);
      });
      
      toStream(file.buffer).pipe(upload);
    });
  }

async deleteImage(fileName: string): Promise<DeleteApiResponse>{
  //fileName = "hzsy4idqbqxm3urrnddk";
  console.log('EL FILE NAME ES >>>>', fileName);
  //const regex = /(\/).(jpg|jpeg|png|gif)/;
  const regex = /(\/).(\.)/;
  console.log(fileName.match(regex));
  return new Promise((resolve, reject) => {

    v2.uploader.destroy(fileName, function(error,result) {
      if(error){
        //console.log('ERROR EN CLOUDINARY>>>', error);
         reject(error);
      }
      //console.log('RESPUESTA EN CLOUDINARY>>>', result);
      if(result.result === 'ok'){
        return {
          status: 'Ok',
          message: 'El Archivo ha sido eliminado con Exito'
        }
      }else{
        reject(new Error(result.result));
      }
  });

});

}
}





