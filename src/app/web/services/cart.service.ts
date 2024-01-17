import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITemplate } from '../models/template';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: ITemplate[] = [];
  private cart$: BehaviorSubject<ITemplate[]> = new BehaviorSubject<
    ITemplate[]
  >([]);

  constructor() {
    const cartInfo = localStorage.getItem('cart');
    if (cartInfo && cartInfo.length > 0) {
      this.cart = JSON.parse(cartInfo);
      this.cart$.next(this.cart);
    }
  }

  getCart() {
    return this.cart$;
  }

  addTemplateToCart(template: ITemplate) {
    const templateExist = this.cart.find((item) => item.name === template.name);
    const existingPackIndex = this.cart.findIndex(
      (product) => product.name === 'Pack 20% de descuento'
    );
    const isPackInCart = existingPackIndex !== -1;

    if (!templateExist && !isPackInCart) this.cart.push(template);

    if (template.name === 'Pack 20% de descuento') {
      this.cart = [];
      this.cart.push(template);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cart$.next(this.cart);
  }
}
