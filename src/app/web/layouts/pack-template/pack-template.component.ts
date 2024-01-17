import { Component, OnInit, inject, signal } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BonusComponent } from '../../components/bonus/bonus.component';
import { ITemplate } from '../../models/template';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-pack-template',
  standalone: true,
  templateUrl: './pack-template.component.html',
  styleUrl: './pack-template.component.scss',
  imports: [FooterComponent, NavbarComponent, BonusComponent],
})
export class PackTemplateComponent implements OnInit {
  private readonly cartService = inject(CartService);

  template = signal<ITemplate>({
    name: 'Pack 20% de descuento',
    price: 76,
  });

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data) => {
      console.log(data);
    });
  }

  addTemplate() {
    this.cartService.addTemplateToCart(this.template());
  }
}
