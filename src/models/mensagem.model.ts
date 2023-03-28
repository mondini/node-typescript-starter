import { Model, model, Schema } from 'mongoose';
import { MensagemInterface } from '../interfaces/mensagem.interface';

interface MensagemModel extends MensagemInterface, Document {
    _id: string;
}

interface MensagemStatic extends Model<MensagemModel> {
    buscaChat(usuarioLogadoId?: string, usuarioChatId?: string);
}

const MensagemSchema = new Schema<MensagemModel>({
    texto: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    remetente: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    destinatario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    }
});

MensagemSchema.statics.buscaChat = function(usuarioLogadoId: string, usuarioChatId: string) {
    return this.find({
        $or: [
            { $and: [ {remetente: usuarioLogadoId}, {destinatario: usuarioChatId} ] },
            { $and: [ {remetente: usuarioChatId}, {destinatario: usuarioLogadoId} ] },
        ]
    });
}

export default model<MensagemModel, MensagemStatic>('Mensagem', MensagemSchema);