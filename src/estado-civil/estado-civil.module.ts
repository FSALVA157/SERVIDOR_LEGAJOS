import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCivil } from './entities/estado-civil.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EstadoCivil
        ])
    ]
})
export class EstadoCivilModule {}
