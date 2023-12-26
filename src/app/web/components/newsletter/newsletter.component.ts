import { Component } from '@angular/core';
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: 'app-newsletter',
    standalone: true,
    templateUrl: './newsletter.component.html',
    styleUrl: './newsletter.component.scss',
    imports: [InputComponent, ButtonComponent]
})
export class NewsletterComponent {

}
