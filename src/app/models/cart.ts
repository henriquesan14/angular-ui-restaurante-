import { Produto } from "./produto";
import { Pedido } from "./pedido";


export interface Cart{
    items: CartItem[];
}

export interface CartItem{
    quantidade: number;
    produto: Produto; 
    statusItem?: string;
    pedido?: Pedido;
}