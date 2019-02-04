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

  usuarios: UsuarioDTO[];
  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.usuarioService.findAll()
    .subscribe((response: UsuarioDTO[]) => {this.usuarios = response; },
    (error) => {
      if (error.status === 403){
        this.router.navigateByUrl('dashboard');
      }
    }
    );
  }

  existemUsuarios(): boolean{
    return this.usuarios && this.usuarios.length > 0;
  }

}
