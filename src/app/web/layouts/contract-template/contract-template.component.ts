import { Component, OnInit, inject, signal } from '@angular/core';
import { BonusComponent } from '../../components/bonus/bonus.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ITemplate } from '../../models/template';
import { CartService } from '../../services/cart.service';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-contract-template',
  standalone: true,
  templateUrl: './contract-template.component.html',
  styleUrl: './contract-template.component.scss',
  imports: [BonusComponent, FooterComponent, NavbarComponent],
})
export class ContractTemplateComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly templateService = inject(TemplateService);

  template = signal<ITemplate>({
    id: 0,
    name: '',
    price: 0,
    description: '',
    pdfPath: '',
  });

  ngOnInit(): void {
    this.getTemplate();
    this.getCart();
  }

  addTemplate() {
    this.cartService.addTemplateToCart(this.template());
  }

  getCart() {
    this.cartService.getCart().subscribe((data) => {
      console.log(data);
    });
  }

  getTemplate() {
    this.templateService.getTemplate(1).subscribe((data) => {
      this.template.set(data.data);
    });
  }
}
