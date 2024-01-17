import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BonusComponent } from '../../components/bonus/bonus.component';
import { ITemplate } from '../../models/template';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss',
  imports: [NavbarComponent, FooterComponent, BonusComponent],
})
export class QuestionnaireComponent {
  
  private readonly cartService = inject(CartService);

  template = signal<ITemplate>({
    name: 'Pack de cuestionario para cliente',
    price: 50,
    description: 'Cuestionario de Requisitos para Proyectos',
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
