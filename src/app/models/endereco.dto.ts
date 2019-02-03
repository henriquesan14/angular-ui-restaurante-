import { Usuario } from "./usuario";

export interface EnderecoDTO{
    id: string;
    logradouro: string;
    numero: string;
    bairro: string;
    complemento?: string;
    cep: string;
    usuario: Usuario;
}