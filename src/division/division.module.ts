import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Division } from './entities/division.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Division
        ])
    ]
})
export class DivisionModule {}
