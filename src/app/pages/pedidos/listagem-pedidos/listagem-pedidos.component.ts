import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-listagem-pedidos',
  templateUrl: './listagem-pedidos.component.html',
  styleUrls: ['./listagem-pedidos.component.css']
})
export class ListagemPedidosComponent implements OnInit {

  pedidos: Pedido[] = <Pedido[]>{};
  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll(){
    this.pedidoService.findAll()
    .subscribe((response) => {this.pedidos = response.content;},
    (error) => {console.log(error); });
  }

  existemPedidos(): boolean{
    return this.pedidos && this.pedidos.length > 0;
  }

}
