import { CategoriaDTO } from "./categoria.dto";

export interface Produto{
    id: string;
    nome: string;
    preco: number;
    categoria: CategoriaDTO;
}

export interface PageProduto2 {
    content: Array<Produto>;
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
}


export interface Pageable {
    sort: Sort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
    paged: boolean;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
}


export interface Sort {
    sorted: boolean;
    unsorted: boolean;
}