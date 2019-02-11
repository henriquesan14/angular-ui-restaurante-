import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart';
import { PedidoService } from 'src/app/services/domain/pedido.service';

@Component({
  selector: 'app-demanda-garcom',
  templateUrl: './demanda-garcom.component.html',
  styleUrls: ['./demanda-garcom.component.css']
})
export class DemandaGarcomComponent implements OnInit {

  itens: CartItem[];
  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.itensByStatus(2);
  }

  itensByStatus(status: number){
    this.pedidoService.itensByStatus(status)
    .subscribe((response) => {this.itens = response; },
    (error) => {console.log(error); });
  }

  existemItens(): boolean{
    return this.itens && this.itens.length > 0;
  }

}
