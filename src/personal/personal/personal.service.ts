import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Personal } from '../entities/personal.entity';
import { Repository } from 'typeorm';

interface IPersonal{
    apellido_1: string,
    apellido_2: string,
    nombre_1: string,
    nombre_2: string,
    nombre_3: string,
    dni: number,
    fecha_nacimiento: Date,
    fecha_ingreso: Date,
    ultimo_ascenso: Date,
    legajo: number,
    cuil: string,
    sexo_id: number,
    estado_civil_id: number,
    destino_id: number,
    departamento_id: number,
    division_id: number,
    sector_id: number,
    seccion_id: number,
    funcion: string,
    escalafon_id: number,
    escala_jerarquica_id: number,
    grado_id: number,
    nacionalidad_id: string,
    domicilio: string,
    provincia_id: number,
    municipio_id: number,
    ciudad_id: number,
    telefonos: string,
    email: string,
    altura: number,
    peso: number,
    nivel_educativo_id: number,
    registrado_por: number,
    situacion_id: number,

}

@Injectable()
export class PersonalService {
    res: Response;
    constructor(
        @InjectRepository(Personal)
        private readonly personalRepository: Repository<Personal>
    ){}

    
/**
 * Servicio que devuelve todos los registros de la tabla PERSONAL
 * segun la Unidad del Usuario
 * @returns 
 */
async getMany(destino_usuario: number){
    try {
        return await this.personalRepository.findAndCount({
            where: [{destino: destino_usuario}]
        });
        
    } catch (error) {
            throw new BadRequestException(error.message)
    }
}

/**
 * Servicio que devuelve un registro USUARIO según ID
 * @param id 
 * @returns 
 */
async getOne(id:number){
    try {
        return await this.personalRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException('El Personal buscado  No Existe',error);

    }
}

/**
 * Servicio que edita un registro USUARIO según id
 * @param id 
 * @param data 
 * @returns 
 */
async editOne(id:number, data: EditUserDto){
    try {
        if(data.img){
            throw new Error('La foto de usuario solo puede ser modificada por el servicio correspondiente!');
        }
        if(data.clave){
            data.clave = await hash(data.clave,10);
        }
     
    
    const respuesta =  await this.personalRepository.update(id, data);
    
    if (respuesta.affected == 0) throw new NotFoundException('Error: No se ha actualizado ningun registro')
    return respuesta;
        
    } catch (error) {
        throw new BadRequestException(error.message);
    }
               
     
}

/**
 * Servicio que elimina un registro USUARIO según ID
 * @param id 
 * @returns 
 */
async deleteOne(id:number){
    const usuarioSeleccionado = await this.personalRepository.findOne(id);
    if(!usuarioSeleccionado) throw new NotFoundException('No existe el Usuario que desea Eliminar');
    return await this.personalRepository.remove(usuarioSeleccionado);
}

/**
 * Servicio que crea un nuevo Usuario 
 * @param data 
 * @returns 
 */
async createOne(data: CreateUserDto){
    
        const existe = await this.personalRepository.findOne({correo: data.correo});
        console.log('USUARIO ENCONTRADO',existe);
        if(existe) throw new BadRequestException('El email que intenta utilizar ya se encuentra utilizado!');
        const nuevo = this.personalRepository.create(data);
        const creado =  await this.personalRepository.save(nuevo);
        //quitare la contraseña por seguridad
        delete creado.clave;
        return creado;
}

async getUserByEmail(correo: string){
     return await this.personalRepository
                .createQueryBuilder('user')
                .where({correo})
                .addSelect('user.clave')
                .getOne()
}

async cargarFoto(foto_url: string, id: number){
    const user = await this.personalRepository.findOne({id_usuario: id});
    if(!user){
        throw new NotFoundException('No existe el usuario al que intenta asignar la imagen');
       return; 
    }

    //si ya existe una foto vamos a eliminarla
        if(user.img !== null){
           
                fs.unlink(path.resolve(user.img)).then().catch(error=>{
                    console.log(error);
                });
           
        }
        
    


    let data: EditUserDto = {
        "img": foto_url
    };
    
    const resultado = await this.personalRepository.update(id, data);
    if(resultado.affected == 0) throw new NotFoundException('No se ha actualizado el campo de imagen');
    return resultado;
}

getFoto(nombre_foto: string){
    try {
        const ruta = path.resolve(__dirname,`../../users-pictures/${nombre_foto}` );
        return ruta;
        
        
    } catch (error) {
        throw new BadRequestException(error.message);
    }


}

async getFotoByIdUsuario(id: number){
    try {
        const user: IUsuario = await this.personalRepository.findOne({id_usuario: id});
        if(!user){
            throw new Error('El Usuario que busca no Existe');
        }
        const ruta = path.resolve(__dirname,`../../users-pictures/${user.img}` );
        return ruta;
        
        
    } catch (error) {
        throw new BadRequestException(error.message);
    }


}

async deleteFoto(id:number){

}





}
