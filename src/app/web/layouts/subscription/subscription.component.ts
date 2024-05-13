import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ButtonComponent } from "../../components/button/button.component";
import { InputComponent } from "../../components/input/input.component";
import { NewsletterComponent } from "../../components/newsletter/newsletter.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-subscription',
    standalone: true,
    templateUrl: './subscription.component.html',
    styleUrl: './subscription.component.scss',
    imports: [NavbarComponent, ButtonComponent, InputComponent, NewsletterComponent, FooterComponent, TranslateModule]
})
export class SubscriptionComponent {

}
