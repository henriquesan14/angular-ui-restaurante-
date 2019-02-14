import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { CartItem } from 'src/app/models/cart';

@Component({
  selector: 'app-itens-diarios',
  templateUrl: './itens-diarios.component.html',
  styleUrls: ['./itens-diarios.component.css']
})
export class ItensDiariosComponent implements OnInit {

  total = 0;
  itens: CartItem[];
  constructor(private pedidoService: PedidoService) { }

  ngOnInit() {
    this.itensDiario();
    this.totalDiario();
  }
  
  itensDiario(){
    this.pedidoService.itensDiario()
    .subscribe((response) => {
      this.itens = response;
    }, (error)=> {console.log(error)});
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

  existemItens(): boolean{
    return this.itens && this.itens.length > 0;
  }

}
