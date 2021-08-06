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
  personalService: PersonalService;
  constructor(
    //private readonly personalService: PersonalService,
    @InjectRepository(Archivo)
    private readonly archivoRepository: Repository<Archivo>,
    
  ){ }

  async create(createArchivoDto: CreateArchivoDto) {
    try {
      return await this.archivoRepository.create(createArchivoDto);
    } catch (error) {
      throw new BadRequestException(error.error.message);
      
    }
  }

  findAll() {
    return `This action returns all archivo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} archivo`;
  }

  update(id: number, updateArchivoDto: UpdateArchivoDto) {
    return `This action updates a #${id} archivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} archivo`;
  }

  async cargarPDF(data_archivo: CreateArchivoDto){
    const personal = await this.personalService.getOne(data_archivo.legajo_personal);
    if(!personal){
        throw new NotFoundException('No existe el personal al que intenta asignar el archivo');
    }
    
    try {
      const resultado = await this.create(data_archivo);
      } catch (error) {
      throw new BadRequestException(error.error.message);
    }
    
    
    
}


}
