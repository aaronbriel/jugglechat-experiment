import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class EvaluationResults {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    group: string;

    @Column("text")
    worker_id: string;

    @Column("text")
    evaluation_sentiment: string;

    @Column("int")
    evaluation_accuracy: number;

    @Column("int")
    evaluation_usefulness: number;

}