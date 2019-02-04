import { Component, OnInit} from '@angular/core';
import { UsuarioNewDTO } from 'src/app/models/usuario-new.dto';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  public maskCep = [ /[0-9]/, /\d/, /\d/, /\d/, /\d/ , '-', /\d/, /\d/, /\d/];
  public maskCpf = [ /[0-9]/, /\d/, /\d/, '.' , /\d/ , /\d/ , /\d/ , '.' , /\d/ , /\d/ , /\d/ , '-', /\d/, /\d/ ] ;
  public maskFone = [ '(', /[0-9]/, /\d/, ')', /\d/, /\d/, /\d/ , /\d/, /\d/, '-', /\d/, /\d/, /\d/ , /\d/];

  usuario: UsuarioNewDTO = <UsuarioNewDTO>{complemento: ''};
  constructor(private usuarioService: UsuarioService,
     private router: Router,
     private toastr: ToastrService) { }


  ngOnInit() {
  }

  addUsuario(){
    this.usuarioService.insert(this.usuario)
    .subscribe(() => {
      this.toastr.success('Usuario cadastro!', 'Sucesso');
      this.router.navigateByUrl('dashboard/usuarios'); },
    (error) => {
      if(error.error.errors){
        for(const err of error.error.errors){
          this.toastr.error(err.message, 'Falha');
        }
      } else {
        this.toastr.error(error.error.message);
      }
    });
  }

}
