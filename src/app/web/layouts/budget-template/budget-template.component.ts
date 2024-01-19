import { Component, OnInit, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BonusComponent } from '../../components/bonus/bonus.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ITemplate } from '../../models/template';
import { CartService } from '../../services/cart.service';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-budget-template',
  standalone: true,
  templateUrl: './budget-template.component.html',
  styleUrl: './budget-template.component.scss',
  imports: [NavbarComponent, BonusComponent, FooterComponent],
})
export class BudgetTemplateComponent implements OnInit {
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
  }

  addTemplate() {
    this.cartService.addTemplateToCart(this.template());
  }

  getTemplate() {
    this.templateService.getTemplate(3).subscribe((data) => {
      this.template.set(data.data);
    });
  }
}
