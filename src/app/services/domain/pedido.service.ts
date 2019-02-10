import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Pedido, PagePedido } from 'src/app/models/pedido';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  insert(pedido: Pedido){
      return this.http.post(`${API_CONFIG.baseUrl}/pedidos`, pedido);
  }

  findAll(): Observable<PagePedido>{
    return this.http.get<PagePedido>(`${API_CONFIG.baseUrl}/pedidos`);
  }

  find(id: string): Observable<Pedido>{
    return this.http.get<Pedido>(`${API_CONFIG.baseUrl}/pedidos/${id}`);
  }

}
