import { Module } from '@nestjs/common';
import { Situacion } from './entities/situacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            Situacion
        ])
    ]
})
export class SituacionModule {}
