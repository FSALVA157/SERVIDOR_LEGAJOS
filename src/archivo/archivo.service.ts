import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArchivoDto } from './dto/create-archivo.dto';
import { UpdateArchivoDto } from './dto/update-archivo.dto';
import { Archivo } from './entities/archivo.entity';
import * as fs from 'fs-extra';
import * as path from 'path';
import { PersonalService } from '../personal/personal.service';

@Injectable()
export class ArchivoService {
  
  constructor(
    private readonly personalService: PersonalService,
    @InjectRepository(Archivo)
    private readonly archivoRepository: Repository<Archivo>,
    
  ){ }

  async create(createArchivoDto: CreateArchivoDto) {
    return "Un registro de archivo solo puede ser creado cuando cargo un archivo"
  }

  async findByLegajo(legajo: number) {
    try {
      return await this.archivoRepository.findAndCount({where: {legajo_personal: legajo}})
    } catch (error) {
      throw new BadRequestException(error.error.message);
    }
  }

  async findOneById(id: number) {
    try {
      const archivo = await this.archivoRepository.findOne(id);
      if(!archivo){
          throw new Error('El archivo que busca no Existe');
      }
      const ruta = path.resolve(__dirname,`../../personal-pdf/${archivo.nombre_archivo}` );
      return ruta;
      
      
  } catch (error) {
      throw new BadRequestException(error.message);
  }
  }

  async update(id: number, updateArchivoDto: UpdateArchivoDto) {
    try {
      if(updateArchivoDto.nombre_archivo != null){
        throw new Error('No puede modificar el nombre del archivo por esta via, debe eliminar el mismo y reemplazarlo');
        
      }
      const resultado = await this.archivoRepository.update(id, updateArchivoDto);
      if(resultado.affected == 0){
        throw new Error('Error en la edición de Datos, no se ha actualizado ningún registro');
      }
      return resultado;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const existe = await this.archivoRepository.findOne(id);
      if(!existe){
        throw new Error("No existe el registro que desea eliminar");
         }
      const archivo = existe.nombre_archivo;
      //eliminar imagen
      return fs.unlink(path.join(__dirname,'../../personal-pdf',archivo)).then(async resultado => {
          const respuesta =  await this.archivoRepository.delete(id);
          return {
            status: 200,
            message: 'Se han Eliminado el Registro e Imágen con Exito',
            detalle: respuesta
          };
      }).catch(error=>{
            return new Error('Error al eliminar el pdf asociado al registro');
    });

  }
     catch (error) {
          throw new BadRequestException(error.message);
    }
  }

  async cargarPDF(data_archivo: CreateArchivoDto){
    const personal = await this.personalService.getOne(data_archivo.legajo_personal);
    if(!personal){
        throw new NotFoundException('No existe el personal al que intenta asignar el archivo');
    }
    try {
      const resultado = await this.archivoRepository.create(data_archivo);
      return await this.archivoRepository.save(resultado);
      } catch (error) {
      throw new BadRequestException(error.error.message);
    }
    
    
    
}


}
