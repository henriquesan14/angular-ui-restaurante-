import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage_keys.config';
import { LocalUser } from '../models/local_user';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getLocalUser(): LocalUser {
    const user = localStorage.getItem(STORAGE_KEYS.localUser);
    if (user === null){
      return null;
    } else {
      return JSON.parse(user);
    }
  }

  setLocalUser(obj: LocalUser) {
    if (obj === null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getCart(): Cart{
    const cart = localStorage.getItem(STORAGE_KEYS.cart);
    if(cart == null){
        return null;
    } else {
        return JSON.parse(cart);
    }

  }

  setCart(obj: Cart){
      if(obj == null){
          localStorage.removeItem(STORAGE_KEYS.cart);
      } else {
          localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
      }
  }

  getCartDelivery(): Cart{
    const cart = localStorage.getItem(STORAGE_KEYS.cartDel);
    if(cart == null){
        return null;
    } else {
        return JSON.parse(cart);
    }

  }

  setCartDelivery(obj: Cart){
      if(obj == null){
          localStorage.removeItem(STORAGE_KEYS.cartDel);
      } else {
          localStorage.setItem(STORAGE_KEYS.cartDel, JSON.stringify(obj));
      }
  }

}

