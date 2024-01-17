import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITemplate } from '../models/template';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: ITemplate[] = [];
  private cart$: BehaviorSubject<ITemplate[]> = new BehaviorSubject<ITemplate[]>([]);

  getCart() {
    return this.cart$;
  }

  addTemplateToCart(template: ITemplate) {
    this.cart.push(template);
    this.cart$.next(this.cart);
  }
}
