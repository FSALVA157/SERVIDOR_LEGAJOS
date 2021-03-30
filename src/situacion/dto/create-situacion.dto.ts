import{ Length, IsString} from 'class-validator';


export class CreateSituacionDto {
    
    // @IsString()
    // @Length(2,100,{message:'La situación debe tener entre $constraint1 y $constraint2 caracteres'})
    situacion: string;
    

}
