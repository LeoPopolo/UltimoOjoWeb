import { Component, inject, signal } from '@angular/core';
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SubscriptorService } from '../../../admin/services/subscriptor.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-newsletter',
    standalone: true,
    templateUrl: './newsletter.component.html',
    styleUrl: './newsletter.component.scss',
    imports: [InputComponent, ButtonComponent, ReactiveFormsModule, TranslateModule]
})
export class NewsletterComponent {
  private readonly subscriptionServices = inject(SubscriptorService);
  private readonly fb = inject(FormBuilder);
  private readonly snackbarServices = inject(MatSnackBar)
  private readonly translater = inject(TranslateService)

  form = signal<FormGroup>(this.createForm());

  sendSubscription() {
    const body = {
      name: this.getFormValue('name'),
      lastName: this.getFormValue('lastName'),
      email: this.getFormValue('email'),
    }

    this.subscriptionServices.createSubscriptor(body).subscribe(() => {
      this.openSnackbar('Suscripción enviada con éxito');
      this.form().reset();
    });
  }

  getFormValue(control: string) {
    return this.form().get(control)?.value;
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

  getTranslate(key: string){
    const translation = this.translater.instant(key);
    return translation;
  }

}
