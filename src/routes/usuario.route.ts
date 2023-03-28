import { Router } from "express"
import usuarioController from "../controllers/usuario.controller";
import authMiddleware from "../middlewares/auth.middleware";

const usuarioRoute = Router();

usuarioRoute.post('/cadastro', usuarioController.cadastrar);
usuarioRoute.post('/login', usuarioController.login);

usuarioRoute.get(
    '/:id',
    authMiddleware.autorizarUsuarioPorParamId,
    authMiddleware.autorizarUsuarioPorToken, 
    usuarioController.getById
);

usuarioRoute.get(
    '/',
    authMiddleware.autorizarUsuarioPorToken, 
    usuarioController.listar
);

export default usuarioRoute;