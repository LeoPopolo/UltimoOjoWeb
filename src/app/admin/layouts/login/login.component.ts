import { Component } from '@angular/core';
import { ButtonComponent } from "../../../web/components/button/button.component";
import { InputComponent } from "../../../web/components/input/input.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [ButtonComponent, InputComponent]
})
export class LoginComponent {

}
