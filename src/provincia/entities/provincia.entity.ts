import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de provincia (Salta, Catamarca,etc...)
 */
@Entity()
export class  Provincia {

    @PrimaryGeneratedColumn()
    id_provincia: number;

    @Column({
        type: "varchar",
        length: 100
           })
    provincia: string;
        }