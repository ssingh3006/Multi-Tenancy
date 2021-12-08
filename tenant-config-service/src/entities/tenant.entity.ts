import { Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TenantConfig{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    tenantId: string;

    @Column()
    tenantName: string;

    @Column()
    tenantDbName: string;

    @Column()
    description: string;

    @Column({type: "datetime"})
    createdDateTime: string;

    @Column()
    host: string;

    @Column({type: "int"})
    port: number;
}