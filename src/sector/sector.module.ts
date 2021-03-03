import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Sector
        ])
    ]
})
export class SectorModule {}
