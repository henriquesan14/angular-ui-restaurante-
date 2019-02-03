import { CategoriaDTO } from "./categoria.dto";

export interface Produto{
    id: number;
    nome: string;
    preco: number;
    categoria: CategoriaDTO;
}