import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BonusComponent } from "../../components/bonus/bonus.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
    selector: 'app-budget-template',
    standalone: true,
    templateUrl: './budget-template.component.html',
    styleUrl: './budget-template.component.scss',
    imports: [NavbarComponent, BonusComponent, FooterComponent]
})
export class BudgetTemplateComponent {

}
