import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable } from 'rxjs';
import { MesaDTO } from 'src/app/models/mesa.dto';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<MesaDTO[]>{
    return this.http.get<MesaDTO[]>(`${API_CONFIG.baseUrl}/mesas`);
  }

  insert(mesa: MesaDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/mesas`, mesa);
  }
}
