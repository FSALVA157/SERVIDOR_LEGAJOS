import { UsuarioRole } from '../enums';
import{IsInt, Min, Length, IsAlphanumeric, MinLength, IsEmail, IsOptional, IsISO8601, Matches, IsEnum, IsString, IsDateString, IsDate} from 'class-validator';
import {Exclude, Transform} from 'class-transformer';
import { Options } from '@nestjs/common';
import { strict } from 'assert';

export class CreateUserDto {
    
    @IsString()
    @Length(4,50,{message:'El usuario debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras'})
    usuario: string;

    @IsString()
    @Length(4,50,{message:'La clave debe tener entre $constraint1 y $constraint2 caracteres en este momento tu texto tiene una longitud de $value letras'})
    clave: string;
    
    @IsInt({message:'El dni debe ser un número entero'})
    @Min(1000000,{message:'El valor que intenta asignar a Dni no es válido'})
    dni: string;
    
    @IsString()
    @Length(4,50,{message:'El nombre debe tener entre $constraint1 y $constraint2 caracteres'})
    nombre: string;
    
    @IsString()
    @Length(4,50,{message:'El apellido debe tener entre $constraint1 y $constraint2 caracteres'})
    apellido: string;

    @IsISO8601()
    // @Transform(()=>Date)
    // @IsDate()
    fecha_alta: Date;

    @IsISO8601()
    // @Transform(()=>Date)
    // @IsDate()
    fecha_baja: Date;
    
    @IsEnum(UsuarioRole)
    role: UsuarioRole

}
