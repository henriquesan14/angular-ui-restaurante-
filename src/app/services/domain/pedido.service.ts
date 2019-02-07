import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Pedido } from 'src/app/models/pedido';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  insert(pedido: Pedido){
      return this.http.post(`${API_CONFIG.baseUrl}/pedidos`, pedido);
  }

}
