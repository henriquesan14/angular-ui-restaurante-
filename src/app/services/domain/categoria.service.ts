import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable, BehaviorSubject } from 'rxjs';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private _categorias: BehaviorSubject<CategoriaDTO[]>;
  public readonly categorias$: Observable<CategoriaDTO[]>;

  constructor(private http: HttpClient) {
    this._categorias = new BehaviorSubject([]);
    this.categorias$ = this._categorias.asObservable();
   }

   atualizarCategorias() {
    return this.findAll().pipe(
      tap((linguagens: CategoriaDTO[]) => {
        this._categorias.next(linguagens);
      })
    );
  }

  findAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
  }

  insert(categoria: CategoriaDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/categorias`, categoria);
  }
}
