import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UsuarioInterface } from '../interfaces/usuario.interface';
import jwt from 'jsonwebtoken';

interface UsuarioModel extends UsuarioInterface, Document {
    _id: string;
    compararSenhas(senha: string): Promise<boolean>;
    gerarToken(): string;
}

const UsuarioSchema = new Schema<UsuarioModel>({
    nome: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: false
    }
});

UsuarioSchema.pre<UsuarioModel>('save', function criptografarSenha(){
    this.senha = bcrypt.hashSync(this.senha, 8);
});

UsuarioSchema.methods.compararSenhas = function (senha: string): Promise<boolean> {
    return bcrypt.compare(senha, this.senha);
}

UsuarioSchema.methods.gerarToken = function (): string {
    
    const dataToken = {
        _id: this._id,
        nome: this.nome,
        avatar: this.avatar
    };

    return jwt.sign(dataToken, "SECRET", {
        expiresIn: "1d"
    })

}

export default model('Usuario', UsuarioSchema);