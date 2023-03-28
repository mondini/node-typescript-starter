import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UsuarioInterface } from "../interfaces/usuario.interface";
import usuarioModel from "../models/usuario.model";

class AuthMiddleware {

    public async autorizarUsuarioPorToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

        const token = req.headers['x-access-token'];

        if(!token) {
            return res.status(401).send({message: 'Acesso restrito.'});
        }

        try {
            const usuarioToken = jwt.verify(String(token), 'SECRET') as UsuarioInterface;
            const usuario = await usuarioModel.findById(usuarioToken._id);
    
            if(!usuario){
                return res.status(404).send({message: 'Usuário não encontrado.'});
            }

            //injeta novo valor no request, para tanto, arquivo express.d.ts foi criado, adicionando a chave 'usuario' a interface padrão do request, permitindo seu uso
            req.usuario = usuario;
    
            
        } catch (error) {
            return res.status(401).send({message: 'Token inválido.'});
        }

        return next();
    }

    public async autorizarUsuarioPorParamId(req: Request, res: Response, next: NextFunction): Promise<Response | void> {

        try {
            const usuario = await usuarioModel.findById(req.params.id);
    
            if(!usuario){
                return res.status(404).send({message: 'Usuário não encontrado.'});
            }

            //injeta novo valor no request, para tanto, arquivo express.d.ts foi criado, adicionando a chave 'usuario' a interface padrão do request, permitindo seu uso
            req.usuarioChat = usuario;
    
            
        } catch (error) {
            return res.status(401).send({message: 'Usuário inválido.', error: error});
        }

        return next();
    }

}

export default new AuthMiddleware();
