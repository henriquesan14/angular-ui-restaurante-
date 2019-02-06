import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { PageProduto } from 'src/app/models/produto.dto';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  findAll(nome: string, page: number, orderBy: string, linesporPage: number): Observable<PageProduto> {
    return this.http.get<PageProduto>(
      `${API_CONFIG.baseUrl}/produtos?nome=${nome}&page=${page}&orderBy=${orderBy}&linesPorPage=${linesporPage}`);
  }

  find(id: string){
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/${id}`);
  }

  findByCategoria(idCategoria: string, nome: string, page: number, orderBy: string, linesporPage: number): Observable<PageProduto>{
    // tslint:disable-next-line:max-line-length
    return this.http.get<PageProduto>(`${API_CONFIG.baseUrl}/produtos/categoria?categoria=${idCategoria}&nome=${nome}&page=${page}&orderBy=${orderBy}&linesPorPage=${linesporPage}`);
  }

  insert(produto: Produto){
    return this.http.post(`${API_CONFIG.baseUrl}/produtos`, produto);
  }

  update(produto: Produto){
    return this.http.put(`${API_CONFIG.baseUrl}/produtos/${produto.id}`, produto);
  }

  delete(id: string) {
    return this.http.delete(`${API_CONFIG.baseUrl}/produtos/${id}`);
  }

}
