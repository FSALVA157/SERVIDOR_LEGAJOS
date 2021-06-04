import { Module } from '@nestjs/common';
import { Personal } from "./entities/personal.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalController } from './personal/personal.controller';
import { PersonalService } from './personal/personal.service';

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
