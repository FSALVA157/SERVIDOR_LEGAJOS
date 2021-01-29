import { Body, Get, Param, Put, Post, ParseIntPipe } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateUserDto } from './dto';


@Controller('usuarios')
export class UsuarioController {
    
    @Get()
    getAll(){
        return {
            message: "Devolviendo todos los usuarios"
        }
    }

    @Get(':id')
    getOne(
        @Param('id',ParseIntPipe)
        id: number
    ){
        return {
            message: `Devolviendo un solo usuario según el id= ${id}`
        }
    }


    @Post()
    create(
        @Body()
        usuarioDto: CreateUserDto
    ){
        return usuarioDto;
    }

    @Put(':id')
    editOne(
        id
    ){

    }

}
