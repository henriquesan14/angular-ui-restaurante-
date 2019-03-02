import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.css']
})
export class UsuarioDetailComponent implements OnInit {

  public loader = false;
  usuario: Usuario = <Usuario>{};
  constructor(private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.find(this.activatedRoute.snapshot.params.id);
  }

  find(id: string) {
    this.loader = true;
    this.usuarioService.find(id)
    .subscribe( (response) => {this.usuario = response;
    this.loader = false; },
     (error) => {console.log(error);
      this.loader = false; });
  }

}
