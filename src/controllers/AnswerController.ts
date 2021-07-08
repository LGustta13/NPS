import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

// http://localhost:3333/answers/3?u=99d93341-c56c-4ebe-b54e-fefd71e48612
/**
 * Route Params => Parametros que compoe a rota
 * routes.get("/answers/:value")
 * 
 * Query Params => Busca, Paginação, não obrigatórios
 * ?chave=valor
 */

class AnswerController {
    async execute(request: Request, response: Response){

        const {value} = request.params;
        const {u} = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser) {
            throw new AppError("Survey User does not exists!")
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
 
    }
}

export { AnswerController }