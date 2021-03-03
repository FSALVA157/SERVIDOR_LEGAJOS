import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de grado (cabo, sargento, alcaide, etc)
 */
@Entity()
export class  Grado {

    @PrimaryGeneratedColumn()
    id_grado: number;

    @Column({
        type: "varchar",
        length: 100
           })
    grado: string;

    @Column({
        type: "int",
            })
    jerarqui_id : number;
        }