import { Body, Get, Param, Put, Post, ParseIntPipe, Delete, UseInterceptors, UploadedFile, UnsupportedMediaTypeException, HttpException, HttpStatus, Req } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateUserDto } from './dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UsuarioService } from './usuario.service';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import {Request} from 'express';

@Controller('usuarios')
export class UsuarioController {

    constructor(
        private readonly usuarioService: UsuarioService
    ){}
    
    @Get()
    async getAll(){
        return await this.usuarioService.getMany();
    }

    @Get(':id')
    async getOne(
        @Param('id',ParseIntPipe)
        id: number
    ){
        return await this.usuarioService.getOne(id);
    }


    @Post()
    async create(
        @Body()
        usuarioDto: CreateUserDto
    ){
                
        return await this.usuarioService.createOne(usuarioDto);
    }

    @Put(':id')
    async editOne(
        @Param('id',ParseIntPipe)
        id: number,
        @Body()
        data: EditUserDto
    ){
        return await this.usuarioService.editOne(id, data);

    }

    @Delete(':id')
    async deleteOne(
        @Param('id',ParseIntPipe)
        id: number
        
    ){
        return await this.usuarioService.deleteOne(id);

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
    cargarFoto(
        @UploadedFile()
        foto: Express.Multer.File,
        @Req()
        req: Request,    
    ){
        const id: number = parseInt(req.query.id.toString());
        console.log(foto);
        console.log('EL ID RECIBIDO ES: ', id);
    }

}
