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
import { FileService } from '../../../shared/services/file.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../../../shared/components/dialog-alert/dialog-alert.component';
import { Router } from '@angular/router';

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
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly saleService = inject(SaleService);
  private readonly fileService = inject(FileService);

  form = signal<FormGroup>(this.createForm());
  cart = signal<ITemplate[]>([]);
  receipt = signal<File | null>(null);
  country = localStorage.getItem('country') || 'Argentina';

  ngOnInit(): void {
    this.cartService.getCart().subscribe((data) => {
      this.cart.set(data);
    });
  }

  createSale(receiptPath: string) {

    const body: SaleRequest = {
      customerName: this.form().get('name')?.value,
      customerLastName: this.form().get('lastName')?.value,
      customerPhoneNumber: this.form().get('phoneNumber')?.value,
      customerEmail: this.form().get('email')?.value,
      customerAddress: this.form().get('address')?.value,
      customerCuit: this.form().get('cuit')?.value,
      templatesIds: this.cart().map((item) => item.id),
      receiptPath
    };

    this.saleService.createSale(body).subscribe(() => {
      this.cartService.emptyCart();
      this.router.navigate(['/thankyou']);
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

  startSale() {
    if (!this.form().valid) {
      this.showAlert('Error', 'Complete todos los campos');
      return;
    }

    if (!this.receipt()) {
      this.showAlert('Error', 'Cargue el comprobante de la transferencia');
      return;
    }

    this.uploadFile();
  }

  showAlert(title: string, message: string) {
    this.dialog.open(DialogAlertComponent, {
      data: {
        title,
        message
      }
    })
  }

  uploadFile() {
    this.fileService.uploadFile(this.receipt()!).subscribe((data)=>{
      this.createSale(data.image_path)
    })
  }

  onFileLoaded(event: any) {
    this.receipt.set(event.target.files[0]);
  }

  emptyCart() {
    this.cartService.emptyCart();
  }

  deleteItem(id: number){
    this.cartService.deleteItem(id)
  }

  gotoPaypal() {
    window.location.href = 'https://www.paypal.com/paypalme/ultimoojo?country.x=AR&locale.x=es_XC';
  }

  get usdTotal() {
    return this.cart().reduce((acc, item) => acc + item.usdPrice, 0);
  }

  get total() {
    return this.cart().reduce((acc, item) => acc + item.price, 0);
  }
}
