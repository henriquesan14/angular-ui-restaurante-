import { Component, OnInit } from '@angular/core';
import { MesaService } from 'src/app/services/domain/mesa.service';
import { CartService } from 'src/app/services/domain/cart.service';
import { Cart } from 'src/app/models/cart';
import { Produto } from 'src/app/models/produto';
import { MesaDTO } from 'src/app/models/mesa.dto';
import { PedidoService } from 'src/app/services/domain/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/domain/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { HomeService } from 'src/app/services/home.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-pedido',
  templateUrl: './cadastro-pedido.component.html',
  styleUrls: ['./cadastro-pedido.component.css']
})
export class CadastroPedidoComponent implements OnInit {

  mesas: MesaDTO[];
  public cart: Cart = <Cart>{items: []};
  pedido: Pedido = <Pedido>{"@type": 'pedidoComum'};
  clientes: Usuario[];
  email: string;
  idCliente: string;
  nomeCliente: string;
  constructor(private cartService: CartService,
    private storage: StorageService,
    private mesaService: MesaService,
    private pedidoService: PedidoService,
    private toastr: ToastrService,
    private usuarioService: UsuarioService,
    private homeService: HomeService,
    private websocket: WebsocketService,
    private router: Router) { }

  ngOnInit() {
    this.findMesa();
  }

  findLikeEmail(){
    this.usuarioService.findLikeEmail(this.email)
    .subscribe((response) => {this.clientes = response;},
    (error) => {console.log(error); });
  }

  selecionaCliente(cliente: Usuario){
    this.idCliente = cliente.id;
    this.nomeCliente = cliente.nome + ' ' + cliente.sobrenome;
    this.clientes = null;
  }

  existemClientes(): boolean{
    return this.clientes && this.clientes.length > 0;
  }

  deletaCliente(){
    this.idCliente = null;
    this.nomeCliente = null;
  }

  atualizaDemandaCozinha(){
    this.homeService.atualizaDemandasCozinha()
    .subscribe(() => {});
  }
  insert(){
    if(this.idCliente){
      this.pedido.cliente = <Usuario>{};
      this.pedido.cliente.id = this.idCliente;
    }
    this.pedido.itens = this.cart.items;
    this.pedidoService.insert(this.pedido)
    .subscribe(() => {
      this.toastr.success('Pedido emitido!', 'Sucesso');
      this.storage.setCart(null);
      this.idCliente = null;
      this.nomeCliente = null;
      this.websocket.sendMessage(' ');
      this.pedido = <Pedido>{"@type": 'pedidoComum'};
      this.router.navigateByUrl('/dashboard/pedidos'); },
    (error) => {
      console.log(this.pedido);
      console.log(error);
      this.toastr.error(error.error.message, 'Falha'); });
  }


  getCart(){
    this.cart = this.cartService.getCart();
    this.total();
  }

  total(){
    return this.cartService.total();
  }

  removeItem(produto: Produto){
    this.cart.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: Produto){
    this.cart.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: Produto){
    this.cart.items = this.cartService.decreaseQuantity(produto).items;
  }

  findMesa(){
    this.mesaService.findStatus(1)
    .subscribe((response) => {this.mesas = response; },
    (error) => {console.log(error); });
  }


}
