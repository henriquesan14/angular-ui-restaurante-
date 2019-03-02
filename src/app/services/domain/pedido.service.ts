import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Pedido, PagePedido } from 'src/app/models/pedido';
import { Observable} from 'rxjs';
import { CartItem } from 'src/app/models/cart';
import { StatisticsPedido } from 'src/app/models/statistics-pedido';
import { Pagamento } from 'src/app/models/pagamento';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) {
    
   }

  insert(pedido: Pedido){
      return this.http.post(`${API_CONFIG.baseUrl}/pedidos`, pedido);
  }

  findAll(): Observable<PagePedido>{
    return this.http.get<PagePedido>(`${API_CONFIG.baseUrl}/pedidos`);
  }

  find(id: string): Observable<Pedido>{
    return this.http.get<Pedido>(`${API_CONFIG.baseUrl}/pedidos/${id}`);
  }

  findByStatus(status: number): Observable<PagePedido>{
    return this.http.get<PagePedido>(`${API_CONFIG.baseUrl}/pedidos/status?status=${status}`);
  }

  itensByStatus(status: string): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(`${API_CONFIG.baseUrl}/pedidos/itens?status=${status}`);
  }

  updateStatusItem(idPedido: string, idProduto: string, status: string){
    return this.http.put(`${API_CONFIG.baseUrl}/pedidos/itens?idPedido=${idPedido}&idProduto=${idProduto}`,status);
  }

  pedidosDiario(): Observable<PagePedido>{
    return this.http.get<PagePedido>(`${API_CONFIG.baseUrl}/pedidos/now`);
  }

  itensDiario(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(`${API_CONFIG.baseUrl}/pedidos/itens/now`);
  }

  total(): Observable<number>{
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/total`);
  }

  statisticsPedido(): Observable<StatisticsPedido[]>{
    return this.http.get<StatisticsPedido[]>(`${API_CONFIG.baseUrl}/pedidos/statistics`);
  }
  
  addPagamento(id: string, pag: Pagamento){
    return this.http.post(`${API_CONFIG.baseUrl}/pedidos/${id}/pagamentos`, pag);
  }

}
