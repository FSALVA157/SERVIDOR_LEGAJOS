import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {


    @Post('login')
    login(){
        return {
            message: "ESTAS AUTENTICADO"
        }
    }

    @Get('profile')
    profile(){
        return {
            message: "ESTOS SON TUS DATOS"
        }
    }



}
