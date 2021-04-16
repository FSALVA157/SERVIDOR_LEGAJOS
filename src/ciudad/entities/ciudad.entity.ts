import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de ciudad (salta, Venado Tuerto, etc,...)
 */
@Entity()
export class Ciudad {

    @PrimaryGeneratedColumn()
    id_ciudad: number;

    @Column({
        type: "varchar",
        length: 200
           })
    ciudad: string;

    @Column({
        type: "int",
           })
    municipio_id: number;

    @Column({
        type: "int",
           })
    provincia_id: number;
        }