import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seccion } from './entities/seccion.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Seccion
        ])
    ]
})
export class SeccionModule {}
