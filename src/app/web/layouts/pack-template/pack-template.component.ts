import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BonusComponent } from "../../components/bonus/bonus.component";


@Component({
    selector: 'app-pack-template',
    standalone: true,
    templateUrl: './pack-template.component.html',
    styleUrl: './pack-template.component.scss',
    imports: [FooterComponent, NavbarComponent, BonusComponent]
})
export class PackTemplateComponent {

}
