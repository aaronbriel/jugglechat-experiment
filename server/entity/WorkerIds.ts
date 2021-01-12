import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class WorkerIds {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    worker_id: string;

    @Column("text")
    completion_code: string;

}