import { MesaDTO } from "./mesa.dto";
import { Usuario } from "./usuario";
import { CartItem } from "./cart";

export interface Pedido{
    id: string;
    data: string;
    status: string;
    mesa: MesaDTO;
    cliente?: Usuario;
    funcionario: Usuario;
    itens: CartItem[];
}