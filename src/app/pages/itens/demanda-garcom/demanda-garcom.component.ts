import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/services/home.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-demanda-garcom',
  templateUrl: './demanda-garcom.component.html',
  styleUrls: ['./demanda-garcom.component.css']
})
export class DemandaGarcomComponent implements OnInit {

  itens: CartItem[];
  constructor(private pedidoService: PedidoService,
    private toastr: ToastrService,
    private homeService: HomeService,
    private websocket: WebsocketService) { }

  ngOnInit() {
    this.itensByStatus(2);
  }

  
  atualizaDemandasGarcom(){
    this.homeService.atualizaDemandasGarcom()
    .subscribe(() => {});
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
      this.atualizaDemandasGarcom();
      this.websocket.sendMessage(' ');
    }, (error) => {
      this.toastr.error(error.error.message, 'Falha');});

  }

}
