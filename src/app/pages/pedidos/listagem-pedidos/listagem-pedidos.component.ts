import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-listagem-pedidos',
  templateUrl: './listagem-pedidos.component.html',
  styleUrls: ['./listagem-pedidos.component.css']
})
export class ListagemPedidosComponent implements OnInit {

  public loader = false;
  public error = false;
  usuario: Usuario = <Usuario>{perfis: []};
  pedidos: Pedido[] = <Pedido[]>{};
  funcionario = false;
  constructor(private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private storage: StorageService) { }

  ngOnInit() {
    this.findAll();
    this.getUsuario();
  }

  isFuncionario(roles: string[]): boolean{
    let ok = false;
    for(const r of roles){
      if(r=='GARCOM' || r=='COZINHEIRO' || r=='ADMIN'){
        ok = true;
        break;
      }
    }
    return ok;
  }

  findAll(){
    this.loader = true;
    this.pedidoService.findAll()
    .subscribe((response) => {this.pedidos = response.content;
      this.loader = false;},
    (error) => {this.error= true;
      this.loader = true; });
  }

  existemPedidos(): boolean{
    return this.pedidos && this.pedidos.length > 0;
  }

  getUsuario(){
    let usuario = this.storage.getLocalUser();
    this.usuarioService.findByEmail(usuario.email)
    .subscribe(
      (response) => {this.usuario = response;
      this.funcionario = this.isFuncionario(response.perfis);}
    );
  }

}
