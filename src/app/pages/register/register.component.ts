import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioNewDTO } from 'src/app/models/usuario-new.dto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usuario: UsuarioNewDTO = <UsuarioNewDTO>{complemento: ''};
  public maskCep = [ /[0-9]/, /\d/, /\d/, /\d/, /\d/ , '-', /\d/, /\d/, /\d/];
  public maskCpf = [ /[0-9]/, /\d/, /\d/, '.' , /\d/ , /\d/ , /\d/ , '.' , /\d/ , /\d/ , /\d/ , '-', /\d/, /\d/ ] ;
  public maskFone = [ '(', /[0-9]/, /\d/, ')', /\d/, /\d/, /\d/ , /\d/, /\d/, '-', /\d/, /\d/, /\d/ , /\d/];
  public loader = false;
  constructor(private authService: AuthService, private router: Router,
    private auth: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  addUsuario(){
    this.loader = true;
    this.authService.register(this.usuario)
    .subscribe((response) => {
      this.auth.successFullLogin(response.headers.get('Authorization'));
      this.toastr.success('Bem Vindo!', 'Sucesso');
      this.loader = false;
      this.router.navigateByUrl('/dashboard');
       },
    (error) => {
      if(error.error.errors){
        for(const err of error.error.errors){
          this.toastr.error(err.message, 'Falha');
        }
        this.loader = false;
      } else {
        this.toastr.error(error.error.message, 'Falha');
        this.loader = false;
      }
      });
  }

}
