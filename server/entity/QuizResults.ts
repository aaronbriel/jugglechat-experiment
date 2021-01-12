import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class QuizResults {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    group: string;

    @Column("text")
    worker_id: string;

    @Column("text")
    score: string;

    @Column("text")
    quiz_answer1: string;

    @Column("text")
    quiz_answer2: string;

    @Column("text")
    quiz_answer3: string;

    @Column("text")
    quiz_answer4: string;

    @Column("text")
    quiz_answer5: string;

}