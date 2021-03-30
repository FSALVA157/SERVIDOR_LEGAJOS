import {Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Tabla que contiene las opciones de seccion (primera seccion, segunda seccion, etc)
 */
@Entity()
export class  SeccionGuardia {

    @PrimaryGeneratedColumn()
    id_seccion: number;

    @Column({
        type: "varchar",
        length: 200
           })
    seccion: string;

    @Column({
       type: "int" 
    })
    departamento_id: number;
        }