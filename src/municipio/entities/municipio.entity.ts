import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { DepartamentoProvincial } from '../../departamento-provincial/entity/dpto-prov.entity';

/**
 * Tabla que contiene las opciones de municipio (Capital, Oran,...)
 */
@Entity()
export class  Municipio {

    @PrimaryGeneratedColumn()
    id_municipio: number;

    @Column({
        type: "varchar",
        length: 200
           })
    municipio: string;

    @Column({
        type: "int"        
           })
    provincia_id: number;

    @Column({
        type: "int"        
           })
    departamento_id: number;

    @ManyToOne(type => DepartamentoProvincial)
    @JoinColumn({
        name: "departamento_id",
        referencedColumnName: "id_dpto_prov"
    })
    departamento: DepartamentoProvincial;

        }