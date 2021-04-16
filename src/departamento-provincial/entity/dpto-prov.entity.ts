import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de estado civil (casado, soltero,...)
 */

 @Entity()
export class DepartamentoProvincial {
    
    @PrimaryGeneratedColumn()
    id_dpto_prov: number;

    @Column({
        type: "varchar",
        length: 50
           })
    departamento_provincial: string;
}