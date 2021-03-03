import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destino } from './entities/destino.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Destino
        ])
    ]
})
export class DestinoModule {}
