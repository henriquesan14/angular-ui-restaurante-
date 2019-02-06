import { ProdutoDTO } from "./produto.dto";

export interface Cart{
    items: CartItem[];
}

export interface CartItem{
    quantidade: number;
    produto: ProdutoDTO; 
}