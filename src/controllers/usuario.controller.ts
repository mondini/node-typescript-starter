import { Request, Response } from "express";
import { MensagemInterface } from "../interfaces/mensagem.interface";
import mensagemModel from "../models/mensagem.model";
import usuarioModel from "../models/usuario.model";
import mensagemService from "../services/mensagem.service";

class UsuarioController {

    public async cadastrar(req: Request, res: Response): Promise<Response> {
        
        const usuario = await usuarioModel.create(req.body);
        
        const resposta = {
            message: "Usuário cadastrado com sucesso",
            _id: usuario._id,
            nome: usuario.nome,
            avatar: usuario.avatar,
            
        };
        
        return res.json(resposta);
    }

    public async login(req: Request, res: Response): Promise<Response> {
        
        const {nome, senha} = req.body;

        const usuario = await usuarioModel.findOne({nome: nome});
        if(!usuario){
            return res.status(404).send({message: "Usuário não encontrado."});
        }
        
        const senhavalida = await usuario.compararSenhas(senha);
        if(!senhavalida){
            return res.status(400).send({message: 'Perdeu.'});       
        } 

        return res.json({
            message: `Olá ${usuario.nome}, seja bem vindo.`,
            token: usuario.gerarToken()
        });  
       
    }

    public getById(req: Request, res: Response): Response {
        return res.json(req.usuarioChat);
    }

    public async listar(req:Request, res: Response): Promise<Response> {

        const usuarioLogadoId = req.usuario?._id;

        const usuarios = await usuarioModel.find({
            _id: {
                $ne: usuarioLogadoId
            }
        });

        const usuariosMensagem = await Promise.all(usuarios.map(usuario => {
            return mensagemModel.buscaChat(usuarioLogadoId, usuario._id)
                .sort('-createdAt')
                .limit(1)
                .transform(mensagens => {
                    return mensagemService.getResultadoMensagemUsuario(usuario, mensagens);
                })
        }));

        const mensagensOrdenadas = mensagemService.sortResultadoMensagemUsuario(usuariosMensagem);
         

        return res.json(mensagensOrdenadas);

    }
}

export default new UsuarioController();