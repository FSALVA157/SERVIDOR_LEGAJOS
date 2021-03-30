import{ Length, IsString, IsInt} from 'class-validator';


export class CreateSeccionGuardiaDto {
    
    @IsString()
    @Length(1,200,{message:'La sección debe tener entre $constraint1 y $constraint2 caracteres'})
    seccion: string;
    
    @IsInt()
    departamento_id: number;

}
