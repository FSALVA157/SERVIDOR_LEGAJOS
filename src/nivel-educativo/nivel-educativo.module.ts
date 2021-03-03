import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelEducativo } from './entities/nivel-educativo.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NivelEducativo
        ])
    ]
})
export class NivelEducativoModule {}
