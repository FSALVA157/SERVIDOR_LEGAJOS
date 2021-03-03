import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Departamento
        ])
    ]
})
export class DepartamentoModule {}
