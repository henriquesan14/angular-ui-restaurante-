import { Injectable } from '@angular/core';


import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { LocalUser } from '../models/local_user';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { UsuarioNewDTO } from '../models/usuario-new.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService();
  constructor(private http: HttpClient, private storage: StorageService) { }

  authenticate(creds: CredenciaisDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/login`,
    creds,
    {
        observe: 'response',
        responseType: 'text'
    });
  }

  successFullLogin(authorizationValue: string) {
    const tok = authorizationValue.substring(7);
    const user: LocalUser = {
      token: tok,
      email: this.helper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
  }

  register(usuario: UsuarioNewDTO){
    return this.http.post(`${API_CONFIG.baseUrl}/auth/register`, usuario,
    {
        observe: 'response',
        responseType: 'text'
    });
  }


  logout() {
    this.storage.setLocalUser(null);
  }
}
