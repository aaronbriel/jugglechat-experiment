import axios from 'axios';
import {createConnection, getConnection, getConnectionManager} from "typeorm";
import {Express, Request, Response} from "express";
const express = require('express');
import * as path from "path";

import { Allocations } from './entity/Allocations';
import { EvaluationResults } from './entity/EvaluationResults';
import { QuizResults } from './entity/QuizResults';
import { WorkerIds } from './entity/WorkerIds';

const JUGGLECHAT_GCP_HOST = process.env.JUGGLECHAT_GCP_HOST;
const GCP_DB_USER = process.env.GCP_DB_USER
const GCP_DB_PASS = process.env.GCP_DB_PASS
const GCP_DB = process.env.GCP_DB
const FLOWER_API = process.env.FLOWER_API
const FLOWER_USER = process.env.FLOWER_USER
const FLOWER_PASS = process.env.FLOWER_PASS

export class Server {

    private app: Express;

    constructor(app: Express) {

        // GCP
        createConnection({
            type: "postgres",
            host: JUGGLECHAT_GCP_HOST,
            extra: {
                 socketPath: JUGGLECHAT_GCP_HOST
            },
            username: GCP_DB_USER,
            password: GCP_DB_PASS,
            database: GCP_DB,
            entities: [
                __dirname + '/entity/*.js',
            ],
            synchronize: true,    
        })

        this.app = app;
        this.app.use(express.static(path.resolve("./") + "/build/client"));

        // Route called by client/src/components/GetId.tsx to store worker IDs and ensure uniqueness in MTurk, 
        // as well as store completion code to ensure complete participation
        this.app.get("/store_id/:workerId&:completionCode", (
            req: Request, res: Response): void => {

            let workerId = req.params.workerId
            let completionCode = req.params.completionCode
            this.storeWorkerIdAndCompletionCode(workerId, completionCode).catch(error => 
                console.log("There was an error storing workerId: " + error)
            )

        });

        // Route called by client/src/components/Chat.tsx. Passes input message to JuggleChat
        this.app.get("/get_response/:experimentalGroup&:workerId&:inputMessage", (req: Request, res: Response): void => {
            axios.post(FLOWER_API, 
                {
                    "args": [req.params.inputMessage]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    auth: {
                        username: FLOWER_USER,
                        password: FLOWER_PASS
                      }
                }
            )
            .then((response) => {
                res.send(response.data)
                let chatbotResponse = response.data.result[0]
                let chatbotType = response.data.result[3]
                let experimentalGroup = req.params.experimentalGroup
                let workerId = req.params.workerId
                let inputMessage = req.params.inputMessage
                this.storeAllocations(experimentalGroup, workerId, inputMessage, chatbotResponse, chatbotType).catch(error => 
                    console.log("There was an error storing allocations: " + error)
                )
            })
            .catch((error) => {
                const errorResponse = {
                    "result": [
                        "So sorry, but there was an issue with getting the response: " + "'" + error + "'", 
                        1.0, "", 
                        "error"], 
                        "state": "SUCCESS"
                    }
                res.send(errorResponse)
            })

        })

        // Route called by client/src/components/Evaluation.tsx to store parameters listed in Evaluation database table
        this.app.get("/store_evaluation/:experimentalGroup&:workerId&:evaluationUsefulness&:evaluationAccuracy&:evaluationSentiment", (
            req: Request, res: Response): void => {

            let experimentalGroup = req.params.experimentalGroup
            let workerId = req.params.workerId
            let sentiment = req.params.evaluationSentiment
            let accuracy = parseInt(req.params.evaluationAccuracy)
            let usefulness = parseInt(req.params.evaluationUsefulness)
            this.storeEvaluationResults(experimentalGroup, workerId, sentiment, accuracy, usefulness).catch(error => 
                console.log("There was an error storing evaluation results: " + error)
            )

        });

        // Route called by client/src/components/Quiz.tsx to store parameters listed in Quiz database table
        this.app.get("/store_quiz/:experimentalGroup&:workerId&:quizAnswer1&:quizAnswer2&:quizAnswer3&:quizAnswer4&:quizAnswer5", (
            req: Request, res: Response): void => {

            let score = this.getQuizScore(
                req.params.quizAnswer1,
                req.params.quizAnswer2,
                req.params.quizAnswer3,
                req.params.quizAnswer4,
                req.params.quizAnswer5
            )

            let experimentalGroup = req.params.experimentalGroup
            let workerId = req.params.workerId
            let quizAnswer1 = req.params.quizAnswer1
            let quizAnswer2 = req.params.quizAnswer2
            let quizAnswer3 = req.params.quizAnswer3
            let quizAnswer4 = req.params.quizAnswer4
            let quizAnswer5 = req.params.quizAnswer5
            this.storeQuizResults(experimentalGroup, workerId, score, quizAnswer1, quizAnswer2, quizAnswer3, quizAnswer4, quizAnswer5).catch(error => 
                console.log("There was an error storing quiz results: " + error)
            )

        });
    
        
        // Wildcard route to re-route back to index for non-existent API calls
        this.app.get("*", (req: Request, res: Response): void => {
            res.sendFile(path.resolve("./") + "/build/client/index.html");
        });
    }

    getQuizScore(quizAnswer1: string, quizAnswer2: string, quizAnswer3: string, quizAnswer4: string, quizAnswer5: string) {
        let score = 0
        const ans1 = Number(quizAnswer1)
        if (ans1 === 2) score++
        const ans2 = Number(quizAnswer2)
        if (ans2 === 3) score++
        const ans3 = Number(quizAnswer3)
        if (ans3 === 3) score++
        const ans4 = Number(quizAnswer4)
        if (ans4 === 4) score++
        const ans5 = Number(quizAnswer5)
        if (ans5 === 2) score++

        score = score/5
        return score.toString()
    }

    storeAllocations = async (
        experimentalGroup: string, workerId: string, inputMessage: string, chatbotResponse: string, chatbotType: string
        ): Promise<any> => {

        const connection = getConnection()
        let allocations = new Allocations();
        allocations.group = experimentalGroup
        allocations.worker_id = workerId
        allocations.chat_input = inputMessage
        allocations.chat_response = chatbotResponse
        allocations.chat_bot_type = chatbotType

        await connection.manager
        .save(allocations)
        .then(allocations => {
            console.log("Allocations have been saved. allocations id is: " + allocations.id);
        });

    }

    storeWorkerIdAndCompletionCode = async (
        workerId: string, completionCode: string
        ): Promise<any> => {

        const connection = getConnection()
        let workerIds = new WorkerIds();
        workerIds.worker_id = workerId;
        workerIds.completion_code = completionCode

        await connection.manager
        .save(workerIds)
        .then(workerIds => {
            console.log("Worker ID and completion code have been saved. workerIds id is: " + workerIds.id);
        });
    }

    storeEvaluationResults = async (
        experimentalGroup: string, workerId: string, sentiment: string, accuracy: number, usefulness: number
        ): Promise<any> => {

        const connection = getConnection()
        let evaluationResults = new EvaluationResults();
        evaluationResults.group = experimentalGroup
        evaluationResults.worker_id = workerId
        evaluationResults.evaluation_sentiment = sentiment
        evaluationResults.evaluation_accuracy = accuracy
        evaluationResults.evaluation_usefulness = usefulness

        await connection.manager
        .save(evaluationResults)
        .then(evaluationResults => {
            console.log("Evaluation results have been saved. evaluationResults id is: " + evaluationResults.id);
        });
    }

    storeQuizResults = async (
        experimentalGroup: string, workerId: string, score: string, quizAnswer1: string, quizAnswer2: string, quizAnswer3: string, quizAnswer4: string, quizAnswer5: string, 
        ): Promise<any> => {

        const connection = getConnection()
        let quizResults = new QuizResults();
        quizResults.group = experimentalGroup
        quizResults.worker_id = workerId
        quizResults.score = score
        quizResults.quiz_answer1 = quizAnswer1
        quizResults.quiz_answer2 = quizAnswer2
        quizResults.quiz_answer3 = quizAnswer3
        quizResults.quiz_answer4 = quizAnswer4
        quizResults.quiz_answer5 = quizAnswer5
        
        await connection.manager
        .save(quizResults)
        .then(quizResults => {
            console.log("Quiz results have been saved. quizResults id is: " + quizResults.id);
        });
    }

    public start(port: number): void {
        this.app.listen(process.env.PORT || 8080, () => console.log(`Server listening on port ${port}!`));
    }

}