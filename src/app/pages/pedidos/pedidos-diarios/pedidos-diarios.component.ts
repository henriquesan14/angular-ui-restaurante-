import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-pedidos-diarios',
  templateUrl: './pedidos-diarios.component.html',
  styleUrls: ['./pedidos-diarios.component.css']
})
export class PedidosDiariosComponent implements OnInit {

  total = 0;
  pedidos: Pedido[] = <Pedido[]>{};
  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.pedidosDiario();
    this.totalDiario();
  }

  pedidosDiario(){
    this.pedidoService.pedidosDiario()
    .subscribe((response) => {this.pedidos = response;},
    (error) => {console.log(error); });
  }

  existemPedidos(): boolean{
    return this.pedidos && this.pedidos.length > 0;
  }

  totalDiario(){
    this.pedidoService.total()
    .subscribe((response) => {
      if(response==null){
        this.total = 0;
      }else{
        this.total = response;
      }
    });
  }
}
