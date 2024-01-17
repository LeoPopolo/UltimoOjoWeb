import { Component, OnInit, inject, signal } from '@angular/core';
import { BonusComponent } from "../../components/bonus/bonus.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ITemplate } from '../../models/template';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-contract-template',
    standalone: true,
    templateUrl: './contract-template.component.html',
    styleUrl: './contract-template.component.scss',
    imports: [BonusComponent, FooterComponent, NavbarComponent]
})
export class ContractTemplateComponent implements OnInit {

  private readonly cartService = inject(CartService);

  template = signal<ITemplate>({
    name: 'Plantilla de contrato',
    price: 50,
    description: 'Contrato Legal para prestación de servicios'
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
