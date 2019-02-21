import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { Cart } from 'src/app/models/cart';
import { Produto } from 'src/app/models/produto';


@Injectable({
  providedIn: 'root'
})
export class CartDeliveryService {

  constructor(public storage: StorageService){
  }

  createOrClearCart(): Cart {
      const cart: Cart = {items: []};
      this.storage.setCartDelivery(cart);
      return cart; 
  }

  getCartDelivery(): Cart{
      let cart: Cart = this.storage.getCartDelivery();
      if(cart == null){
          cart = this.createOrClearCart();
      }
      return cart;
  }

  addProduto(produto: Produto){
      const cart = this.getCartDelivery();
      const position = cart.items.findIndex(x => x.produto.id === produto.id);
      if(position === -1){
          cart.items.push({quantidade: 1, produto: produto});
      } else {
            cart.items[position].quantidade++;
      }
      this.storage.setCartDelivery(cart);
      return cart;
  }

  removeProduto(produto: Produto){
      const cart = this.getCartDelivery();
      const position = cart.items.findIndex(x => x.produto.id === produto.id);
      if(position !== -1){
          cart.items.splice(position, 1);
      }
      this.storage.setCartDelivery(cart);
      return cart;
  }

  increaseQuantity(produto: Produto){
      const cart = this.getCartDelivery();
      const position = cart.items.findIndex(x => x.produto.id == produto.id);
      if(position !== -1){
          cart.items[position].quantidade++;
      }
      this.storage.setCartDelivery(cart);
      return cart;
  }

  decreaseQuantity(produto: Produto){
      let cart = this.getCartDelivery();
      const position = cart.items.findIndex(x => x.produto.id === produto.id);
      if(position !== -1){
          cart.items[position].quantidade--;
          if(cart.items[position].quantidade < 1){
              cart = this.removeProduto(produto);
          }
      }
      this.storage.setCartDelivery(cart);
      return cart;
  }

  total(): number{
      const cart = this.getCartDelivery();
      let sum = 0;
      for(let i = 0; i < cart.items.length;i++){
          sum += cart.items[i].produto.preco * cart.items[i].quantidade;
      }
      return sum;
  }
}
