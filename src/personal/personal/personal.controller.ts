import { Body, Get, Param, Put, Post, ParseIntPipe, Delete, UseInterceptors, UploadedFile, UnsupportedMediaTypeException, HttpException, HttpStatus, Req, BadRequestException, Patch, Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import {Request, Response} from 'express';




import { PersonalService } from './personal.service';

@Controller('personal')
export class PersonalController {
    
    constructor(
        private readonly personalService: PersonalService
    ){}

    @Get('foto')
     async getFoto(
         @Req()
         req: Request,
         @Res()
         res: Response
     ){
      try {
          if(!req.query.foto_nombre){
              throw new Error('Debe proporcionar el nombre de la foto del Usuario');
          }
          const nombre_foto: string = req.query.foto_nombre.toString();
          
              const ruta = this.personalService.getFoto(nombre_foto);
              res.sendFile(ruta);
                   
      } catch (error) {
          throw new BadRequestException(error.message);
      }
     }

    @Get('/id/foto')
     async getFotobyIdUsuario(
         @Req()
         req: Request,
         @Res()
         res: Response
     ){
      try {
          if(!req.query.id){
              throw new Error('Debe proporcionar el id del Usuario');
          }
          const id: number = parseInt(req.query.id.toString());
          
              const ruta = await this.personalService.getFotoByIdUsuario(id);
              res.sendFile(ruta);
          
        
          
      } catch (error) {
          throw new BadRequestException(error.message);
      }
     }
    
    @Get()
    async getAll(){
        return await this.personalService.getMany();
    }

    @Get(':id')
    async getOne(
        @Param('id',ParseIntPipe)
        id: number
    ){
        return await this.personalService.getOne(id);
    }


    @Post()
    async create(
        @Body()
        usuarioDto: CreateUserDto
    ){
                
        return await this.personalService.createOne(usuarioDto);
    }

    @Put(':id')
    async editOne(
        @Param('id',ParseIntPipe)
        id: number,
        @Body()
        data: EditUserDto
    ){
        return await this.personalService.editOne(id, data);

    }

    @Delete(':id')
    async deleteOne(
        @Param('id',ParseIntPipe)
        id: number
        
    ){
        return await this.personalService.deleteOne(id);

    }

    @Post('foto')
    @UseInterceptors(
         FileInterceptor(
             'foto',{
                 storage: diskStorage({
                     destination: path.join(__dirname,'../../users-pictures'),
                     filename: (req, file, cb) => {
                               cb(null, uuid() + path.extname(file.originalname))
                    },
                    },
                 ),
                 fileFilter: (req, file, cb) => {
                    
                        if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
                                         return cb(new HttpException('Formato de archivo inválido (jpg|jpeg|png|gif)', HttpStatus.BAD_REQUEST),false);
                                         
                        }
                           cb(null, true);
                                               
                     }
             })   
        )
    async cargarFoto(
        @UploadedFile()
        foto: Express.Multer.File,
        @Req()
        req: Request,    
    ){
        try {
            if(req.query.id === null || foto === null){
                    throw new Error;
            }
            const id: number = parseInt(req.query.id.toString());
            console.log(foto);
            return await this.personalService.cargarFoto(foto.filename, id);
            
        } catch (error) {
            throw new BadRequestException('No olvide adjuntar un archivo imagen y el parámetro id del  usuario!!');
        }
    }
}
