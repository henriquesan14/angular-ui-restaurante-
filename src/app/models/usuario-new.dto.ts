export class UsuarioNewDTO {
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    telefone: string;
    senha: string;
    confirmSenha: string;
    perfil?: number;
    logradouro: string;
    numero: string;
    bairro: string;
    complemento?: string;
    cep: string;
}