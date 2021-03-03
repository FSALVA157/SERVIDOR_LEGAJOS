import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EscalaJerarquica } from './entities/escala-jerarquica.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            EscalaJerarquica
        ])
    ]
})
export class EscalaJerarquicaModule {}
