import { MensagemInterface } from "../interfaces/mensagem.interface";
import { MensagemUsuarioInterface, UsuarioInterface } from "../interfaces/usuario.interface";

class MensagemService {

    public getResultadoMensagemUsuario(usuario: UsuarioInterface, mensagens: MensagemInterface[]): MensagemUsuarioInterface {
        return {
            _id: usuario._id,
            nome: usuario.nome,
            avatar: usuario.avatar,
            ultimaMensagem: mensagens[0]?.texto || null,
            dataUltimaMensagem: mensagens[0]?.createdAt || null
        };
    }

    public sortResultadoMensagemUsuario(usuariosMensagem: MensagemUsuarioInterface[]): MensagemUsuarioInterface[] {
        return usuariosMensagem.sort( (a, b) => {
            return (a.dataUltimaMensagem ? 0 : 1) - (b.dataUltimaMensagem ? 0 : 1)
            //|| -(a.dataUltimaMensagem > b.dataUltimaMensagem)
            //|| +(a.dataUltimaMensagem < b.dataUltimaMensagem)
        });
    }

}

export default new MensagemService();