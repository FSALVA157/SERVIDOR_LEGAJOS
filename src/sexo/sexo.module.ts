import { Module } from '@nestjs/common';
import { Sexo } from './entities/sexo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            Sexo
        ])
    ]
})
export class SexoModule {}
