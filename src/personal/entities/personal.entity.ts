import {Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn} from "typeorm";

/**
 * Tabla que contiene los datos de todo el personal penitenciario 
 */
@Entity('personal')
export class  Personal {

    @PrimaryGeneratedColumn()
    id_personal: number;

    @Column({
        type: "varchar",
        length: 50,
           })
    apellido_1: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
    apellido_2: string;

    @Column({
        type: "varchar",
        length: 50,
           })
    nombre_1: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
    nombre_2: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
           })
    nombre_3: string;

    @Column({
        type: "int",
        unsigned: true
             })
    dni: number;

    @Column({
        type: "date",
        nullable: true,
           })
    fecha_nacimiento: Date;

    @Column({
        type: "date",
        nullable: true,
           })
    fecha_ingreso: Date;

    @Column({
        type: "date",
        nullable: true,
           })
    ultimo_ascenso: Date;

    @Column({
        type: "int",
        unsigned: true
           })
    legajo: number;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true,
           })
    cuil: string;

    @Column({
        type: "int",
        //unsigned: true
             })
    sexo_id: number;

    @Column({
        type: "int",
        //unsigned: true,
        nullable: true
             })
    estado_civil_id: number;

    @Column({
        type: "int",
        //unsigned: true,
        nullable: true
             })
    destino_id: number;

    @Column({
        type: "int",
        nullable: true
             })
    departamento_id : number;

    @Column({
        type: "int",
        nullable: true
             })
    division_id : number;

    @Column({
        type: "int",
        nullable: true
             })
    sector_id : number;

    @Column({
        type: "int",
        nullable: true
             })
    seccion_id : number;

    @Column({
        type: "varchar",
        length: 200,
        nullable: true
             })
    funcion : string;

    @Column({
        type: "int",
        nullable: true
             })
    escalafon_id : number;

    @Column({
        type: "int",
        nullable: true
             })
    escala_jerarquica_id : number;

    @Column({
        type: "int",
        nullable: true
             })
    grado_id : number;

    @Column({
        type: "varchar",
        length: 10,
        default: "ARG",
        nullable: true
             })
    nacionalidad_id : string;

    @Column({
        type: "varchar",
        length: 300,
        nullable: true
             })
    domicilio : string;

    @Column({
        type: "int",
        nullable: true
             })
    provincia_id : number;

    @Column({
        type: "int",
        nullable: true
             })
    municipio_id : number;

    @Column({
        type: "int",
        nullable: true
             })
    ciudad_id : number;

    @Column({
        type: "varchar",
        length: 300,
        nullable: true
             })
    telefonos : string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
             })
    email : string;

    @Column({
        type: "decimal",
        precision: 3,
        scale: 2,
        default: 0,
        nullable: false
    })
    altura: number;

    @Column({
        type: "decimal",
        precision: 5,
        scale: 2,
        default: 0,
        nullable: false
    })
    peso: number;

    @Column({
        type: "int",
        nullable: true
             })
    nivel_educativo_id : number;

    @Column({
        type: "int",
        nullable: true
            })
    registrado_por: number;

    @Column({
        type: "int",
        nullable: true
             })
    situacion_id : number;

   @CreateDateColumn()
   fecha_alta: Date;

   @UpdateDateColumn()
   ultima_actualizacion:Date;

   @DeleteDateColumn()
   fecha_baja: Date;
    

}