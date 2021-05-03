import { Module } from '@nestjs/common';
import{ConfigModule, ConfigService} from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME, DATABASE_PORT } from "./config/constants";
import { PersonalModule } from './personal/personal.module';
import { AuthModule } from './auth/auth.module';
import { SituacionModule } from './situacion/situacion.module';
import { SexoModule } from './sexo/sexo.module';
import { EstadoCivilModule } from './estado-civil/estado-civil.module';
import { DestinoModule } from './destino/destino.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { DivisionModule } from './division/division.module';
import { SectorModule } from './sector/sector.module';
import { SeccionModule } from './seccion-guardia/seccion.module';
import { EscalafonModule } from './escalafon/escalafon.module';
import { EscalaJerarquicaModule } from './escala-jerarquica/escala-jerarquica.module';
import { GradoModule } from './grado/grado.module';
import { JerarquiaModule } from './jerarquia/jerarquia.module';
import { NivelEducativoModule } from './nivel-educativo/nivel-educativo.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { MunicipioModule } from './municipio/municipio.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { DepartamentoProvincialModule } from './departamento-provincial/departamento-provincial.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>(DATABASE_HOST),
       // host: "172.20.0.2",
        port: parseInt(config.get<string>(DATABASE_PORT),10),
        //port: 3306,
        username: config.get<string>(DATABASE_USERNAME),
        password: config.get<string>(DATABASE_PASSWORD),
        database: config.get<string>(DATABASE_NAME),
        entities: [__dirname + "./**/**/*.entity{.ts,.js}"],
        autoLoadEntities: true,
        synchronize: true,
      }) 
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    UsuarioModule,
    PersonalModule,
    AuthModule,
    SituacionModule,
    SexoModule,
    EstadoCivilModule,
    DestinoModule,
    DepartamentoModule,
    DivisionModule,
    SectorModule,
    SeccionModule,
    EscalafonModule,
    EscalaJerarquicaModule,
    GradoModule,
    JerarquiaModule,
    NivelEducativoModule,
    ProvinciaModule,
    MunicipioModule,
    CiudadModule,
    DepartamentoProvincialModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
