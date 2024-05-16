import { Component, OnInit, inject, signal } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BonusComponent } from '../../components/bonus/bonus.component';
import { ITemplate } from '../../models/template';
import { CartService } from '../../services/cart.service';
import { TemplateService } from '../../services/template.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pack-template',
  standalone: true,
  templateUrl: './pack-template.component.html',
  styleUrl: './pack-template.component.scss',
  imports: [FooterComponent, NavbarComponent, BonusComponent,TranslateModule],
})
export class PackTemplateComponent implements OnInit {
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
    this.templateService.getTemplate(4).subscribe((data) => {
      this.template.set(data.data);
    });
  }
}
