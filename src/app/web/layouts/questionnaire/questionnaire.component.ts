import { Component, OnInit, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BonusComponent } from '../../components/bonus/bonus.component';
import { ITemplate } from '../../models/template';
import { CartService } from '../../services/cart.service';
import { TemplateService } from '../../services/template.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss',
  imports: [NavbarComponent, FooterComponent, BonusComponent, TranslateModule],
})
export class QuestionnaireComponent implements OnInit {
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
    this.templateService.getTemplate(2).subscribe((data) => {
      this.template.set(data.data);
    });
  }
}
