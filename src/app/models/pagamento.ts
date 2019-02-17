import { Pedido } from "./pedido";

export interface Pagamento{
    id: string;
    valorRecebido: string;
    formaPagamento: string;
    pedido: Pedido;
}