import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ButtonComponent } from "../../components/button/button.component";
import { InputComponent } from "../../components/input/input.component";
import { NewsletterComponent } from "../../components/newsletter/newsletter.component";

@Component({
    selector: 'app-subscription',
    standalone: true,
    templateUrl: './subscription.component.html',
    styleUrl: './subscription.component.scss',
    imports: [NavbarComponent, ButtonComponent, InputComponent, NewsletterComponent]
})
export class SubscriptionComponent {

}
