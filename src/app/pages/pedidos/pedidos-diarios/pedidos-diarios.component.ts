import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-pedidos-diarios',
  templateUrl: './pedidos-diarios.component.html',
  styleUrls: ['./pedidos-diarios.component.css']
})
export class PedidosDiariosComponent implements OnInit {

  public loader = false;
  total = 0;
  pedidos: Pedido[] = <Pedido[]>{};
  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.pedidosDiario();
    this.totalDiario();
  }

  pedidosDiario(){
    this.loader = true;
    this.pedidoService.pedidosDiario()
    .subscribe((response) => {this.pedidos = response.content;
      this.loader = false;},
    (error) => {console.log(error);
      this.loader = false;});
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
