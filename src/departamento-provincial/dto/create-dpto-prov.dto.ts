import{ Length, IsString} from 'class-validator';

export class CreateDptoProvDto {
    
    @IsString()
    @Length(1,50,{message:'El Departamento debe tener entre $constraint1 y $constraint2 caracteres'})
    departamento_provincial: string;

}
