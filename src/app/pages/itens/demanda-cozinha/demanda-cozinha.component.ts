import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { CartItem } from 'src/app/models/cart';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/services/home.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-demanda-cozinha',
  templateUrl: './demanda-cozinha.component.html',
  styleUrls: ['./demanda-cozinha.component.css']
})
export class DemandaCozinhaComponent implements OnInit {

  public loader = false;
  itens: CartItem[];
  constructor(private pedidoService: PedidoService,
    private toastr: ToastrService,
    private homeService: HomeService,
    private websocket: WebsocketService) { }

  ngOnInit() {
    this.itensByStatus('1');
  }

  atualizaDemandasCozinha(){
    this.homeService.atualizaDemandasCozinha()
    .subscribe(() => {});
  }
  
  atualizaDemandasGarcom(){
    this.homeService.atualizaDemandasGarcom()
    .subscribe(() => {});
  }

  itensByStatus(status: string){
    this.loader = true;
    this.pedidoService.itensByStatus(status)
    .subscribe((response) => {this.itens = response;
      this.loader = false; },
    (error) => {console.log(error);
      this.loader = false; });
  }

  existemItens(): boolean{
    return this.itens && this.itens.length > 0;
  }

  updateStatusItem(idPedido: string, idProduto: string, status = '2'){
    this.pedidoService.updateStatusItem(idPedido, idProduto, status)
    .subscribe(()=> {
      this.toastr.success('Item movido para demandas garçom!', 'Sucesso');
      this.itensByStatus(1);
      this.atualizaDemandasGarcom();
      this.atualizaDemandasCozinha();
      this.websocket.sendMessage(' ');
    }, (error) => {
      this.toastr.error(error.error.message, 'Falha');});

  }
}
