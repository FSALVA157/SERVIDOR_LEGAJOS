import { Injectable } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsuarioService
    ){}

    async validateUser(email: string, clave: string){
        const user = await this.userService.getUserByEmail(email);
        (user && user.clave === clave)? user: null;
    }

}
