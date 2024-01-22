import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-thankyou-page',
    standalone: true,
    templateUrl: './thankyou-page.component.html',
    styleUrl: './thankyou-page.component.scss',
    imports: [RouterModule, NavbarComponent, FooterComponent]
})
export class ThankyouPageComponent {

}
