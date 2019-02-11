import { Injectable } from '@angular/core';


import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  totalDiario(): Observable<number>{
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/total`);
  }

  countPedidosDiario(): Observable<number>{
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/count`);
  }

  countItensDiario(): Observable<number>{
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/itens/count`);
  }

  countDemandas(status: number): Observable<number>{
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/itens/demandas?status=${status}`);
  }

}
