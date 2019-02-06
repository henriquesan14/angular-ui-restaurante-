import { EnderecoDTO } from "./endereco.dto";
import { PedidoDTO } from "./pedido";

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
    pedidos: PedidoDTO[];
}