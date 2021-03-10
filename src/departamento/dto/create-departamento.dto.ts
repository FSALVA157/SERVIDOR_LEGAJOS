import{ Length, IsString} from 'class-validator';


export class CreateDepartamentoDto {
    
    @IsString()
    @Length(1,200,{message:'La situación debe tener entre $constraint1 y $constraint2 caracteres'})
    departamento: string;
    

}
