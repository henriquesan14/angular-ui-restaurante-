import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import {NewPasswordDTO} from 'src/app/models/new-password.dto';
import { API_CONFIG } from 'src/app/config/api.config';
import { StorageService } from '../storage.service';
import { EnderecoDTO } from 'src/app/models/endereco.dto';
import { UsuarioDTO } from 'src/app/models/usuario.dto';
import { UsuarioNewDTO } from 'src/app/models/usuario-new.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _usuario: BehaviorSubject<Usuario>;
  public readonly usuario$: Observable<Usuario>;

  constructor(private http: HttpClient, public storage: StorageService) {
    this._usuario = new BehaviorSubject({} as Usuario);
    this.usuario$ = this._usuario.asObservable();
  }

  atualizarUsuario(email: string) {
    return this.findByEmail(email).pipe(
      tap((usuario: Usuario) => {
        this._usuario.next(usuario);
      })
    );
  }

  findByEmail(email: string): Observable<Usuario>{
    return this.http.get<Usuario>(
      `${API_CONFIG.baseUrl}/usuarios/email?value=${email}`);
  }

  findAll(): Observable<UsuarioDTO[]>{
    return this.http.get<UsuarioDTO[]>(`${API_CONFIG.baseUrl}/usuarios`);
  }

  insert(usuario: UsuarioNewDTO): Observable<UsuarioNewDTO>{
    return this.http.post<UsuarioNewDTO>(`${API_CONFIG.baseUrl}/usuarios`, usuario);
  }


  update(id: string, usuario: UsuarioDTO){
    return this.http.put(`${API_CONFIG.baseUrl}/usuarios/${id}`, usuario,
    {
      observe: 'response',
      responseType: 'text'
    });
  }

  updatePassword(newSenha: NewPasswordDTO){
    return this.http.put(`${API_CONFIG.baseUrl}/usuarios/password`, newSenha);
  }

  findEndereco(idUsuario: string, idEndereco: string): Observable<EnderecoDTO> {
    return this.http.get<EnderecoDTO>(`${API_CONFIG.baseUrl}/usuarios/${idUsuario}/enderecos/${idEndereco}`);
  }

  addEndereco(id: string, endereco: EnderecoDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/usuarios/${id}/enderecos`, endereco);
  }

  updateEndereco(idUsuario: string, idEndereco: string, endereco: EnderecoDTO){
    return this.http.put(`${API_CONFIG.baseUrl}/usuarios/${idUsuario}/enderecos/${idEndereco}`, endereco);
  }

  deleteEndereco(idUsuario: string, idEndereco: string) {
    return this.http.delete(`${API_CONFIG.baseUrl}/usuarios/${idUsuario}/enderecos/${idEndereco}`);
  }

}
