import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/domain/pedido.service';

@Component({
  selector: 'app-pedidos-pendentes',
  templateUrl: './pedidos-pendentes.component.html',
  styleUrls: ['./pedidos-pendentes.component.css']
})
export class PedidosPendentesComponent implements OnInit {

  public loader = false;
  public error = false;
  pedidos: Pedido[] = <Pedido[]>{};
  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.findAll();
  }


  findAll(){
    this.loader = true;
    this.pedidoService.findByStatus(1)
    .subscribe((response) => {this.pedidos = response.content;
    this.loader = false;},
    (error) => {console.log(error);
    this.error = true;
    this.loader = false; });
  }

  existemPedidos(): boolean{
    return this.pedidos && this.pedidos.length > 0;
  }


}
