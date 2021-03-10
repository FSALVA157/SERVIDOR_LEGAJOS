import{ Length, IsString} from 'class-validator';


export class CreateSeccionDto {
    
    @IsString()
    @Length(1,200,{message:'La sección debe tener entre $constraint1 y $constraint2 caracteres'})
    seccion: string;
    

}
