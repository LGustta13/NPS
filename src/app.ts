import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";      // Criar o servidor
import "express-async-errors";
import createConnection from "./database";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

createConnection();

const app = express();

app.use(express.json());

app.use(router);

app.use((e: Error, request: Request, response: Response, _next: NextFunction) => {
    if(e instanceof AppError){
        return response.status(e.statusCode).json({
            message:e.message,
        });
    }

    return response.status(500).json({
        status: "Error",
        message: 'Internal server error ${e.message}',
    });
});

export {app};