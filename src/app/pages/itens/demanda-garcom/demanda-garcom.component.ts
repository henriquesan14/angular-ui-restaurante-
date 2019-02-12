import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-demanda-garcom',
  templateUrl: './demanda-garcom.component.html',
  styleUrls: ['./demanda-garcom.component.css']
})
export class DemandaGarcomComponent implements OnInit {

  itens: CartItem[];
  constructor(private pedidoService: PedidoService,
    private toastr: ToastrService) { }

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

  updateStatusItem(idPedido: string, idProduto: string, status = 3){
    this.pedidoService.updateStatusItem(idPedido, idProduto, status)
    .subscribe(()=> {
      this.toastr.success('Item movido para itens finalizados!', 'Sucesso');
      this.itensByStatus(2);
    }, (error) => {
      this.toastr.error(error.error.message, 'Falha');});

  }

}
