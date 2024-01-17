import { Component } from '@angular/core';
import { BonusComponent } from "../../components/bonus/bonus.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
    selector: 'app-contract-template',
    standalone: true,
    templateUrl: './contract-template.component.html',
    styleUrl: './contract-template.component.scss',
    imports: [BonusComponent, FooterComponent, NavbarComponent]
})
export class ContractTemplateComponent {

}
