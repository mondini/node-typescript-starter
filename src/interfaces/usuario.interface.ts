export interface UsuarioInterface {
    _id: string;
    nome: string;
    senha?: string;
    avatar?: string;
}

export interface MensagemUsuarioInterface extends UsuarioInterface {
    ultimaMensagem?: string | null;
    dataUltimaMensagem?: Date | null;
}