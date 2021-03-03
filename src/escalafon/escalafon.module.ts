import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escalafon } from './entities/escalafon.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Escalafon
        ])
    ]
})
export class EscalafonModule {}
