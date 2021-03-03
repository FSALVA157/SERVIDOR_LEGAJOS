import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {hash} from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { Repository } from "typeorm";
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsuarioService {

constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
){

}

async getMany(){
    return await this.usuarioRepository.findAndCount();
}

async getOne(id:number){
    try {
        return await this.usuarioRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException('El usuario No Existe',error);

    }
}

async editOne(id:number, data: EditUserDto){
    
            
            if(data.clave){
                data.clave = await hash(data.clave,10);
            }
         
        
        const respuesta =  await this.usuarioRepository.update(id, data);
       
        if (respuesta.affected == 0) throw new NotFoundException('Error: No se ha actualizado ningun registro')
        return respuesta;
       
}

async deleteOne(id:number){
    const usuarioSeleccionado = await this.usuarioRepository.findOne(id);
    if(!usuarioSeleccionado) throw new NotFoundException('No existe el Usuario que desea Eliminar');
    return await this.usuarioRepository.remove(usuarioSeleccionado);
}

async createOne(data: CreateUserDto){
    
        const existe = await this.usuarioRepository.findOne({correo: data.correo});
        console.log('USUARIO ENCONTRADO',existe);
        if(existe) throw new BadRequestException('El email que intenta utilizar ya se encuentra utilizado!');
        const nuevo = this.usuarioRepository.create(data);
        const creado =  await this.usuarioRepository.save(nuevo);
        //quitare la contraseña por seguridad
        delete creado.clave;
        return creado;
}

}
