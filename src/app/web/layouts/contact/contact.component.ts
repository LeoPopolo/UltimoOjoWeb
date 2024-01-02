import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { InputComponent } from "../../components/input/input.component";
import { ButtonComponent } from "../../components/button/button.component";
import { TextareaComponent } from "../../components/textarea/textarea.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    imports: [NavbarComponent, InputComponent, ButtonComponent, TextareaComponent, FooterComponent]
})
export class ContactComponent {

}
