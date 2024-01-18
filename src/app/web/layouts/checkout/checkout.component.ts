import { Component, OnInit, inject, signal } from '@angular/core';
import { InputComponent } from "../../components/input/input.component";
import { ButtonComponent } from "../../components/button/button.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CartService } from '../../services/cart.service';
import { ITemplate } from '../../models/template';

@Component({
    selector: 'app-checkout',
    standalone: true,
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.scss',
    imports: [InputComponent, ButtonComponent, NavbarComponent, FooterComponent]
})
export class CheckoutComponent implements OnInit {

  private readonly cartService = inject(CartService);

  cart = signal<ITemplate[]>([]);

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data) => {
      this.cart.set(data);
    });
  }

  get total() {
    return this.cart().reduce((acc, item) => acc + item.price, 0);
  }
}
