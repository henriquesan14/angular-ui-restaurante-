import { EnderecoDTO } from "./endereco.dto";

export interface Usuario{
    id: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    email: string;
    senha?: string;
    telefone: string;
    enderecos: EnderecoDTO[];
    perfis: string[];
    pedidos: string[];
}