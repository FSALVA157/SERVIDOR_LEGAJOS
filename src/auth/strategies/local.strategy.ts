import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,"local"){

    constructor(
        private authService: AuthService
    ){
        super();
    };

    async validate(email: string, clave: string){
        let user = null;
        user = await this.authService.validateUser(email, clave);
        if (!user){
            throw new UnauthorizedException();
    }else{
        return user;
    }
}

}