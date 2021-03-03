import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Provincia
        ])
    ]
})
export class ProvinciaModule {}
