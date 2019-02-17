import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/domain/pedido.service';

@Component({
  selector: 'app-pedidos-pendentes',
  templateUrl: './pedidos-pendentes.component.html',
  styleUrls: ['./pedidos-pendentes.component.css']
})
export class PedidosPendentesComponent implements OnInit {

  pedidos: Pedido[] = <Pedido[]>{};
  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.findAll();
  }


  findAll(){
    this.pedidoService.findByStatus(1)
    .subscribe((response) => {this.pedidos = response.content;},
    (error) => {console.log(error); });
  }

  existemPedidos(): boolean{
    return this.pedidos && this.pedidos.length > 0;
  }


}
