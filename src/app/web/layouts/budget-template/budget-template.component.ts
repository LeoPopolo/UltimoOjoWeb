import { Component, OnInit, inject, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BonusComponent } from "../../components/bonus/bonus.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ITemplate } from '../../models/template';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-budget-template',
  standalone: true,
  templateUrl: './budget-template.component.html',
  styleUrl: './budget-template.component.scss',
  imports: [NavbarComponent, BonusComponent, FooterComponent]
})
export class BudgetTemplateComponent implements OnInit {

  private readonly cartService = inject(CartService);

  template = signal<ITemplate>({
    name: 'Plantilla para presupuesto',
    price: 50,
    description: 'Presupuesto para servicios de diseño'
  });

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => {
      console.log(data);
    });
  }

  addTemplate() {
    this.cartService.addTemplateToCart(this.template());
  }
}
