import { Pedido } from "./pedido";

export interface Pagamento{
    id: string;
    valorRecebido: number;
    formaPagamento: string;
    pedido: Pedido;
}