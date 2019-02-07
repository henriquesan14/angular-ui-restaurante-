import { Produto } from "./produto";


export interface Cart{
    items: CartItem[];
}

export interface CartItem{
    quantidade: number;
    produto: Produto; 
}