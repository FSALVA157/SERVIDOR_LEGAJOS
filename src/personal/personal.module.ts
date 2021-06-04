import { Module } from '@nestjs/common';
import { Personal } from "./entities/personal.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalController } from './personal.controller';
import { PersonalService } from './personal.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Personal
        ])
    ],
    controllers: [PersonalController],
    providers: [PersonalService]
})
export class PersonalModule {}
