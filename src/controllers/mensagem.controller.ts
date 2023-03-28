import { Request, Response } from "express";
import mensagemModel from "../models/mensagem.model";

class MensagemController{

    public async enviar(req: Request, res: Response) : Promise<Response> {

        const mensagem = await mensagemModel.create({
            texto: req.body.texto,
            remetente: req.usuario?._id,
            destinatario: req.usuarioChat?._id
        });

        const resposta = {
            message: "Mensagem cadastrada com sucesso",
            _id: mensagem._id
        };
        
        return res.json(resposta);
    }


    public async listar(req: Request, res: Response) : Promise<Response> {
        const usuarioLogadoId = req.usuario?._id;
        const usuarioChatId = req.usuarioChat?._id;

        const mensagens = await mensagemModel.buscaChat(usuarioLogadoId, usuarioChatId).sort('createdAt');

        const mensagensChat = mensagens.map(mensagem => {
            return {
                texto: mensagem.texto,
                createdAt: mensagem.createdAt,
                isRemetente: mensagem.remetente == String(usuarioLogadoId)
            }
        });
       
        return res.json(mensagensChat);

    }

}

export default new MensagemController();