import { Injectable } from '@angular/core';


import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  countPedidosDiario(): Observable<number>{
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/now/count`);
  }

  countItensDiario(): Observable<number>{
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/itens/count`);
  }

  countDemandas(status: number): Observable<number>{
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/itens/demandas?status=${status}`);
  }

}
