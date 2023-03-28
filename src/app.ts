import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usuarioRoute from './routes/usuario.route';
import mensagemRoute from './routes/mensagem.route';

export class App{

    private express: express.Application;
    private port = 9000;

    constructor() {
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
        this.listen();
    }
    
    public getApp(): express.Application {
        return this.express;
    }

    private middlewares(): void {
        this.express.use(express.json());        
        this.express.use(cors());        
    }

    private listen(): void {
        this.express.listen(this.port, () => {
            console.log(`Servidor iniciado na porta ${this.port}`);
        })  
    }

    private database(): void {
        mongoose.connect('mongodb+srv://mondini:JMX5MGN9o9sH8MBR@cluster0.7yt6ori.mongodb.net/?retryWrites=true&w=majority')        
        .then(() => console.log('connected'))
        .catch(e => console.log(e));
    }

    private routes(): void {
        this.express.use('/usuarios', usuarioRoute);
        this.express.use('/mensagens', mensagemRoute);
    }

}
