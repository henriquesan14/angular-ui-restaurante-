import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';
import { CredenciaisDTO } from 'src/app/models/credenciais.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: CredenciaisDTO = {
    email: '',
    senha: ''
  };

  constructor(private auth: AuthService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  login() {
    this.auth.authenticate(this.creds)
    .subscribe((response) => {
      this.auth.successFullLogin(response.headers.get('Authorization'));
      this.toastr.success('Bem vindo!', 'Sucesso');
      this.router.navigateByUrl('/dashboard');
    }, (error) => {
      if (error.status === 401) {
        this.toastr.error('Email ou senha incorretos!', 'Falha');
      }
    });
  }
}
