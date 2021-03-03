import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de municipio (Capital, Oran,...)
 */
@Entity()
export class  Municipio {

    @PrimaryGeneratedColumn()
    id_municipio: number;

    @Column({
        type: "varchar",
        length: 50
           })
    municipio: string;

    @Column({
        type: "int"        
           })
    id_provincia: number;

        }