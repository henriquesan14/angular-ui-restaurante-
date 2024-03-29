import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Cart } from 'src/app/models/cart';
import { Produto } from 'src/app/models/produto';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public storage: StorageService){
  }

  createOrClearCart(): Cart {
      const cart: Cart = {items: []};
      this.storage.setCart(cart);
      return cart; 
  }

  getCart(): Cart{
      let cart: Cart = this.storage.getCart();
      if(cart == null){
          cart = this.createOrClearCart();
      }
      return cart;
  }

  addProduto(produto: Produto){
      const cart = this.getCart();
      const position = cart.items.findIndex(x => x.produto.id === produto.id);
      if(position === -1){
          cart.items.push({quantidade: 1, produto: produto});
      } else {
            cart.items[position].quantidade++;
      }
      this.storage.setCart(cart);
      return cart;
  }

  removeProduto(produto: Produto){
      const cart = this.getCart();
      const position = cart.items.findIndex(x => x.produto.id === produto.id);
      if(position !== -1){
          cart.items.splice(position, 1);
      }
      this.storage.setCart(cart);
      return cart;
  }

  increaseQuantity(produto: Produto){
      const cart = this.getCart();
      const position = cart.items.findIndex(x => x.produto.id == produto.id);
      if(position !== -1){
          cart.items[position].quantidade++;
      }
      this.storage.setCart(cart);
      return cart;
  }

  decreaseQuantity(produto: Produto){
      let cart = this.getCart();
      const position = cart.items.findIndex(x => x.produto.id === produto.id);
      if(position !== -1){
          cart.items[position].quantidade--;
          if(cart.items[position].quantidade < 1){
              cart = this.removeProduto(produto);
          }
      }
      this.storage.setCart(cart);
      return cart;
  }

  total(): number{
      const cart = this.getCart();
      let sum = 0;
      for(let i = 0; i < cart.items.length;i++){
          sum += cart.items[i].produto.preco * cart.items[i].quantidade;
      }
      return sum;
  }
}
