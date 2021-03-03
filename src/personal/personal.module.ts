import { Module } from '@nestjs/common';
import { Personal } from "./entities/personal.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Personal
        ])
    ]
})
export class PersonalModule {}
