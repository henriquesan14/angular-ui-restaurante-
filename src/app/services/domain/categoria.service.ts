import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable} from 'rxjs';
import { CategoriaDTO } from 'src/app/models/categoria.dto';




@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {

   }

  findAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
  }

  find(id: string): Observable<CategoriaDTO>{
    return this.http.get<CategoriaDTO>(`${API_CONFIG.baseUrl}/categorias/${id}`);
  }

  insert(categoria: CategoriaDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/categorias`, categoria);
  }

  update(categoria: CategoriaDTO){
    return this.http.put(`${API_CONFIG.baseUrl}/categorias/${categoria.id}`, categoria);
  }

  delete(id: string){
    return this.http.delete(`${API_CONFIG.baseUrl}/categorias/${id}`);
  }
}
