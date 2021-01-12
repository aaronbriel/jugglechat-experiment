import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Allocations {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    group: string;

    @Column("text")
    worker_id: string;

    @Column("text")
    chat_input: string;

    @Column("text")
    chat_response: string;

    @Column("text")
    chat_bot_type: string;
}