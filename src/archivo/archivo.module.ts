import { Module } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { ArchivoController } from './archivo.controller';
import { PersonalModule } from 'src/personal/personal.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
//import { PersonalService } from 'src/personal/personal.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Archivo
    ]),
    //PersonalModule
  ],
  controllers: [ArchivoController],
  providers: [
    ArchivoService,
  //  PersonalService
  ],
})
export class ArchivoModule {}
