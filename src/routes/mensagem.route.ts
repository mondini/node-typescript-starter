import { Router } from "express";
import mensagemController from "../controllers/mensagem.controller";
import authMiddleware from "../middlewares/auth.middleware";

const mensagemRoute = Router();

mensagemRoute.post(
    '/:id',
    authMiddleware.autorizarUsuarioPorParamId,
    authMiddleware.autorizarUsuarioPorToken, 
    mensagemController.enviar
);

mensagemRoute.get(
    '/:id',
    authMiddleware.autorizarUsuarioPorParamId,
    authMiddleware.autorizarUsuarioPorToken, 
    mensagemController.listar
);

export default mensagemRoute;