import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { UsuarioDTO } from 'src/app/models/usuario.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-usuarios',
  templateUrl: './listagem-usuarios.component.html',
  styleUrls: ['./listagem-usuarios.component.css']
})
export class ListagemUsuariosComponent implements OnInit {

  public loader = false;
  public error = false;
  usuarios: UsuarioDTO[];
  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.loader = true;
    this.usuarioService.findAll()
    .subscribe((response: UsuarioDTO[]) => {this.usuarios = response;
    this.loader = false; },
    (error) => {
      if (error.status === 403){
        this.router.navigateByUrl('dashboard');
      }
      this.error = true;
      this.loader = false;
    }
    );
  }

  existemUsuarios(): boolean{
    return this.usuarios && this.usuarios.length > 0;
  }

}
