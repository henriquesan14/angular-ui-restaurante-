import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { CartItem } from 'src/app/models/cart';

@Component({
  selector: 'app-demanda-cozinha',
  templateUrl: './demanda-cozinha.component.html',
  styleUrls: ['./demanda-cozinha.component.css']
})
export class DemandaCozinhaComponent implements OnInit {

  itens: CartItem[];
  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.itensByStatus(1);
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
