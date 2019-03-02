import { MesaDTO } from "./mesa.dto";
import { Usuario } from "./usuario";
import { CartItem } from "./cart";
import { Pagamento } from "./pagamento";
import { EnderecoDTO } from "./endereco.dto";

export interface Pedido{
    id: string;
    data: string;
    status: string;
    tipo: string;
    cliente?: Usuario;
    funcionario?: Usuario;
    itens: CartItem[];
    valorTotal: number;
    pagamentos: Pagamento[];
    mesa?: MesaDTO;
    enderecoEntrega: EnderecoDTO;
    "@type": string;
}

export interface PagePedido {
    content: Array<Pedido>;
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