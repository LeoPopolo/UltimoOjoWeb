import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITemplate } from '../models/template';
import { TemplateService } from './template.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: ITemplate[] = [];
  private cart$: BehaviorSubject<ITemplate[]> = new BehaviorSubject<
    ITemplate[]
  >([]);
  private readonly templateService = inject(TemplateService);
  private readonly snackbarServices = inject(MatSnackBar);

  packTemplate: ITemplate = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    pdfPath: '',
  };

  constructor() {
    const cartInfo = localStorage.getItem('cart');
    if (cartInfo && cartInfo.length > 0) {
      this.cart = JSON.parse(cartInfo);
      this.cart$.next(this.cart);
    }
    this.getTemplate();
  }

  getCart() {
    return this.cart$;
  }

  getTemplate() {
    this.templateService.getTemplate(4).subscribe((data) => {
      this.packTemplate = data.data;
    });
  }

  emptyCart() {
    this.cart = [];
    localStorage.setItem('cart', '[]');
    this.cart$.next(this.cart);
    this.openSnackbar('Se vació el carrito');
  }

  addTemplateToCart(template: ITemplate) {
    const templateExist = this.cart.find((item) => item.name === template.name);

    const existingPackIndex = this.cart.findIndex(
      (product) => product.name === 'Pack x3 plantillas'
    );
    const isPackInCart = existingPackIndex !== -1;

    if (!templateExist && !isPackInCart) {
      this.cart.push(template);
      this.openSnackbar('Se agregó la plantilla al carrito');
    }

    if (template.name === 'Pack x3 plantillas') {
      this.cart = [];
      this.cart.push(template);
      this.openSnackbar('Se agregó la oferta "Pack x3 plantillas" al carrito');
    }

    if (this.cart.length >= 3) {
      this.cart = [];
      this.cart = [this.packTemplate];
      this.openSnackbar('Se agregó la oferta "Pack x3 plantillas" al carrito');
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cart$.next(this.cart);
  }

  openSnackbar(message: string) {
    this.snackbarServices.open(message, 'OK', {
      duration: 3000,
      panelClass: ['Snackbar']
    });
  }
}
