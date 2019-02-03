export interface UsuarioDTO {
    id: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    telefone: string;
    perfil?: string;
}