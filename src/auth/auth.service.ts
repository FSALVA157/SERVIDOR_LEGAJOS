import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsuarioService
    ){}

    async validateUser(email: string, clave: string){
        console.log('PASANDO POR AUTH SERVICE');
        const user = await this.userService.getUserByEmail(email);
        console.log('EL USUARIO ES', user);
        (user && user.clave === clave)? user: null;
    }

}
