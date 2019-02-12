import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { CartItem } from 'src/app/models/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-demanda-cozinha',
  templateUrl: './demanda-cozinha.component.html',
  styleUrls: ['./demanda-cozinha.component.css']
})
export class DemandaCozinhaComponent implements OnInit {

  itens: CartItem[];
  constructor(private pedidoService: PedidoService,
    private toastr: ToastrService) { }

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

  updateStatusItem(idPedido: string, idProduto: string, status = 2){
    this.pedidoService.updateStatusItem(idPedido, idProduto, status)
    .subscribe(()=> {
      this.toastr.success('Item movido para demandas garçom!', 'Sucesso');
      this.itensByStatus(1);
    }, (error) => {
      this.toastr.error(error.error.message, 'Falha');});

  }
}
