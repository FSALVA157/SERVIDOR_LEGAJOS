import{ Length, IsString, IsInt} from 'class-validator';


export class CreateDivisionDto {
    
    @IsString()
    @Length(1,100,{message:'La división debe tener entre $constraint1 y $constraint2 caracteres'})
    division: string;

    @IsInt()
    departamento_id: number;
    
}