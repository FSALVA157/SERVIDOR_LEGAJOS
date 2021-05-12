import { BadRequestException, Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
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
){}

/**
 * Servicio que devueleve todos los registros de la tabla USUARIOS
 * @returns 
 */
async getMany(){
    return await this.usuarioRepository.findAndCount();
}

/**
 * Servicio que devuelve un registro USUARIO según ID
 * @param id 
 * @returns 
 */
async getOne(id:number){
    try {
        return await this.usuarioRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException('El usuario No Existe',error);

    }
}

/**
 * Servicio que edita un registro USUARIO según id
 * @param id 
 * @param data 
 * @returns 
 */
async editOne(id:number, data: EditUserDto){
    
            
            if(data.clave){
                data.clave = await hash(data.clave,10);
            }
         
        
        const respuesta =  await this.usuarioRepository.update(id, data);
       
        if (respuesta.affected == 0) throw new NotFoundException('Error: No se ha actualizado ningun registro')
        return respuesta;
       
}

/**
 * Servicio que elimina un registro USUARIO según ID
 * @param id 
 * @returns 
 */
async deleteOne(id:number){
    const usuarioSeleccionado = await this.usuarioRepository.findOne(id);
    if(!usuarioSeleccionado) throw new NotFoundException('No existe el Usuario que desea Eliminar');
    return await this.usuarioRepository.remove(usuarioSeleccionado);
}

/**
 * Servicio que crea un nuevo Usuario 
 * @param data 
 * @returns 
 */
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

async getUserByEmail(correo: string){
     return await this.usuarioRepository
                .createQueryBuilder('user')
                .where({correo})
                .addSelect('user.clave')
                .getOne()
}

<<<<<<< HEAD
async cargarFoto(foto_url: string, id: number){
    const user = this.usuarioRepository.findOne({id_usuario: id});
    if(!user){
       return; 
    }
    this.usuarioRepository.
}

}
