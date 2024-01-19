import { Component, OnInit, inject, signal } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CartService } from '../../services/cart.service';
import { ITemplate } from '../../models/template';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SaleRequest } from '../../models/sale';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  imports: [
    InputComponent,
    ButtonComponent,
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
  ],
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly saleService = inject(SaleService)

  form = signal<FormGroup>(this.createForm());
  cart = signal<ITemplate[]>([]);

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data) => {
      this.cart.set(data);
    });
   
  }

  createSale() {
    const body: SaleRequest = {
      customerName: this.form().get('name')?.value,
      customerLastName: this.form().get('lastName')?.value,
      customerPhoneNumber: this.form().get('phoneNumber')?.value,
      customerEmail: this.form().get('email')?.value,
      customerAddress: this.form().get('address')?.value,
      customerCuit: this.form().get('cuit')?.value,
      templatesIds: this.cart().map((item) => item.id),
    };

    this.saleService.createSale(body).subscribe((data) => {
      console.log(data)
    });
  }

  createForm() {
    return this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      cuit: ['', Validators.required],
    });
  }

  get total() {
    return this.cart().reduce((acc, item) => acc + item.price, 0);
  }
}
