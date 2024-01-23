import { Component, inject, signal } from '@angular/core';
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SubscriptorService } from '../../../admin/services/subscriptor.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-newsletter',
    standalone: true,
    templateUrl: './newsletter.component.html',
    styleUrl: './newsletter.component.scss',
    imports: [InputComponent, ButtonComponent, ReactiveFormsModule]
})
export class NewsletterComponent {
  private readonly subscriptionServices = inject(SubscriptorService);
  private readonly fb = inject(FormBuilder);
  private readonly snackbarServices = inject(MatSnackBar)

  form = signal<FormGroup>(this.createForm());

  sendSubscription() {
    const body = {
      name: this.form().get('name')?.value,
      lastName: this.form().get('lastName')?.value,
      email: this.form().get('email')?.value,
    }

    this.subscriptionServices.createSubscriptor(body).subscribe(() => {
      this.openSnackbar('Suscripción enviada con éxito');
      this.form().reset();
    });
  }

  openSnackbar(message: string) {
    this.snackbarServices.open(message, 'OK', {
      duration: 3000,
      panelClass: ['Snackbar']
    });
  }

  createForm() {
    return this.fb.group({
      name: [''],
      lastName: [''],
      email: [''],
    });
  }

}
