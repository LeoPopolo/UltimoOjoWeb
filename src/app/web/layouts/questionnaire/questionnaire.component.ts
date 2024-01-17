import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { BonusComponent } from "../../components/bonus/bonus.component";

@Component({
    selector: 'app-questionnaire',
    standalone: true,
    templateUrl: './questionnaire.component.html',
    styleUrl: './questionnaire.component.scss',
    imports: [NavbarComponent, FooterComponent, BonusComponent]
})
export class QuestionnaireComponent {

}
