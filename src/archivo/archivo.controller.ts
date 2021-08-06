import { Controller, Body, Get, Param, Put, Post, ParseIntPipe, Delete, UseInterceptors, UploadedFile, UnsupportedMediaTypeException, HttpException, HttpStatus, Req, BadRequestException, Patch, Res } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import {Request, Response} from 'express';
//import { PersonalService } from '../personal/personal.service';


@Controller('archivo')
export class ArchivoController {
  constructor(private readonly archivoService: ArchivoService) {}

  @Post()
  create(@Body() createArchivoDto: CreateArchivoDto) {
    return this.archivoService.create(createArchivoDto);
  }

  @Get()
  findAll() {
    return this.archivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archivoService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArchivoDto: UpdateArchivoDto) {
    return this.archivoService.update(+id, updateArchivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivoService.remove(+id);
  }

  /**
   * Petición http que carga un archivo del tipo pdf al servidor
   */
   @Post('pdf')
   @UseInterceptors(
        FileInterceptor(
            'pdf',{
                storage: diskStorage({
                    destination: path.join(__dirname,'../../personal-pdf'),
                    filename: (req, file, cb) => {
                        cb(null, uuid() + path.extname(file.originalname))
                   },
                   },
                ),
                fileFilter: (req, file, cb) => {
                           if(!file.originalname.match(/\.(pdf)$/)){
                                return cb(new HttpException('Sólo se admiten archivos PDF!', HttpStatus.BAD_REQUEST),false);
                             }
                          cb(null, true);
                                             
                    }
            })   
       )
   async cargarPDF(
       @UploadedFile()
       pdf: Express.Multer.File,
       @Req()
       req: Request,    
   ){
       try {
           if(req.query.legajo === null || pdf === null){
                   throw new Error;
           }
           const detalle: string = req.query.detalle.toString() || "";
           const indice: number = parseInt(req.query.indice.toString()) || 0;
           const nuevoPdf: CreateArchivoDto = {
               legajo_personal:   parseInt(req.query.legajo.toString()),
               nombre_archivo: pdf.filename,
               detalle: detalle,
               indice: indice
           }
           

           // console.log(foto);
           return await this.archivoService.cargarPDF(nuevoPdf);
           
       } catch (error) {
           throw new BadRequestException('No olvide adjuntar un pdf y el parámetro legajo del personal!!');
       }
   }


}
