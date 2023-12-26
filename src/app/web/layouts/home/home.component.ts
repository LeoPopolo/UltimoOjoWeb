import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NewsletterComponent } from "../../components/newsletter/newsletter.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [NavbarComponent, NewsletterComponent]
})
export class HomeComponent {

}
