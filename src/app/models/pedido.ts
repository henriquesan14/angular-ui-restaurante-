import { MesaDTO } from "./mesa.dto";
import { Usuario } from "./usuario";
import { Cart } from "./cart";

export interface PedidoDTO {
    id: string;
    data: string;
    status: string;
    mesa: MesaDTO;
    cliente: Usuario;
    funcionario: Usuario;
    itens: Cart;
}