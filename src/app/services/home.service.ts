import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private _demandasCozinha: BehaviorSubject<number>;
  public readonly demandasCozinha$: Observable<number>;

  private _demandasGarcom: BehaviorSubject<number>;
  public readonly demandasGarcom$: Observable<number>;


  constructor(private http: HttpClient) {
    this._demandasCozinha = new BehaviorSubject({} as number);
    this.demandasCozinha$ = this._demandasCozinha.asObservable();
    this._demandasGarcom = new BehaviorSubject({} as number);
    this.demandasGarcom$ = this._demandasGarcom.asObservable();
  }

  atualizaDemandasCozinha() {
    return this.countDemandasCozinha().pipe(
      tap((demandas: number) => {
        this._demandasCozinha.next(demandas);
      })
    );
  }

  atualizaDemandasGarcom() {
    return this.countDemandasGarcom().pipe(
      tap((demandas: number) => {
        this._demandasGarcom.next(demandas);
      })
    );
  }

  countPedidosDiario(): Observable<number>{
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/now/count`);
  }

  countItensDiario(): Observable<number>{
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/itens/count`);
  }

  countDemandasCozinha(): Observable<number>{
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/itens/demandas?status=1`);
  }

  countDemandasGarcom(){
    return this.http.get<number>(`${API_CONFIG.baseUrl}/pedidos/itens/demandas?status=2`);
  }

}
