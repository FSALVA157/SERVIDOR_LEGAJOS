import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
import { PersonalModule } from '../personal/personal.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      Archivo
    ]),
    PersonalModule
  ],
  controllers: [ArchivoController],
  providers: [
    ArchivoService,
  ],
  exports:[ ]
})
export class ArchivoModule {}
