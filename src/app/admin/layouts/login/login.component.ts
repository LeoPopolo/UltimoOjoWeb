import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../../web/components/button/button.component";
import { InputComponent } from "../../../web/components/input/input.component";
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLoginRequest } from '../../models/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [ButtonComponent, InputComponent, ReactiveFormsModule]
})
export class LoginComponent {

  form!: FormGroup;

  private readonly authServices = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  constructor() {
    this.createForm();
  }

  login() {
    if (!this.form.valid) {
      return;
    }

    const body: UserLoginRequest = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    }

    this.authServices.login(body).subscribe(
      data => {
        localStorage.setItem('userData', JSON.stringify(data.data));
        localStorage.setItem('token', data.token);
        this.router.navigate(['/admin']);
      },
      err => {
        alert('error al hacer login')
      }
    );
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
